import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  // 세 가지의 문자열만 받을 수 있음
  category: "TO_DO" | "DOING" | "DONE";
}

// 제네릭으로 인터페이스를 전달
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  // selector의 key
  key: "toDoSelector",
  // get function
  // 인자로 options 객체를 받는데 get function이 들어있음
  get: ({ get }) => {
    // atom을 가져옴
    const toDos = get(toDoState);
    // 여기서 return하는 값이 이 selector의 value가 됨
    return [
      toDos.filter((toDo) => toDo.category === "TO_DO"),
      toDos.filter((toDo) => toDo.category === "DOING"),
      toDos.filter((toDo) => toDo.category === "DONE"),
    ];
  },
});

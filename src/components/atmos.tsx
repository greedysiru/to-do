import { atom, selector } from "recoil";

// enumerable
// 일련의 숫자를 문자로 표현해 줌 -> 원칙적으로는 숫자
// 문자열을 안정적으로 비교하거나 사용 가능
export enum Categories {
  "TO_DO" = "TO_DO", // 0
  "DOING" = "DOING", // 1
  "DONE" = "DONE", // 2
}

export interface IToDo {
  text: string;
  id: number;
  // 세 가지의 문자열만 받을 수 있음
  category: Categories;
}

export const categoryState = atom<IToDo["category"]>({
  key: "category",
  // 정의한 enum에 접근
  default: Categories.TO_DO,
});

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
    const selectedCategory = get(categoryState);
    // 여기서 return하는 값이 이 selector의 value가 됨
    return [...toDos.filter((toDo) => toDo.category === selectedCategory)];
  },
});

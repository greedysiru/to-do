import { atom, selector } from "recoil";

export const minuteState = atom({
  key: "minutes",
  default: 0,
});

// 제네릭으로 number를 전달하여 해당 selector가 숫자를 return하는 것을 명시
// 여러개의 atom을 가져올 수 있음
export const hourSelector = selector<number>({
  key: "hours",
  // 분을 시간 단위로 바꾸는 Selector
  get: ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
  // state를 set하는 함수
  // state를 원하는 방법으로 수정
  // 첫 번째 파라미터로 option을 주는데, set이 포함(setRecoilState)
  // 두 번째 argument는 보낼 새로운 값을 줌
  set: ({ set }, newValue) => {
    const minutes = Number(newValue) * 60;
    // 첫번째 파라미터인 atom을 두번째 파라미터에 전달한 방식으로 수정
    set(minuteState, minutes);
  },
});

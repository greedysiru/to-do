import { atom, selector } from "recoil";

export const minuteState = atom({
  key: "minutes",
  default: 0,
});

export const hourSelector = selector({
  key: "hours",
  // 분을 시간 단위로 바꾸는 Selector
  get: ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
});

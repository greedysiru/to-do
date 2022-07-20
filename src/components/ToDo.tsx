import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { setItem } from "../utils/localStorageModule";
import { categoriesState, IToDo, toDoState } from "./atmos";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as IToDo["category"] };
      const newToDos = [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
      setItem("ToDos", newToDos);
      return newToDos;
    });
  };

  return (
    <li>
      <span>{text}</span>
      {categories.map((category, index) => {
        return (
          <button key={index} name={category} onClick={onClick}>
            {category}
          </button>
        );
      })}
    </li>
  );
}

export default ToDo;

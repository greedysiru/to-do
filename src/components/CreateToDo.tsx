import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { setItem } from "../utils/localStorageModule";
import {
  categoriesState,
  categoryState,
  TCategories,
  toDoState,
} from "./atmos";

interface IForm {
  toDo: string;
  category: TCategories;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const selectedCategory = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>({
    defaultValues: { category: selectedCategory },
  });

  const handleValid = ({ toDo, category }: IForm) => {
    // 새로운 배열을 return해야 함
    setToDos((oldToDos) => {
      const newToDos = [{ text: toDo, id: Date.now(), category }, ...oldToDos];
      setItem("ToDos", newToDos);
      return newToDos;
    });
    setValue("toDo", "");
    if (categories.includes(category)) return;
    setCategories((oldCategories) => {
      const newCategories = [...oldCategories, category];
      setItem("Categories", newCategories);
      return newCategories;
    });
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <input
        {...register("category", {
          required: "Please write a category",
        })}
        placeholder="Write a category"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;

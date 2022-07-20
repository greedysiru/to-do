export const setItem = (key: string, item: any) =>
  localStorage.setItem(key, JSON.stringify(item));

export const getItem = (key: string, setter: (item: any) => void) => {
  const localToDos = localStorage.getItem(key);
  localToDos && setter(JSON.parse(localToDos));
};

import { useRef } from "react";

export function useSetItemsDeleted<T>(
  originalList: T[],
  key: keyof T
): [T[], (itemToDelete: T) => void] {
  const listOfDeleted = useRef<T[]>([]);

  const handleDeleteItem = (itemToDelete: T) => {
    const item = originalList.find((item) => item[key] === itemToDelete[key]);
    if (item) listOfDeleted.current.push(item);
  };

  return [listOfDeleted.current, handleDeleteItem];
}

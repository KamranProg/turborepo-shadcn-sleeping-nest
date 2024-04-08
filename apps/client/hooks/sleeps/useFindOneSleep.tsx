import { useQuery } from "@tanstack/react-query";
import SleepService from "../../services/SleepService";
import { Sleep } from "../../types";

export const useFindOneSleep = (id: number) => {
  return useQuery<Sleep, Error>({
    queryKey: ["sleep", id],
    queryFn: () => SleepService.findOne(id),
  });
};

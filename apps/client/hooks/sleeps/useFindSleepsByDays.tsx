import { useQuery } from "@tanstack/react-query";
import SleepService from "../../services/SleepService";
import { Sleep } from "../../types";

export const useFindSleepsByDays = (days: number = 7, name?: string) => {
  return useQuery<Sleep[], Error>({
    queryKey: ["SleepsByDays", days, name],
    queryFn: () => SleepService.findSleepsByDays(days, name),
  });
};

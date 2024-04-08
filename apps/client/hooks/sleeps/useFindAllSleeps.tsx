import { useQuery } from "@tanstack/react-query";
import SleepService from "../../services/SleepService";
import { Sleep } from "../../types";

export const useFindAllSleeps = () => {
  return useQuery<Sleep[], Error>({
    queryKey: ["sleeps"],
    queryFn: SleepService.findAll,
  });
};

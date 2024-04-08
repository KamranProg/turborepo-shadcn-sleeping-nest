import { useMutation, useQueryClient } from "@tanstack/react-query";
import SleepService from "../../services/SleepService";
import { NestErrorData, Sleep } from "../../types";
import { toast } from "@repo/ui/components/ui/sonner";
// import { showSnackBar } from "../../shared/showSnackBar";

export const useUpdateSleep = (
  onSuccess?: () => void,
  onError?: (data?: NestErrorData | string) => void,
  enttityName: string = "sleep"
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { sleepId: number; sleep: Partial<Sleep> }) =>
      SleepService.update(payload.sleepId, payload.sleep),
    onSuccess: () => {
      toast(`Success updating ${enttityName}`);
      queryClient.invalidateQueries({ queryKey: ["sleeps"] });
      if (onSuccess) onSuccess();
    },
    onError: (error: NestErrorData | string) => {
      toast(`Error creating ${enttityName}`);
      console.error("useDeleteSleep onError", error)
      if (onError) onError(error);
    },
  });
};

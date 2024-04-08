import { useMutation, useQueryClient } from "@tanstack/react-query";
import SleepService from "../../services/SleepService";
import { NestErrorData, Sleep } from "../../types";
import { toast } from "@repo/ui/components/ui/sonner";

export const useCreateSleep = (
  onSuccess?: () => void,
  onError?: (data?: NestErrorData | string) => void,
  enttityName: string = "sleep",
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { sleep: Partial<Sleep> }) =>
      SleepService.create(payload.sleep),
    onSuccess: () => {
      toast(`Success creating ${enttityName}`);
      queryClient.invalidateQueries({ queryKey: ["sleeps"] });
      if (onSuccess) onSuccess();
    },
    onError: (error: NestErrorData | string) => {
      toast(`Error creating ${enttityName}`);
      if (onError) onError(error);
    },
  });
};

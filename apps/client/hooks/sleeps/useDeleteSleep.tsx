import { useMutation, useQueryClient } from "@tanstack/react-query";
import SleepService from "../../services/SleepService";
import { toast } from "@repo/ui/components/ui/sonner";
// import { enqueueSnackbar } from "notistack";

export const useDeleteSleep = (
  onSuccess?: () => void,
  onError?: () => void,
  enttityName: string = "sleep",
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { id: number }) => SleepService.delete(payload.id),
    onSuccess: () => {
      toast(`Success deleting ${enttityName}`);
      queryClient.invalidateQueries({ queryKey: ["sleeps"] });
      if (onSuccess) onSuccess();
    },
    onError: (error: string) => {
      toast(`Error creating ${enttityName}`);
      console.error("useDeleteSleep onError", error)
      if (onError) onError();
    },
  });
};

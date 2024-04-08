import * as z from "zod";

export const sleepInputSchema = z.object({
    name: z.string(),
    gender: z.enum(["Male", "Female"]),
    sleepDuration: z.coerce.number().positive(),
  });

export type SleepInput = z.infer<typeof sleepInputSchema>;

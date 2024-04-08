import * as z from "zod";

export const aggregatedSleepSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  gender: z.enum(["Male", "Female"]),
  logs: z.coerce.number().positive(),
  createdAt: z.date(),
});

export type AggregatedSleep = z.infer<typeof aggregatedSleepSchema>;

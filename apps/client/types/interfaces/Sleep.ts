import * as z from "zod";

export const sleepSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  gender: z.enum(["Male", "Female"]),
  sleepDuration: z.coerce.number().positive(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Sleep = z.infer<typeof sleepSchema>;

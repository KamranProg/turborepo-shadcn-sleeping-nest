import * as z from "zod";

export const nestErrorDataSchema = z.object({
  data: z.object({
    error: z.string(),
    message: z.array(z.string()),
    statusCode: z.coerce.number().positive()
  }),
});

export type NestErrorData = z.infer<typeof nestErrorDataSchema>;

import { z } from "zod";

export const CollectionOrTagSchema = z.object({
  name: z.string().max(26, { message: "Must be 26 or fewer characters long" }),
});

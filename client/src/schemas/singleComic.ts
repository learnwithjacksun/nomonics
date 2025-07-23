import { z } from "zod";

const singleComicSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

type SingleComicSchema = z.infer<typeof singleComicSchema>;

export { singleComicSchema, type SingleComicSchema };

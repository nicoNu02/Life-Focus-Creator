import z from "zod";

const noteSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  date: z.date(),
  tag: z.string().max(32),
});

export function validateNote(input) {
  return noteSchema.safeParse(input);
}

export function validatePartialNote(input) {
  return noteSchema.partial().safeParse(input);
}

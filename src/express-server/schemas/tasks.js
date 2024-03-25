import z from "zod";

const taskSchema = z.object({
  name: z.string(),
  priority: z.enum(["low", "medium", "high"], {
    invalid_type_error: "priority must be [low, medium, high]",
  }),
  section: z.enum(["Backlog", "Todo", "InProgress", "Done"]),
});

export function validateTask(input) {
  return taskSchema.safeParse(input);
}

export function validatePartialTask(input) {
  return taskSchema.partial().safeParse(input);
}

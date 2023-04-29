import * as z from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  priority: z.number().min(1).max(5),
  completed: z.boolean(),
});

// lib/validation/template-schema.ts
import { z } from "zod";

export const fieldSchema = z.object({
  id: z.string().min(1),
  placeholder: z.string().min(1, "Placeholder is required"),
});

export const templateSchema = z.object({
  name: z.string().min(1, "Template name is required"),
  template: z.string().min(1, "Template text is required"),
  fields: z.array(fieldSchema),
});

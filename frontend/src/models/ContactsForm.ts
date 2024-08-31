import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string(),
  email: z.string(),
  text: z.string(),
});

export type ContactFormType = z.infer<typeof contactFormSchema>;

import { z } from 'zod';

export const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  url: z.string().url('Please enter a valid website URL'),
  stack: z.string().optional(),
  regions: z.string().optional(),
  languages: z.string().optional(),
  cmp: z.enum(['Cookiebot', 'Iubenda', 'Usercentrics', 'Termly', 'Unknown']).optional(),
  integrations: z.string().optional(),
  message: z.string().max(1000, 'Message must be less than 1000 characters').optional(),
  locale: z.enum(['en', 'de', 'fr']),
  honeypot: z.string().optional() // Anti-spam field
});

export type ContactFormData = z.infer<typeof ContactSchema>;

export const validateContactForm = (data: unknown): ContactFormData => {
  return ContactSchema.parse(data);
};

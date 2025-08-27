import { z } from 'zod'

export const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  url: z.string().url('Invalid URL'),
  stack: z.string().optional(),
  regions: z.string().optional(),
  languages: z.string().optional(),
  cmp: z.enum(['Cookiebot', 'Iubenda', 'Usercentrics', 'Termly', 'Unknown']).optional(),
  integrations: z.string().optional(),
  message: z.string().max(1000, 'Message too long').optional(),
  locale: z.enum(['en', 'de', 'fr']),
  honeypot: z.string().optional() // Anti-spam field
})

export type ContactFormData = z.infer<typeof ContactSchema>

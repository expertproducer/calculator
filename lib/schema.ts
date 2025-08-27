import { z } from 'zod'

export const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  url: z.string().url('Invalid URL'),
  stack: z.string().min(1, 'Stack is required'),
  regions: z.string().min(1, 'Regions are required'),
  languages: z.string().min(1, 'Languages are required'),
  preferredCmp: z.string().optional(),
  integrations: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  locale: z.enum(['en', 'de', 'fr']),
  honeypot: z.string().optional(), // Anti-spam field
  timestamp: z.string().optional(),
  userAgent: z.string().optional()
})

export type ContactFormData = z.infer<typeof ContactSchema>

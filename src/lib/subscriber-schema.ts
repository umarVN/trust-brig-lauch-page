import { z } from 'zod';

export const subscriberSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your full name')
    .max(80, 'Name must be 80 characters or fewer'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email address')
    .email('Please enter a valid email address')
    .max(160, 'Email must be 160 characters or fewer'),
  company: z
    .string()
    .trim()
    .max(120, 'Company must be 120 characters or fewer')
    .optional()
    .or(z.literal('')),
});

export type SubscriberInput = z.infer<typeof subscriberSchema>;

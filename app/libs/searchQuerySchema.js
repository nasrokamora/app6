

import { z } from 'zod';


export const searchQuerySchema = z
    .string()
    .min(3, { message: 'Search term must be at least 3 characters long' })
    .max(50, { message: 'Search term must be at most 50 characters long' })
    .regex(/^[a-zA-Z0-9\s]+$/, { message: 'The search term contains invalid characters.' })



export const AiSearchSchema = z.array(
    z.object({
        id: z.number(),
        query: z.string(),
        title: z.string().optional(),
        name: z.string().optional(),
        type: z.enum(['multi', 'movie', 'tv'], { message: 'Invalid search type' })
    })
)
import { z } from "zod";

export const createCardSchema = z.object({
    front: z.string().min(1),
    back: z.string().min(1),
    tags: z.array(z.string()).optional().default([]),
    interval: z.number().int().nonnegative().optional().default(0),
    dueDate: z.preprocess(
        (arg) =>
            typeof arg === "string" || arg instanceof Date
                ? new Date(arg)
                : arg,
        z.date().optional()
    ),
    deckId: z.string().min(1),
});

export const updateCardSchema = z.object({
    id: z.uuid(),
    front: z.string().optional(),
    back: z.string().optional(),
    tags: z.array(z.string()).optional(),
    interval: z.number().int().nonnegative().optional(),
    dueDate: z
        .preprocess(
            (arg) =>
                typeof arg === "string" || arg instanceof Date
                    ? new Date(arg)
                    : arg,
            z.date()
        )
        .optional(),
});

export type CreateCardDto = z.infer<typeof createCardSchema>;
export type UpdateCardDto = z.infer<typeof updateCardSchema>;

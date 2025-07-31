import { z } from "zod";

export const createDeckSchema = z.object({
    title: z.string().min(1),
});

export const updateDeckSchema = z.object({
    deckId: z.uuid(),
    title: z.string().min(1),
});

export type CreateDeckDto = z.infer<typeof createDeckSchema>;
export type UpdateDeckDto = z.infer<typeof updateDeckSchema>;

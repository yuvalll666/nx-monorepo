import { z } from "zod";

export const cardIdSchema = z.object({
    cardId: z.uuid(),
});

export const cardIdsSchema = z.object({
    cardId: z.uuid().array(),
});

export type CardIdDto = z.infer<typeof cardIdSchema>;
export type CardIdsDto = z.infer<typeof cardIdsSchema>;

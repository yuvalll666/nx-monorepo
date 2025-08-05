import { z } from "zod";

export const deckIdSchema = z.object({
    deckId: z.uuid(),
});

export const deckIdsSchema = z.object({
    deckIds: z.uuid().array(),
});

export type DeckIdDto = z.infer<typeof deckIdSchema>;
export type DeckIdsDto = z.infer<typeof deckIdsSchema>;

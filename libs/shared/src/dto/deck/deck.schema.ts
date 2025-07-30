import { z } from "zod";

export const deckSchema = z.object({
    // title: z.uuid() - TODO: replace title to uuid check
    title: z.string().min(1),
});


export type CreateDeckDto = z.infer<typeof deckSchema>;
export type UpdateDeckDto = z.infer<typeof deckSchema>;

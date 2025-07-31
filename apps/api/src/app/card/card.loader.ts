import DataLoader from "dataloader";
import { Injectable, Scope } from "@nestjs/common";
import { CardService } from "../card/card.service";
import { Card } from "@shared/models";

@Injectable({ scope: Scope.REQUEST }) // Ensures one instance per request
export class CardLoader {
    constructor(private readonly cardService: CardService) {}

    public readonly cardsByDeckId = new DataLoader<string, Card[]>(
        async (deckIds: readonly string[]) => {
            const cards = await this.cardService.getCardsByDeckIds(
                deckIds as string[]
            );

            const map = new Map<string, Card[]>();
            for (const card of cards) {
                if (!map.has(card.deckId)) {
                    map.set(card.deckId, []);
                }
                
                map.get(card.deckId)!.push(card);
            }

            return deckIds.map((id) => map.get(id) || []);
        }
    );
}

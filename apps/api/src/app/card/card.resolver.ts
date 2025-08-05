import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CardService } from "./card.service";
import { Card, DeckIdInput } from "@shared/graphql";
import {
    CreateCardDto,
    createCardSchema,
    deckIdSchema,
    UpdateCardDto,
    updateCardSchema,
} from "@shared/dto";
import { CreateCardInput, UpdateCardInput } from "./graphql";

@Resolver(() => Card)
export class CardResolver {
    constructor(private readonly cardsService: CardService) {}

    @Query(() => [Card])
    async getAllCards(): Promise<Card[]> {
        return this.cardsService.getAllCards();
    }

    @Query(() => [Card])
    async getCardsByDeckId(@Args("input") input: DeckIdInput): Promise<Card[]> {
        const parsed = deckIdSchema.parse(input);
        return this.cardsService.getCardsByDeckId(parsed);
    }

    @Mutation(() => Card)
    createCard(@Args("data") data: CreateCardInput): Promise<Card> {
        const parsed: CreateCardDto = createCardSchema.parse(data);
        return this.cardsService.createCard(parsed);
    }

    @Mutation(() => Card)
    updateCard(@Args("data") data: UpdateCardInput): Promise<Card> {
        const parsed: UpdateCardDto = updateCardSchema.parse(data);
        return this.cardsService.updateCard(parsed);
    }

    @Mutation(() => Card)
    async softDeleteCard(@Args("id") id: string) {}

    async permanentlyDeletCard() {}

    async restoreCard() {}
}

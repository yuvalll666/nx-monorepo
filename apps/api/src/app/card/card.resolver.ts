import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CardService } from "./card.service";
import { Card } from "@shared/models";
import {
    CreateCardDto,
    createCardSchema,
    UpdateCardDto,
    updateCardSchema,
} from "@shared/dto";
import { CreateCardInput, UpdateCardInput } from "./dto";

@Resolver(() => Card)
export class CardResolver {
    constructor(private readonly cardsService: CardService) {}

    @Query(() => [Card])
    async getAllCards(): Promise<Card[]> {
        return this.cardsService.getAllCards();
    }

    @Query(() => [Card])
    async getCardsByDeck(@Args("deckId") deckId: string): Promise<Card[]> {
        return this.cardsService.getCardsByDeck(deckId);
    }

    @Mutation(() => Card)
    createCard(@Args("input") input: CreateCardInput): Promise<Card> {
        const parsed: CreateCardDto = createCardSchema.parse(input);
        return this.cardsService.createCard(parsed);
    }

    @Mutation(() => Card)
    updateCard(
        @Args("id") id: string,
        @Args("input") input: UpdateCardInput
    ): Promise<Card> {
        const parsed: UpdateCardDto = updateCardSchema.parse(input);
        return this.cardsService.updateCard(id, parsed);
    }
}

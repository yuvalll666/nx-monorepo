import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CardService } from "./card.service";
import {
    Card,
    CardIdInput,
    CommonResponse,
    DeckIdInput,
} from "@shared/graphql";
import {
    CardIdDto,
    cardIdSchema,
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
    createCard(@Args("input") input: CreateCardInput): Promise<Card> {
        const parsed: CreateCardDto = createCardSchema.parse(input);
        return this.cardsService.createCard(parsed);
    }

    @Mutation(() => Card)
    updateCard(@Args("input") input: UpdateCardInput): Promise<Card> {
        const parsed: UpdateCardDto = updateCardSchema.parse(input);
        return this.cardsService.updateCard(parsed);
    }

    @Mutation(() => Card)
    async softDeleteCard(@Args("input") input: CardIdInput): Promise<Card> {
        const parsed: CardIdDto = cardIdSchema.parse(input);
        return this.cardsService.softDeleteCard(parsed);
    }

    async restoreCard(@Args("input") input: CardIdInput): Promise<Card> {
        const parsed: CardIdDto = cardIdSchema.parse(input);
        return this.cardsService.restoreCard(parsed);
    }

    // TODO - create function and allow only admin access
    @Mutation(() => CommonResponse)
    async permanentlyDeleteCards() {}
}

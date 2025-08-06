import {
    Resolver,
    Query,
    Mutation,
    Args,
    ResolveField,
    Parent,
} from "@nestjs/graphql";
import { DeckService } from "./deck.service";
import { CreateDeckInput, UpdateDeckInput } from "./graphql/deck-crud.dto";
import { Card, Deck, DeckIdInput } from "@shared/graphql";
import {
    CreateDeckDto,
    createDeckSchema,
    DeckIdDto,
    deckIdSchema,
    UpdateDeckDto,
    updateDeckSchema,
} from "@shared/dto";
import { UseGuards } from "@nestjs/common";
import { CurrentUser, GqlAuthGuard, IUser } from "@api/auth";
import { CardLoader } from "../card";

@Resolver(() => Deck)
@UseGuards(GqlAuthGuard)
export class DeckResolver {
    constructor(
        private readonly deckService: DeckService,
        private cardLoader: CardLoader
    ) {}

    @Query(() => [Deck])
    async getAllDecksByUserId(@CurrentUser() user: IUser): Promise<Deck[]> {
        return this.deckService.getAllDecksByUserId(user.sub);
    }

    @ResolveField(() => [Card], { nullable: true })
    async cards(@Parent() deck: Deck): Promise<Card[]> {
        return this.cardLoader.cardsByDeckId.load(deck.id);
    }

    @Mutation(() => Deck)
    async createDeck(
        @CurrentUser() user: IUser,
        @Args("data") data: CreateDeckInput
    ): Promise<Deck> {
        const parsed: CreateDeckDto = createDeckSchema.parse(data);
        return this.deckService.createDeck(user.sub, parsed);
    }

    @Mutation(() => Deck)
    async updateDeck(
        @CurrentUser() user: IUser,
        @Args("data") data: UpdateDeckInput
    ): Promise<Deck> {
        const parsed: UpdateDeckDto = updateDeckSchema.parse(data);
        return this.deckService.updateDeck(user.sub, parsed);
    }

    @Mutation(() => Deck)
    async softDeleteDeck(
        @CurrentUser() user: IUser,
        @Args("input") input: DeckIdInput
    ) {
        const parsed: DeckIdDto = deckIdSchema.parse(input);
        return this.deckService.softDeleteDeck(user.sub, parsed);
    }

    async restoreDeck() {}

    async permanentlyDeletDeck() {}
}

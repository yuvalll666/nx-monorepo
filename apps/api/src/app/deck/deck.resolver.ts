import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { DeckService } from "./deck.service";
import { CreateDeckInput } from "./dto/create-deck.dto";
import { Deck } from "@shared/models";
import { CreateDeckDto, deckSchema } from "@shared/dto";
import { UseGuards } from "@nestjs/common";
import { CurrentUser, GqlAuthGuard, IUser } from "@api/auth";

@Resolver(() => Deck)
export class DeckResolver {
    constructor(private readonly deckService: DeckService) {}

    @Mutation(() => Deck)
    async createDeck(@Args("data") data: CreateDeckInput) {
        const parsed: CreateDeckDto = deckSchema.parse(data);
        return this.deckService.createDeck("1", parsed);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => String)
    async getAllDecksByUserId(@CurrentUser() user: IUser) {
        return this.deckService.getAllDecksByUserId(user.id);
    }

    // @Mutation(() => User)
    // async createUser(@Args("createUserData") createUserData: CreateUserInput) {
    //     const parsed: CreateUserDto = createUserSchema.parse(createUserData);
    //     return this.deckService.createUser(parsed);
    // }

    // @Query(() => [User])
    // async getAllUsers(): Promise<User[]> {
    //     return this.deckService.findAll();
    // }

    // @Query(() => User)
    // async getUserById(@Args("id") id: string): Promise<User> {
    //     return this.deckService.findById(id);
    // }
}

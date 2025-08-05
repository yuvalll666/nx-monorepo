import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DeckIdInput {
    @Field()
    deckId: string;
}

@InputType()
export class DeckIdsInput {
    @Field(() => [String])
    deckIds: string[];
}

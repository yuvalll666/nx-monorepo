import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CardIdInput {
    @Field()
    cardId: string;
}

@InputType()
export class CardIdsInput {
    @Field(() => [String])
    cardIds: string[];
}

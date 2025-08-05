import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateDeckInput {
    @Field()
    title: string;
}

@InputType()
export class UpdateDeckInput {
    @Field()
    title: string;

    @Field()
    deckId: string;
}
import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateCardInput {
    @Field()
    front: string;

    @Field()
    back: string;

    @Field(() => [String], { nullable: true })
    tags?: string[];

    @Field()
    deckId: string;
}

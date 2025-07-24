import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class Card {
    @Field(() => ID)
    id: string;

    @Field()
    front: string;

    @Field()
    back: string;

    @Field(() => [String], { nullable: true })
    tags?: string[];

    @Field({ nullable: true })
    interval?: number;

    @Field({ nullable: true })
    dueDate?: Date;

    @Field()
    deckId: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}

import { ObjectType, Field } from "@nestjs/graphql";
import { Card } from "../card/card.model";

@ObjectType()
export class Deck {
    @Field()
    id: string;

    @Field()
    title: string;

    @Field()
    userId: string;

    @Field(() => [Card], { nullable: true })
    cards?: Card[];

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}

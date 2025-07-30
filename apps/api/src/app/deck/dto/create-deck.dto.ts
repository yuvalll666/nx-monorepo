import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateDeckInput {
    @Field()
    title: string;
}

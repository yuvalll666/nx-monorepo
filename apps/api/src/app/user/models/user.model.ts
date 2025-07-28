import { ObjectType, Field } from '@nestjs/graphql';
// import { Deck } from 'src/deck/deck.model'; // adjust if needed

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

//   @Field(() => [Deck], { nullable: true })
//   decks?: Deck[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

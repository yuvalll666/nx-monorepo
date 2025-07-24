import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateCardInput {
  @Field({ nullable: true })
  front?: string;

  @Field({ nullable: true })
  back?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[] | null;

  @Field(() => Int, { nullable: true })
  interval?: number;

  @Field({ nullable: true })
  dueDate?: Date | null;
}

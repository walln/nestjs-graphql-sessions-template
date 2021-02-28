import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  readonly username: string;

  @Field(() => ID)
  readonly id: string;

  readonly password: string;
}

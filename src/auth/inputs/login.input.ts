import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AuthLoginInput {
  @Field()
  readonly username: string;
  @Field()
  readonly password: string;
}

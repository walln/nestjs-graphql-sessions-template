import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ExpressContext } from 'apollo-server-express';
import { User } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { UnauthorizedError } from 'type-graphql';
import { AuthService } from './auth.service';
import { AuthLoginInput } from './inputs/login.input';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  //   @Mutation(() => User)
  //   async register(
  //     @Args('input') input: AuthRegisterInput,
  //     @Context() ctx: ExpressContext,
  //   ) {
  //     return this.authService.register(input, ctx.req);
  //   }

  @Mutation(() => User, { nullable: true })
  async login(
    @Args('input') input: AuthLoginInput,
    @Context() ctx: ExpressContext,
  ) {
    return this.authService.login(input, ctx.req);
  }

  @Mutation(() => Boolean)
  async logout(@Context() ctx: ExpressContext) {
    return this.authService.logout(ctx);
  }

  @Query(() => User, { nullable: true })
  async viewer(@Context() ctx: ExpressContext) {
    const userId = ctx.req.session.userId;
    if (!userId) throw new UnauthorizedError();
    return await this.usersService.findOneById(userId);
  }
}

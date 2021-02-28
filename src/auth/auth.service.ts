import { Injectable } from '@nestjs/common';
import { ExpressContext, UserInputError } from 'apollo-server-express';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthLoginInput } from './inputs/login.input';
// import bcryptjs from 'bcryptjs';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserSession(req: Request): Promise<Partial<UserDto> | null> {
    // Graphql Playground IntrospectionQuery DOT NOT Validate
    if (req.body.query.includes('IntrospectionQuery')) {
      return null;
    }

    if (!req.session.userId) {
      return null;
    }

    try {
      // const { password, ...user } = await this.findOneById(req.session.userId);
      const { password, ...user } = await this.usersService.findOneById(
        req.session.userId,
      );
      return user;
    } catch (error) {
      return null;
    }
  }

  // public async register(
  //   input: AuthRegisterInput,
  //   req: Request,
  // ): Promise<UserDto> {
  //   // const register = new UserEntity();
  //   // Object.assign(register, input);
  //   // const user = await this.create(register);
  //   // const user = await this.usersService.create(register)
  //   // req.session.userId = user.id;
  //   // return user;
  // }

  public async login(input: AuthLoginInput, req: Request): Promise<UserDto> {
    const user = await this.usersService.findOne(input.username);

    // if (!user || !bcryptjs.compareSync(input.password, user.password)) {
    //   throw new UserInputError('Invalid email or password');
    // }

    if (!user || user.password !== input.password)
      throw new UserInputError('Invalid email or password');

    req.session.userId = user.id;

    return user;
  }

  public async logout(ctx: ExpressContext): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!ctx.req.session) {
        return reject(new Error('Express session not found'));
      }
      ctx.req.session.userId = null;

      if (!ctx.res) {
        console.log('Res error!');
      }

      return ctx.req.session.destroy((err: any) => {
        if (err) {
          return reject(err);
        }
        return resolve(true);
      });
    });
  }
}

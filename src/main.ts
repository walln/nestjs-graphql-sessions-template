/* eslint-disable @typescript-eslint/no-namespace */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import { UserDto } from './users/dto/user.dto';

// declare module 'express' {
//   export interface Request {
//     user?: UserDto;
//   }
// }

declare module 'express-session' {
  export interface Session {
    userId?: string;
  }
}

// declare global {
//   namespace Express {
//     interface Session {
//       userId: string;
//     }
//   }
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      // cookie: configService.cookieOptions,
      // store: new RedisStore({ client: redisClient }),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();

/* eslint-disable @typescript-eslint/no-namespace */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import { SESSION_MAX_AGE, SESSION_SECRET } from './common/session.constants';
import { __prod__ } from './common/utils.constants';

declare module 'express-session' {
  export interface Session {
    userId?: string;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: SESSION_MAX_AGE,
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();

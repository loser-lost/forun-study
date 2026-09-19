import { Module, ValidationPipe } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AuthModule } from './auth/auth.module.js';
import { UserModule } from './user/user.module.js';
import { DatabaseModule } from './database/database.module.js';

import { ConfigModule } from '@nestjs/config';
import { QuestionsModule } from './questions/questions.module.js';
import { AnswerModule } from './answer/answer.module.js';
import { APP_PIPE } from '@nestjs/core';



export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    AuthModule, UserModule, DatabaseModule, QuestionsModule, AnswerModule],
  providers: [{
    provide: APP_PIPE,
    useClass: ValidationPipe
    },
  ],
})
export class AppModule {}

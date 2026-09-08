import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AuthModule } from './auth/auth.module.js';
import { UserModule } from './user/user.module.js';
import { DatabaseModule } from './database/database.module.js';

import { ConfigModule } from '@nestjs/config';


export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    AuthModule, UserModule, DatabaseModule]
})
export class AppModule {}

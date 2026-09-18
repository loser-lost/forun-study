import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { UserModule } from '../user/user.module.js';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard.js';
import { DatabaseModule } from '../database/database.module.js';

@Module({
  imports: [DatabaseModule, UserModule, JwtModule.register({
    global: true,
    secret: process.env.SECRET_KEY,
    signOptions: { expiresIn: '1h' },
  })],

  controllers: [AuthController],
  providers: [AuthService, AuthGuard,],
  exports: [AuthGuard], // exportando o AuthService e o JwtModule para que eles possam ser usados em outros módulos, como o UserModule
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';
import { DatabaseModule } from '../database/database.module.js';
// o módulo é responsável por agrupar os controllers e services relacionados a uma funcionalidade, nesse caso, o user
@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], //exportando o UserService para que ele possa ser usado em outros módulos, como o AuthModule
})
export class UserModule {}

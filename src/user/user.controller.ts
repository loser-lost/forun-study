import { Body, Controller, Post } from '@nestjs/common';
import type { Prisma, User } from '../generated/prisma/client.js';
import { UserService } from './user.service.js';


@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}// outra forma de injetar dependencias

    @Post('user')
    async singUpUser(// rota para criar um novo usuário
        @Body() userData: Prisma.UserCreateInput,// o body do request é injetado no userData
    ): Promise<User> {// o retorno da função é um usuário
        return this.userService.createUser(userData);// chama o método createUser do userService
    }// a tipagem esta sendo feita prelo prisma, que é um ORM que gera tipagem para o banco de dados
}


import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import type { Prisma, User } from '../generated/prisma/client.js';
import { UserService } from './user.service.js';
import { AuthGuard } from '../auth/auth.guard.js';

// o controler é responsável por receber as requisições e enviar para o service, que é responsável por fazer a lógica de negócio

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}// outra forma de injetar dependencias

    @Post()                                                                                             // rota para criar um novo usuário
    async singUpUser(                                                                                   // rota para criar um novo usuário
        @Body() userData: Prisma.UserCreateInput,                                                       // o body do request é injetado no userData
    ): Promise<User> {                                                                                  // o retorno da função é um usuário
        return this.userService.createUser(userData);                                                   // chama o método createUser do userService
    }                                                                                                   // a tipagem esta sendo feita prelo prisma, que é um ORM que gera tipagem para o banco de dados

    @UseGuards(AuthGuard) // rota protegida por autenticação
    @Get(':id') // rota para listar um usuário específico
    async getUser(@Param('id') id: string): Promise<User | null> {
        return this.userService.User({ id: Number(id)});
    }

    @UseGuards(AuthGuard) // rota protegida por autenticação
    @Patch(':id')
    async updateUser(
        @Body() userData: Prisma.UserUpdateInput,
        @Param('id') id: string
    ): Promise<User> {
        return this.userService.updateUser({where: {id: Number(id)}, data: userData})
    }
    
    @UseGuards(AuthGuard) // rota protegida por autenticação
    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<User | null> {
        return this.userService.deleteUser({ id: Number(id)})
    }

}


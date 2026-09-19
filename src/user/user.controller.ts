import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import type { User } from '../generated/prisma/client.js';
import { UserService } from './user.service.js';
import { AuthGuard } from '../auth/auth.guard.js';

import { CreateUserDto } from './dto/create-user.dto.js';

// o controler é responsável por receber as requisições e enviar para o service, que é responsável por fazer a lógica de negócio

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}// outra forma de injetar dependencias

    @Post()                                                                                             // rota para criar um novo usuário
    async singUpUser(                                                                                   // rota para criar um novo usuário
        @Body(new ValidationPipe()) createUserDto: CreateUserDto,                                                       // o body do request é injetado no userData
    ): Promise<User> {                                                                                  // o retorno da função é um usuário
        return this.userService.createUser(createUserDto);                                                   // chama o método createUser do userService
    }                                                                                                   // a tipagem esta sendo feita prelo prisma, que é um ORM que gera tipagem para o banco de dados

    @UseGuards(AuthGuard) // rota protegida por autenticação
    @Get(':id') // rota para listar um usuário específico
    async getUser(@Param('id', ParseIntPipe) id: number): Promise<Omit<User, 'password'> | null> {
        return this.userService.User({ id });
    }

    @UseGuards(AuthGuard) // rota protegida por autenticação
    @Patch(':id')
    async updateUser(
        @Body(new ValidationPipe()) createUserDto: CreateUserDto,
        @Param('id', ParseIntPipe) id: number
    ): Promise<User> {
        return this.userService.updateUser({where: {id: id}, data: createUserDto})
    }
    
    @UseGuards(AuthGuard) // rota protegida por autenticação
    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
        return this.userService.deleteUser({ id })
    }

}


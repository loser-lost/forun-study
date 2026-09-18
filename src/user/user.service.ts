import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import type { Prisma, User } from '../generated/prisma/client.js';
import * as bcrypt from 'bcrypt';

// o servce é responsável por fazer a lógica de negócio, ele é chamado pelo controller, que é responsável por receber as requisições e enviar para o service

@Injectable()
export class UserService {
    @Inject()
    private readonly prisma: PrismaService;// injeção de dependência do prisma service para o user service

    async User(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    ): Promise<Omit<User, 'password'> | null> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput, 
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
                password: false, // não retorna a senha do usuário
            }
        
        });
    }
    async createUser(data: Prisma.UserCreateInput) {
        const userAlreadyExists = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (userAlreadyExists) {
            throw new ConflictException('Já existe um usuário cadastrado com este e-mail.');
        }
        const hashPassword = await bcrypt.hash(data.password, 10);
        return this.prisma.user.create({
            data: { ...data, password: hashPassword },
        });
    }


    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput,
        data: Prisma.UserUpdateInput,
    }): Promise<User> {
        const { where, data } = params;
        return this.prisma.user.update({
            where,
            data,
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput):
    Promise<User> {
        return this.prisma.user.delete({
            where,
        });
    }
}


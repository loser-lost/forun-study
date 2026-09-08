import { Inject, Injectable } from '@nestjs/common';
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
    ): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
    }
    async createUser(data: Prisma.UserCreateInput) {
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


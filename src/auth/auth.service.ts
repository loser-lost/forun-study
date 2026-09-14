import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import type { Prisma, User } from '../generated/prisma/client.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    @Inject()
    private readonly usersService: UserService;

    async signIn(params: Prisma.UserCreateInput): Promise<User> {  //ou pode usar o Omit<User, 'password'> para retornar o usuário sem a senha
        const user = await this.usersService.User({ email: params.email });
        if (!user) throw new NotFoundException('User not found');

        const passwordMatch = await bcrypt.compare(params.password, user.password);
        if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

        const {password, ...result} = user
        return result as User; //retornando o usuário sem a senha
    }
    
    
    
    
    /*constructor(private usersService: UserService) {} //o constructor recebe uma instância do UserService, que é injetada pelo NestJS. Isso permite que o AuthService utilize os métodos do UserService para realizar operações relacionadas aos usuários, como autenticação e verificação de credenciais.

    async signIn(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user?.password !== password){
            throw new Error('Invalid credentials');
        }
        const { password, ...result } = user;
        return result;
    }*/
}

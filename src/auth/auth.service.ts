import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import type { Prisma } from '../generated/prisma/client.js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    @Inject()
    private readonly usersService: UserService;

    @Inject()
    private readonly jwtService: JwtService;

    async signIn(params: Prisma.UserCreateInput): 
    Promise<{access_token: string}> 
    { 
        const user = await this.usersService.User({ email: params.email });
        if (!user) throw new NotFoundException('User not found');

        const passwordMatch = await bcrypt.compare(params.password, user.password);
        if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

        const payload = { sub: user.id }

        return {
            access_token: await this.jwtService.signAsync(payload),
        }
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

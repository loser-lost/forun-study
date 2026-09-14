import { Body, Controller, Inject, Post } from '@nestjs/common';
import type { Prisma, User } from '../generated/prisma/client.js';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {

    @Inject()
    private readonly authService: AuthService;

    @Post('signin')
    async signin(@Body() body: Prisma.UserCreateInput) {
        return this.authService.signIn(body);
        
    }
}

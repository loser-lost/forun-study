import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    @Inject()
      private readonly jwtService: JwtService;

  async canActivate(context: ExecutionContext,):Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const authorization = this.extractTokenFromHeader(request);
    if (!authorization) throw new UnauthorizedException('Missing authorization header');
    try {
      const payload = this.jwtService.verify(authorization, { secret: process.env.JWT_SECRET });
      request['sub'] = payload;
    } catch {
      throw new UnauthorizedException('Invalid authorization token');
    }
    return true;
}

  private extractTokenFromHeader(request: Request): string | undefined {
    // No Express, acessamos request.headers.authorization diretamente (como propriedade)
    const authorization = request.headers.authorization;
    if (!authorization) return undefined;
    
    const [type, token] = authorization.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

}

// Autorization: Bearer <token>
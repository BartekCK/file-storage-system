import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthProxyService } from '../services/auth-proxy.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authProxyService: AuthProxyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const token = req.headers.authorization?.substring(7, req.headers.authorization?.length) || null;

    if (!token) {
      throw new UnauthorizedException('Authorization bearer token is required is headers');
    }

    const result = await this.authProxyService.send('token-verify', token).toPromise();
    console.log(result);
    return true;
  }
}

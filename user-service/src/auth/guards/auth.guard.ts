import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthProxyService } from '../services/auth-proxy.service';
import { lastValueFrom } from 'rxjs';
import { UserAuth } from '../../common/types/user-auth.type';
import { UserRequest } from '../../common/interfaces/user-req.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authProxyService: AuthProxyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: UserRequest = <UserRequest>context.switchToHttp().getRequest<Request>();

    const token = req.headers.authorization?.substring(7, req.headers.authorization?.length) || null;

    if (!token) {
      throw new UnauthorizedException('Authorization bearer token in required is headers');
    }

    try {
      const result: UserAuth = await lastValueFrom(this.authProxyService.send('token-verify', token));
      req.user = result;
      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}

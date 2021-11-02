import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export abstract class AuthProxyService extends ClientProxy {}

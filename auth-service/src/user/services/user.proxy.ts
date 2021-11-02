import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';

@Injectable()
export abstract class UserProxy extends ClientProxy {}

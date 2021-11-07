import { ClientProxy } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class FileProcessProxyService extends ClientProxy {}

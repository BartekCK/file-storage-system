# File storage system
![https://backupeverything.co.uk/what-is-cloud-storage-how-is-the-data-stored-on-the-cloud/](./docs/cloud-storage.jpg)


## Table of Contents 
1. [How it works](#1-how-it-works)
    - 1.1 [Queues](#11-queues)
    - 1.2 [Auth service](#12-auth-service)
    - 1.3 [File processor](#13-file-processor)
    - 1.4 [File service](#14-file-service)
    - 1.5 [User service](#15-user-service)
   
2. [Reactive programming](#2-reactive-programming)
    - 2.1 [Use cases](#21-use-cases)
    - 2.2 [Error handling](#22-error-handling)

3. [RPC](#3-rpc)
    - 3.1 [Message pattern logger](#31-message-pattern-logger)
    - 3.2 [Client proxy injection](#32-client-proxy-injection)

4. [ADR](#4-adr)
5. [How to run](#5-how-to-run)

## 1. How it works
![System overview](./docs/system.png)
Lorem ipsum

Tell about files space

documentation

### 1.1 Queues
![Queues overview](./docs/queue.png)

Lorem ipsum
### 1.2 Auth service
Lorem ipsum
#### Local strategy
Lorem ipsum
### 1.3 File processor
Lorem ipsum
#### Aspect ratio
Lorem ipsum
#### Clear image Exif
Lorem ipsum
### 1.4 File service
Lorem ipsum
#### Database MongoDB
Lorem ipsum
#### Static files and tokens authorization stored by Redis memory database 
Lorem ipsum
#### File validation
Lorem ipsum
### 1.5 User service
Lorem ipsum
#### Database PostgreSQL
#### Migrations

Lorem ipsum

## 2. Reactive programming
Lorem ipsum
### 2.1 Use cases
### 2.2 Error handling
```ts
@Catch(RpcException)
export class RpcPatternFilter implements RpcExceptionFilter<RpcException> {
  constructor(private readonly loggerService: LoggerService) {
    loggerService.setContext(RpcPatternFilter.name);
  }

  catch(exception: RpcException, host: ArgumentsHost): Observable<string> {
    this.loggerService.warn(`Caught: [${exception.message}]`);

    throw new Error(exception.message);
  }
}
```

## 3. RPC
Lorem ipsum
***ADD DIAGRAM***
### 3.1 Message pattern logger
### 3.2 Client proxy injection

## 4. ADR
Lorem ipsum

## 5. How to run




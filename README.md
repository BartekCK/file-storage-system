# File storage system
![https://backupeverything.co.uk/what-is-cloud-storage-how-is-the-data-stored-on-the-cloud/](./docs/cloud-storage.jpg)


## Table of Contents 
1. [How it works](#how-it-works)
    - 1.1 [Queues](#queues)
    - 1.2 [Auth service](#Auth-service)
    - 1.3 [File processor](#File-processor)
    - 1.4 [File service](#File-service)
    - 1.5 [User service](#user-service)
   
2. [Reactive programming](#reactive-programming)
    - 2.1 [Use cases](#Use-cases)
    - 2.2 [Error handling](#Error-handling)

3. [RPC](#rpc)
    - 3.1 [Message pattern logger](#Message-pattern-logger)
    - 3.2 [Client proxy injection](#Client-proxy-injection)

4. [ADR](#adr)
5. [How to run](#How-to-run)

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

## ADR
Lorem ipsum

## How to run




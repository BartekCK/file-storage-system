# 1. Implement RabbitMQ as message-broker

Date: 2021-10-31

## Status

Accepted

## Context

App need RPC communication between services and also
place to put messages aside for later use.

## Decision

App need to communicate between with other services, so we need run
functions on other services and wait for result, that's why RabbitMQ was implemented. 
 
## Consequences

NestJS with `@nestjs/microservices` package doesn't support all RabbitMQ features
but RPC and pattern handler works great. App doesn't require to use exchanges or topic.
RabbitMQ is also open source so we won't have 
unexpected additional costs on developer and production stage 
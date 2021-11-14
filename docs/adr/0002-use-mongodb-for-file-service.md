# 2. Use MongoDB for file service

Date: 2021-11-13

## Status

Accepted

## Context

`File service` need to store additional data about files like size, fileName etc.

## Decision

We don't have specified all required data for store but basically this data will be grow
horizontal so also will be used horizontal scaling, that's why
MongoDB was implemented as database for file service.

## Consequences

For Node.js one of the most popular clients is mongoose. Mongoose has problem with dynamic migrations
but in simple way allow to implement repositories and keep OOP programing.
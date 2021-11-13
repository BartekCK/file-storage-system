# 3. Add database for auth service and store another services as clients

Date: 2021-11-13

## Status

Rejected

## Context

All services will expose authorised endpoints. App need to single place for simple 
authorization 

## Decision

Additional creation client per service is overcomplicated for this kind of small app.
Our auth service won't grow and the main task is to authorise services clients but all services
are in the same root network. 

## Consequences

Every request from services different than `auth-service` require using RPC to check token and 
decode it.
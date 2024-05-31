# [↤](../README.md) Api

### Rules
- Use restful approach
- Route starts with __{BASE_URL}/{API}/{API_VERSION}/{ENDPOINT}__
- Should use only __POST__ requests

## Endpoint
### Routes

### Requests - use base restful approach
- `/articles/`      [GET] - Get list of items
- `/articles/{id}`  [GET] - Get item
- `/articles/`      [POST] - Create new item
- `/articles/{id}`  [POST|PUT] - Update item
- `/articles/{id}`  [DELETE] - Delete item


### Response - can be built on frontend
```typescript
{
  // response status 200/300/400/500 ...
  // allows handle errors
  status: number,

  // requested data or error description
  payload: unknown,

  // additional information describing data selection criteria
  // for example pagination, filters and so on
  meta?: Record<string, unknown>,
}
```

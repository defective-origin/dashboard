# [↤](../README.md) Structure

### Architecture
- 3 Layers 
  - Data layer (I)(I + DB, I + I)
  - Assembly layer (II) (II + I, II + II)
  - App layer (III) (III + II) - Each app has own api
- Each part:
  - Is microservice
  - Is independent
  - Register itself in swagger
- Middleware
  - Authentication and Authorization
  - Accumulate metrics

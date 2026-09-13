# [↤](../README.md) Repository

### Rules
- Builds and maintains `CI/CD` pipelines.
- Manages cloud `infrastructure` and `deployment` processes.
- Monitors system `performance`, `availability`, `security`.
- Automates `operational` and `development` workflows.

### Services
- `Docker`  
  Used to run all application services in isolated containers for local development. Ensures a consistent development environment across all machines and simplifies setup, dependency management, and service orchestration.

- `Kafka`  
  A distributed event streaming platform used for asynchronous communication between services. Enables reliable event processing, decouples system components, and supports high-throughput message delivery.

- `MongoDB`  
  The primary document-oriented database used to store application data. Provides flexible schemas, fast development cycles, and efficient handling of JSON-like documents.

- `Redis`  
  An in-memory data store used for caching, session storage, distributed locking, and rate limiting. Improves application performance by reducing database load and providing fast data access.

- `Elasticsearch`  
  A distributed search and analytics engine used for full-text search, filtering, and data analysis. Enables fast and scalable search capabilities across large datasets.

- `Pino + pino-http + Grafana Loki`  
  The centralized logging stack:
  - `Pino` generates structured application logs with minimal performance overhead.
  - `pino-http` automatically logs HTTP requests and responses.
  - `Grafana Loki` stores and indexes logs, making them searchable and observable through Grafana dashboards.

# [↤](../README.md) Backend

### Menu
- [Code](../client/docs/CODE.md) like in client
- [Endpoints](./docs/ENDPOINTS.md)
- [Structure](./docs/STRUCTURE.md)

## Necessary programs
- [Podman](https://podman.io/) - allows to work with containers
- [Postman](https://learning.postman.com/docs/getting-started/installation/installation-and-updates/) or [Robo 3T](https://robomongo.org/) - allows to work with database

## Commands
### Start app
Build containers if it's first launch
```sh
cd ./server
yarn run pods:up
```

Run pods if it's not first launch
- launch Podman app
- launch pods: pod-server


Run app
```sh
yarn run dev
```


### Prefill database with mock data
Build containers if it's first launch
```sh
yarn run prefill
```

### Launches tests
```sh
# Run test only once
yarn test

# Run test with watch flag
yarn test:watch
```

#### Code checkers
```sh
# run all linters
yarn lint

# fix linter errors
yarn lint:fix

# check imports
yarn lint:typecheck
```

### Check app
```sh
yarn verify
```

### Build app
```sh
yarn build
```

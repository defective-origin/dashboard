# [↤](../README.md) Backend

### Menu
- [Endpoints](./docs/ENDPOINTS.md)
- [Structure](./docs/STRUCTURE.md)

## Commands
### Program installation
- [Podman](https://podman.io/) - allows to work with containers
- [Postman](https://learning.postman.com/docs/getting-started/installation/installation-and-updates/) or [Robo 3T](https://robomongo.org/) - allows to work with database



### Start app
Build containers if it's first launch
```sh
cd ./server
yarn run pods:up
```

Run pods if it's not first launch
- launch Podman app
- launch pods: pod_dashboard-server


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

```
yarn test
```

#### Code checkers

Commands with **:fix** prefix - fix linter errors.

Other commands just check parts of code.

#### Launches all lint checkers for code and styles.

```sh
yarn lint
yarn lint:fix
```

### Check app
```sh
yarn verify
```

### Build app
```sh
yarn build
```

# Dashboard Web Application

Allows users to create boards which show different widgets.

The main task of our application is a convenient, fast and independent display of data.
All you need to display them is to use ready-made widgets, boards and APIs by connecting them or implementing your own and registering them.

1) Independence of parts - API, widget, metrics collection (on its side)
2) Security - I don’t know anything about you and your data
3) Easy to use - Managing widgets, boards, settings

### Menu
- [Frontend](./client/README.md)
- [Backend](./server/README.md)
- [Design](./docs/DESIGN.md)
- [Management](./docs/MANAGEMENT.md)
- [Repository](./docs/REPOSITORY.md)

## Global commands
- packages should be fixed. Without `^`.
- yarn in script must have `run` command, example: `yarn run a && yarn run b`

### Work with packages
```sh
# Remove all packages and clear cache
yarn packages:clean

# Remove all packages, clear cache and reinstall all packages
yarn packages:reinstall
```

### Start app 
```sh
# Run client and server in parallel  
yarn dev

# Check client
yarn dev:client

# Check server
yarn dev:server
```

### Lint app  
```sh
# Run linters on client and server in parallel 
yarn lint

# Run linters on client
yarn lint:client

# Run linters on server
yarn lint:server
```

### Test app 
```sh
# Test client and server in parallel  
yarn test

# Test client
yarn test:client

# Test server
yarn test:server
```

### Check app 
```sh
# Validate client and server in parallel  
yarn verify

# Validate client
yarn verify:client

# Validate server
yarn verify:server
```

### Build app
```sh
# Compile client and server in parallel 
yarn build

# Compile client
yarn build:client

# Compile server
yarn build:server
```

### List of workspaces
```sh
yarn ws
```    

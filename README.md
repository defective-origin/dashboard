# Dashboard Web Application

Allows users to create boards which show different widgets.

The main task of our application is a convenient, fast and independent display of data.
All you need to display them is to use ready-made widgets, boards and APIs by connecting them or implementing your own and registering them.

1) Independence of parts: API, widget, metrics collection (on its side)
2) Security: I don’t know anything about you and your data
3) Easy to use: Managing widgets, boards, settings

## Menu
- [Frontend](./client/README.md)
- [Backend](./server/README.md)
- [E2E](./e2e/README.md)
- [DevOps](./docs/DEVOPS.md)
- [Management](./docs/MANAGEMENT.md)
- [Repository](./docs/REPOSITORY.md)

## Before start
The first time you open a project, you will be prompted to install all required `VS Code extensions`. Which described and can be found in `.vscode/.settings` file of __client__ and __server__ app. You can also install them __manually__ by opening the extensions tab and start searching for `@recommended`.
- `Prettier` is forbidden because of [issue with printWidth](https://github.com/prettier/prettier/issues/3468)

## Global commands
### Work with packages
```sh
# Install all necessary packages
yarn

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

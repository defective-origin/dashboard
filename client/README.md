# [↤](../README.md) Frontend

### Links
- [App](https://defective-origin.github.io/dashboard/)

## Menu
- [Design](./docs/DESIGN.md)
- [Structure](./docs/STRUCTURE.md)
- [Rules](./docs/RULES.md)
- [Environment](./docs/ENV.md)

## Commands
### Launches application on [url](http://localhost:5173/).
```sh
yarn dev
```

### Production Preview
```sh
yarn build # Build application for production.
yarn preview # Launch built application.
```

### Launches the test runner in the interactive watch mode.
```sh
# Run unit and e2e tests
yarn test

# Run unit tests only once
yarn test:unit

# Run unit tests with watch flag
yarn test:unit:watch

# Run unit tests for snapshot updates
yarn test:unit:snap

# Run e2e tests only once
yarn test:e2e

# Run e2e tests in ui mode
yarn test:e2e:ui
```

### Code checkers
```sh
# run all linters
yarn lint

# fix all linter issues
yarn lint:fix

# run linters and fixes partially 
yarn lint:es
yarn lint:es:fix
yarn lint:css
yarn lint:css:fix
yarn lint:deps
```

### Check code after changes
```sh
yarn verify
```

### Code generator
Generate parts of code and insert in appropriate folders
```sh
yarn gen
```

For more information check [Structure](./docs/STRUCTURE.md)

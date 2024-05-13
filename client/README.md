# [↤](../README.md) Frontend

### Links
- [Requirements and components](https://defective-origin.github.io/dashboard/)
- [UI Framework](https://mui.com/material-ui/all-components/)
- [Icons](https://fonts.google.com/icons?icon.query=dark+mode)

### Menu
- [Structure](./docs/STRUCTURE.md)
- [Rules](./docs/RULES.md)
- [Roadmap](./docs/ROADMAP.md)
- [Environment](./docs/ENV.md)

### Code part

- The first time you open a project, you will be prompted to install all required __VS Code extensions__. You can also install them __manually__ by opening the extensions tab and start searching for __@recommended__.
- We don't use **Prettier** because of [issue with printWidth](https://github.com/prettier/prettier/issues/3468)

## Launch app
### Before start

Install extensions which described in **.vscode/.settings** file

### Available Scripts

In the project directory, you can run:

#### Installs all necessary packages.

```
yarn
```

#### Launches application on [url](http://localhost:5173/).

```
yarn dev
```

#### Production Preview

```
yarn build // Build application for production.
yarn preview // Launch built application.
```

#### Launches the test runner in the interactive watch mode.

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
yarn lint:es
yarn lint:es:fix
yarn lint:css
yarn lint:css:fix
```

#### Check code after changes for production

```
yarn check
```

#### Code generator

To generate structure parts of code.

```
yarn gen:init
```

To generate small parts of code.

```
yarn gen
```

For more information check file **/STRUCTURE.md**


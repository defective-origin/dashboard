# Dashboard Web Application

Allows users to create boards which show different widgets.

## Before start

Install extensions which described in __.vscode/.settings__ file

## Available Scripts

In the project directory, you can run:

### Installs all neccesary packages.

```
yarn
```

### Launches application on [url](http://localhost:5173/).

```
yarn dev
```

### Production Preview

```
yarn build // Build application for production.
yarn preview // Launch built application.
```

### Launches the test runner in the interactive watch mode.
```
yarn test
```


### Code checkers

Commands with __:fix__ prefix - fix linter errors.

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


#### Also you can use prettier to check and fix linter issues.

```sh
yarn prettier
yarn prettier:fix
```

#### Check code after changes for production

```
yarn check:changes
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

For more information check file __generator/README.md__

## Short Structure description

For more information check file __generator/README.md__
Adapter pattern
- build/ - built application

- public/ - assets which will be loaded after page loading

- generator/ - generator of application parts
	
- src/
	- common/ - contains general code/features (this features can be moved into packages), overriding packages.

	- api/ - contains tools and handlers for work with network

	- assets/ - contains all asset files which should be loaded with application

	- Launcher/ - All Launchers  - contains tools and settings without which the application cannot or should not work

	- pages/ - contains components which gets data from a api and spread them between components (can work only with components, screens, pages) [component has postfix: Page]
	- screens/ - contains components which [not] gets data from a api and spread them between components (can work only with components, screens) [component has postfix: Screen]
	- components(UI)/ - contains pure, unified components without logic which gets data out, all data must be get from props (can work only with components) [don't have postfix]

	- features/ - the same structure as in app but is used for feature flag. After feature flag implementation All feature code should be merged/should be sorted files into app files 

	- locale/ - contains localization configs and localized labels, texts, digits, signs, ...

	- router/ - contains router configs, handlers and so on

	- store/ - contains store configs, handlers and so on
	
	- types/ - contains all type definition

	- tests/ - contains configs and settings for tests

	- web-workers/ - contains configs and settings for web-workers

## [Environment settings](https://vitejs.dev/guide/env-and-mode.html)

All config variables are in one of the file

```
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified mode
.env.[mode].local   # only loaded in specified mode, ignored by git
```

Only variables prefixed with VITE_ are exposed to your Vite-processed code. e.g. for the following env variables:
```
VITE_SOME_KEY=123
```

# Project parts generator
React app infrastructure creator.
Allows to initialize the application infrastructure or create parts of it.'

## Install dependencies
```sh
  yarn add plop
```

## Place generator to right place
Project
  - generator/
  - src/
  - package.json

## Add scripts to package json
```sh
  "scripts": {
    "gen": "plop --plopfile ./generator/generator.parts.js --dest ./src"
    "gen:init": "plop --plopfile ./generator/generator.init.js --dest ./src"
  },
```

## Generate base infrastructure
```sh
	yarn gen:init
```

## Generate part of infrastructure
```sh
	yarn gen
```

## Allowed infrastructure

Always use managers and data models
Managers
	- contain logic for a specific model
	- pass data through themselves
	- change model data
Model
	- does not contain logic
	- only describes the properties of an object


CLIENT STRUCTURE - all parts should be modular and should keep Facade/Adapter pattern
- build/
- public/ - assests which will be loaded after page loading
- generator/ - generator of application parts
	- templates/
	- generator.init.ts
	- generator.parts.ts
	- generator.tool.ts
	- generator.prompt.ts
	- generator.action.ts
	
- src/
	- index.tsx - bootstrap file

	- common/ - contains general code/features (this features can be moved into packages), overriding packages.
		- constants/
			- ConstantUsageTypeName.constant.ts
			- index.ts
		- tools/ - Each file does default export but types should be exported via common export
			- ToolUsageTypeName.tool.ts - each helper is cl
			- index.ts
		- managers/ - Each file does default export but types should be exported via common export. Each file does one type functionality (CacheManager, CMSManager, FileManager, PDFManager, APIManager ...)
			- ManagerUsageTypeName.manager.ts
			- index.ts
		- hooks/ - Each file contains two hooks. First hook is with ref. Second is without ref, he creates ref and call first hook  
			- UseHookName
				- index.ts
				- UseHookName.hook.ts
				- UseHookName.test.ts
				- UseHookName.tool.ts
				- UseHookName.conf.ts
			- index.ts
		- errors/ - containes errors
			- ErrorUsageTypeName.error.ts
			- index.ts
		- models/
			- ModelUsageTypeName.model.ts
			- index.ts

	- api/ - contains tools and handlers for work with network interaction
		- ApiSliceName - Each api  endpoint does default export. Methods receive data from server API or browser API
			- ApiTypeName.conf.ts
			- ApiTypeName.hook.ts - containes unified api useApiNameApiManager hook to handle equals server reponse, caching, cancellation of requests
			- ApiTypeName.mock.ts - has mock object hook for jest.spy and mock data
			- ApiTypeName.schema.ts - contains data validations and models for METADATA, RESPONSE, ERROR RESPONSE
			- ApiTypeName.model.ts - containes only models for data received from api and Errors
			- ApiTypeName.error.ts - containes errors
			- ApiTypeName.test.ts
			- ApiTypeName.tool.ts
			- index.ts

		- api.conf.ts
		- api.context.ts
		- api.tool.ts
		- api.hook.ts
		- api.model.ts
		- api.interceptor.ts - contains request interceptors
		- api.error.ts - Base | Response | Request errors
		- index.ts - configurations and settings - export useApiManager hook

	- assets/ - contains all assets which should be loaded with application
		- fonts/
		- images/
			- icons/svg/
				- icon-name.svg
				- index.ts - module file which gather all icon imports and export map of icons as default
			- placeholders/
				- placeholder-name.svg
				- index.ts
		- styles/
			- mixins.scss
			- theme.scss - colors 
			- variables.scss - paddings, margins, ...
			- index.scss
	
	- Launcher/ - All Launchers  - contains tools and settings without which the application cannot or should not work  + env settings in constants
		- Component structure
  	- SystemLauncher - [StrictMode | Router | Store | Api | locale + dayjs | HotKeys]
  	- MonitorLauncher - [Log | Analytics | ABTest + FeatureFlag]
  	- UILauncher - [UISettings | SnackBar | ModalWindow | Suspense]
  	- AccountLauncher - [AccountSettings | AccountUser]
    	- Context structure
  		- LauncherNameLauncher.component.ts
  		- LauncherNameLauncher.context.ts
  		- LauncherNameLauncher.conf.ts
  		- LauncherNameLauncher.test.ts
  		- LauncherNameLauncher.stub.ts
  		- index.ts

	- web-workers/
		- WebWorkerNameWW/
			- WebWorkerTypeNameWW.ww.ts
			- WebWorkerTypeNameWW.tool.ts
			- WebWorkerTypeNameWW.error.ts
			- index.ts
		- index.ts

	- pages/ - contains components which gets data from a api and spread them between components (can work only with components, screens, pages) [component has postfix: Page]
	- screens/ - contains components which [not] gets data from a api and spread them between components (can work only with components, screens) [component has postfix: Screen]
	- components(UI)/ - contains pure, unified components without logic which gets data out, all data must be get from props (can work only with components) [don't have postfix]
		- ComponentName
			- SubComponentName1/ (Private Case Of Component) - sub component which belong to component and styled for him and can be used only in him

			//- separated component approach [outdated] -//
			- ComponentName.container.tsx - contains container which contains only logic and render view component [outdated]
			- ComponentName.view.tsx - contains view which render data getting from props [outdated]
			- ComponentName.model.tsx - contains models which is used in view and container [outdated]
			//- simple component approach -//
			- ComponentName.component.tsx
			- ComponentName.style.scss
			- ComponentName.hook.ts
			- ComponentName.context.ts
			- ComponentName.conf.ts
			- ComponentName.tool.ts
			- ComponentName.error.ts
			- ComponentName.test.ts
			- ComponentName.conf.ts - default conf for component. Also can includes types
			- ComponentName.story.json - config for storybook
			- index.tsx
		- index.ts


	- shared/ - contains code that can be moved to package(npm) [outdated]

	- visual|widgets/ - contains components for CMS (in most cases It must be adapter component. You should create CMSAdapter and CMSContainer)

	- features/ - the same structure as in app but is used for feature flag. After feature flag implementation All feature code should be merged/should be sorted files into app files 

	- locale/ - contains localized labels, texts, digits, signs, ...
		- index.ts - configurations and settings
		- locale.tool.ts
		- locale.conf.tsx
		- locale.error.ts
		- locale.test.ts
		- i18n/
			- en.json
			- ru.json
			- index.ts
		- l10n/
			- en.json
			- ru.json
			- index.ts
			
		---| or |---

		- en/
			- i18n.json
			- l10n.json
			- index.ts

	- router/ - contains project routes, hooks, guards... - [IN PROGRESS]
		- routes/
			- __tests__/
			- RouterName.route.ts
			- index.ts
		- guards/
			- __tests__/
			- GuardName.guard.ts
			- index.ts
		- router.conf.ts
		- router.tool.ts
		- router.hook.ts
		- router.model.ts
		- router.error.ts
		- router.tree.ts
		- index.ts - configurations and settings

	- store/ - contains project store (use redux-toolkit)
		- index.ts - store configurations and settings
		- store.conf.ts
		- store.tool.ts
		- store.hook.ts
		- store.model.ts
		- store.error.ts
		- store.mock.ts - has mock object hook for jest.spy and mock data
		- StoreSlice/
			- StoreSlice.slice.ts
			- StoreSlice.thunk.ts - outdated - use hooks instead (managers)
			- StoreSlice.selector.ts
			- StoreSlice.hook.ts - contains useManagerNameStoreManager hook - whick call dispatch and select data and also MOCK for it
			- StoreSlice.mock.ts - has mock object hook for jest.spy and mock data
			- StoreSlice.test.ts
			- index.ts
	
	- types/ - contains all type difinition
		- index.d.ts
		- name.d.ts

	- tests/ - configurations and settings
		- setupTests.ts
		- index.ts

- docs/ - contains .md files with project documentations
	- STRUCTURE/
		- Client.doc.md
		- Component.doc.md
	- GIT/
		- Branching.doc.md
		- PullRequest.doc.md
	- FeBeInteraction.doc.md
	- RoadMap.doc.md
	- Target.doc.md
	- Naming.doc.md
	- Git.doc.md

- conf/
	- .eslintrc.json - program language style config
	- .stylelintrc.json - styles style config
	- .prettierrc.json - config of auto style fixes 
	- .gitignore
	- .package.json - project config
	- .storybook/ - config of tool for UI development
	- README.md - project description
	- tsconfig.json - program language config
	- yarn.lock - package manager cache


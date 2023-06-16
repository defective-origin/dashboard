# STEPS
### **PROJECT STRUCTURE**
* (-) server - each api should be separated project
  * (-) Account/User api
  * (-) Log api
  * (-) lazy loadable widget/component api
  * (-) config api
  * (-) assembly api 
* (+) client
	* (-) common - contains constants, helpers(data handlers), HOCs, models/entities, services, and other general code
	* (-) shared - contains code that can be moved to package(npm)
	* (+) assets - contains fonts, images, styles that are loaded with application
	* (+) core - contains tools and settings without which the application cannot or should not work
	* (+) components(UI) - contains pure, unified components without logic
	* (+) screens/containers/pages(logic) - contains pages, parts of pages and logic for components
	* (+) locales - contains translated labels, texts
	* (+) store - contains project store(slices, actions, selectors, ...)


### **DOCUMENTATION**
* (-) frontend
	* (-) folder structure
	* (-) development process
	* (-) installed default packages
* (-) backend
	* (-) folder structure
	* (-) development process
	* (-) api interfaces (requests, response)
	* (-) communication with database and other services
* (-) general
	* (-) communication backend with frontend
* (-) documentation of project build on environment
* (-) documentation of code style, commit/push style, etc

### **DESIGN**
* (-) design unified components (inputs, tables, buttons, links, ...)
* (-) design pages (screens)

### **MARKUP**
* (-) implement unified components
* (-) implement screen containers
* (-) implement component structure
* (-) accessibility (a11y)
* (-) flexible markup for PWA (mobile, tablet, desktop)
* (-) BEM

### **FRONTEND**
* (-) documentation how frontend works
* (-) documentation of development process (new functionality, fix bugs, testing, release, ...)
* (-) add tests
* (-) add functionality (containers, redux, api)
* (-) add caching (object look up, cache, locale storage, requests, ...)
* (-) add PWA functionality

### **BACKEND**
* (-) documentation how backend works
* (-) documentation of development process (division for several servers, databases, etc)(if there should be several servers, each should have a readme and be a separate project)
* (-) add tests
* (-) add functionality (apies, ...)
* (-) add caching (response, ...)

### **DEVOPS**
* (-) setup frontend build on git repository
* (-) setup backend build on git repository
* (-) setup general project build on git repository
* (-) setup project build on production environment
* (-) setup repository failure tests (linters(eslinbt, stylelint), run tests(frontend, backend), run build (frontend, backend))
* (-) setup run code change on pre push, pre commit, pre merge (linters(eslinbt, stylelint), run tests(frontend, backend), run build (frontend, backend))
* (-) setup permissions access

### **CONFIG CLIENT APP**
* (+) create react app (with yarn)
* (+) create react app
  * (+) yarn
  * (-) npm
* (+) create base stracture (core, components, assets, store, containers, layouts, shared)
* (+) test framework
  * (+) testing library
  * (-) enzyme
* (+) linters (split lints to blocks via overrides (store, components and etc))
	* (+) [eslint](https://habr.com/ru/company/dododev/blog/473648/)
	* (+) [stylelint](https://bzvyagintsev.ru/blog/stylelint/)
* (+) [Check pre github changes (lint(style, code), test, build)](https://www.npmjs.com/package/husky)
	* (+) pre push
	* (+) pre commit
	* (+) pre merge commit
	* (-) pre commit msg
* (+) styles
	* (-) reset
	* (+) normalize
* (-) prettier
* (+) i18n and l10n
	* (+) [react-intl](https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-react-app-with-react-intl) ([other link](https://formatjs.io/docs/guides/testing/#react-testing-library))
	* (-) [React-i18next](https://react.i18next.com/latest/migrating-v9-to-v10)
	* (-) [LinguiJS](https://lingui.js.org/)
* (+) store
	* (+) [redux](https://www.freecodecamp.org/news/how-to-use-redux-in-your-react-typescript-app/ ) ([other link](https://medium.com/@samueldinesh/setting-up-redux-devtools-a-simple-guide-3b386a6254fa))
	* (+) [redux-toolkit](https://redux-toolkit.js.org/api/createSlice)
	* (-) [ngrx](https://ngrx.io/guide/store)
	* (-) [ngxs](https://www.ngxs.io/)
* (+) async actions
	* (+) [thunk](https://www.freecodecamp.org/news/how-to-use-redux-in-your-react-typescript-app/)
	* (-) [redux-saga](https://redux-saga.js.org/)
	* (-) [redux-observable](https://redux-observable.js.org/)
* (+) HTTP client
	* (-) [fetch](https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch)
	* (-) [axios](https://www.npmjs.com/package/axios)
	* (+) [superagent](https://visionmedia.github.io/superagent/#authentication)
	* (-) [socket](https://learn.javascript.ru/websockets)
	* (-) [socket.io](https://socket.io/get-started/chat/)
* (-) server rendering
	* (-) next js
* (+) UI
	* (+) self implementation
	* (-) [primereact](https://primefaces.org/primereact/showcase/#/)
	* (-) [semantic](https://react.semantic-ui.com/)
	* (-) [ant](https://ant.design/components/overview/)
	* (-) [material](https://material-ui.com/)
	* (-) [bootstrap](https://react-bootstrap.github.io/)
	* (-) [blueprint](https://blueprintjs.com/docs/)
	* (-) [Argon](https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-landing-page&_ga=2.253049357.561374474.1612102448-509450229.1612102448)
	* (-) [react-toolbox](http://react-toolbox.io/#/components)
	* (-) [reactdesktop](http://reactdesktop.js.org/)
	* (-) [onsen](https://onsen.io/v2/guide/#getting-started)
	* (-) [evergreen segment](https://evergreen.segment.com/components)
* (-) CI
	* (-) jenkins
	* (-) travis
	* (-) circleci
* (-) Environments config
	* (-) dev
	* (-) dev-independent (from backend)
	* (-) test
	* (-) prod
* (+) Launcher (don't launch app until we have received all necessary data) - contains providers, launch settings, etc
	* (+) Suspense
	* (+) store
	* (-) theme
	* (+) router
	* (-) account/user
	* (+) i18n
	* (+) l10n
	* (-) toast
	* (-) logger
	* (-) configs/settings
* (+) Help frameworks and packages
	* (+) [lodash](https://lodash.com/)


### **OTHER**
* (-) [deploy (gh-pages)](https://slashgear.github.io/how-to-deploy-on-github-pages-with-travis-ci/)
* (-) [typescript npm package](https://codeburst.io/https-chidume-nnamdi-com-npm-module-in-typescript-12b3b22f0724)
      

import items from './generator.items.js'


export default function (plop) {
  plop.setWelcomeMessage([
    'React app infrastructure creator.',
    'Allows to initialize the application infrastructure parts.',
  ].join(' '))

  plop.setGenerator('Component', items.Component(`
  Component required criteria:
  - Be reusable, pure, unified
  - Receive all data only from props
  - Can use only other Components inside
  - Must not have any business logic inside
  - Doesn't have any postfix in component name
  - Tests can mock only dom and browser api
  - Tests can select only by role attribute, labels and in some cases by testid
  `, {
    description: 'Create a reusable, pure, unified component',
    defaultPath: 'components',
    tests: 'unit',
    withStories: true,
  }))

  plop.setGenerator('Screen', items.Component(`
  Screen required criteria:
  - Receive data from props or API
  - Can use only other Screens and Components inside
  - Can have any business logic inside
  - Can have Screen postfix in component name
  - Spread data between inner Screens and Components
  - Should be lazy loadable if it's heavy
  - Tests can mock only dom and browser api
  - Tests can select only by role attribute, labels and in some cases by testid
  `, {
    description: 'Create a screen component',
    defaultPath: 'screens',
    tests: 'e2e',
    withStories: true,
  }))


  plop.setGenerator('Page', items.Component(`
  Page required criteria:
  - Receive data from props or API
  - Can use only other Pages, Screens and Components inside
  - Can have any business logic inside
  - Should have Page postfix in component name
  - Spread data between inner Pages, Screens and Components
  - Should be lazy loadable if it's heavy
  - Tests can mock only dom and browser api
  - Tests can select only by role attribute, labels and in some cases by testid
  `, {
    description: 'Create a page component',
    defaultPath: 'pages',
    namePostfix: 'Page',
    tests: 'e2e',
  }))

  plop.setGenerator('Hook', items.Hook(`
  Hook required criteria:
  - Be reusable, pure, unified
  - Receive all data only from options
  - Must not have any business logic inside
  - Doesn't have any postfix in hook name
  `))

  plop.setGenerator('Tool', items.Tool(`
  Tool required criteria:
  - Be reusable, pure, unified
  - Receive all data only from arguments
  - Must not have any business logic inside
  - Doesn't have any prefix, postfix in tool name
  `))

  plop.setGenerator('Api', items.Api(`
  Api endpoint required criteria:
  - Must keep REST approach
  - Can filter and convert data after retrieving
  - Must not have any business logic inside
  - Doesn't have any prefix, postfix in tool name
  `))

  plop.setGenerator('Locale', items.Locale(`
  Locale language:
  - Names should be in UPPERCASE
  - Should be splitted by blocks [ACTIONS, LABELS, MESSAGES]
  `))
}

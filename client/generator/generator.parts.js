import items from './generator.items.js'


export default function (plop) {
  plop.setWelcomeMessage([
    'React app infrastructure creator.',
    'Allows to initialize the application infrastructure or create parts of it.',
  ].join(' '))

  // Create a reusable, pure, unified Component.
  // Component required criteria:
  // - Receive all data only from props
  // - Can use only other Components inside
  // - Must not have any business logic inside
  // - Doesn`t have any postfix in component name
  plop.setGenerator('Component', items.Component({
    withStories: true,
  }))

  // Create a Screen component.
  // Screen required criteria:
  // - Receive data from props or API
  // - Can use only other Screens and Components inside
  // - Can have any business logic inside
  // - Can have Screen postfix in component name
  // - Spread data between inner Screens and Components
  plop.setGenerator('Screen', items.Component({
    description: 'Create a screen component',
    defaultSubpath: 'screens',
    withStories: true,
  }))

  // Create a Page component.
  // Page required criteria:
  // - Receive data from props or API
  // - Can use only other Pages, Screens and Components inside
  // - Can have any business logic inside
  // - Should have Page postfix in component name
  // - Spread data between inner Pages, Screens and Components
  plop.setGenerator('Page', items.Component({
    description: 'Create a page component',
    postfixName: 'Page',
    defaultSubpath: 'pages',
  }))

  // Create a reusable, pure, unified Hook.
  // Hook required criteria:
  // - Receive all data only from options
  // - Must not have any business logic inside
  // - Doesn`t have any postfix in hook name
  plop.setGenerator('Hook', items.Hook())

  // Create a reusable, pure, unified tool.
  // tool required criteria:
  // - Receive all data only from arguments
  // - Must not have any business logic inside
  // - Doesn`t have any prefix, postfix in tool name
  plop.setGenerator('Tool', items.Tool())

  plop.setGenerator('Store Slice', items.StoreSlice())
  plop.setGenerator('Api Slice', items.ApiSlice())
  plop.setGenerator('Language', items.Language())
}

// TODO: tools, feature, web-workers, init gens, assets/icons/images
// TODO: add description
// TODO: add  init  structure  script
// TODO: add перевести  на  typescript
// TODO:  add  ERROR templates
// TODO:  add  subdir prefix
import Item from './generator.items.js'


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
  plop.setGenerator('Component', Item.Component())
  plop.setGenerator('Library Component Override', Item.Component({ defaultSubpath: 'components/lib' }))

  // Create a Screen component.
  // Screen required criteria:
  // - Receive data from props or API
  // - Can use only other Screens and Components inside
  // - Can have any business logic inside
  // - Should have Screen postfix in component name
  // - Spread data between inner Screens and Components
  plop.setGenerator('Screen', Item.Component({
    description: 'Create a screen component',
    postfixName: 'Screen',
    defaultSubpath: 'screens',
  }))

  // Create a Page component.
  // Page required criteria:
  // - Receive data from props or API
  // - Can use only other Pages, Screens and Components inside
  // - Can have any business logic inside
  // - Should have Page postfix in component name
  // - Spread data between inner Pages, Screens and Components
  plop.setGenerator('Page', Item.Component({
    description: 'Create a page component',
    postfixName: 'Page',
    defaultSubpath: 'pages',
  }))

  // Create a reusable, pure, unified Hook.
  // Hook required criteria:
  // - Receive all data only from options
  // - Must not have any business logic inside
  // - Doesn`t have any postfix in hook name
  plop.setGenerator('Hook', Item.Hook())

  // Create a launcher which includes typed context.
  // Launcher required criteria:
  // - Receive default options from props or default config
  // - Can receive data from API
  // - Can use only other Launchers inside
  // - Should have Launcher postfix in component name
  // - Spread data between inner components via contexts
  plop.setGenerator('Launcher', Item.Context({ postfixName: 'Launcher' }))
  plop.setGenerator('Context', Item.Context())

  plop.setGenerator('Store Slice', Item.StoreSlice())

  plop.setGenerator('Api Slice', Item.ApiSlice())
}

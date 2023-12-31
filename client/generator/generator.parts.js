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

  // Create a Screen component.
  // Screen required criteria:
  // - Receive data from props or API
  // - Can use only other Screens and Components inside
  // - Can have any business logic inside
  // - Can have Screen postfix in component name
  // - Spread data between inner Screens and Components
  plop.setGenerator('Screen', Item.Component({
    description: 'Create a screen component',
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

  plop.setGenerator('Store Slice', Item.StoreSlice())
  plop.setGenerator('Api Slice', Item.ApiSlice())
  plop.setGenerator('Language', Item.Language())
}

import items from './generator.items.js'

export default function (plop) {
  plop.setWelcomeMessage([
    'React app infrastructure creator.',
    'Allows to initialize the application infrastructure or create parts of it.',
  ].join(' '))

  // TODO: add initial app structure generator [api, app, store, locale, router, theme]
  // or create when sub element is generated
  plop.setGenerator('Locale', items.Locale())
  plop.setGenerator('Store', items.Store())
  plop.setGenerator('Api', items.Api())
}

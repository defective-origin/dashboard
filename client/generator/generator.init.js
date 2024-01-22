import items from './generator.items.js'

export default function (plop) {
  plop.setWelcomeMessage([
    'React app infrastructure creator.',
    'Allows to initialize the application infrastructure or create parts of it.',
  ].join(' '))

  plop.setGenerator('Launcher', items.Launcher())
  plop.setGenerator('Locale', items.Locale())
  plop.setGenerator('Store', items.Store())
  plop.setGenerator('Api', items.Api())
}

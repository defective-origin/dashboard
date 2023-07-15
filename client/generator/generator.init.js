import Item from './generator.items.js'

export default function (plop) {
  plop.setWelcomeMessage([
    'React app infrastructure creator.',
    'Allows to initialize the application infrastructure or create parts of it.',
  ].join(' '))

  plop.setGenerator('Launcher', Item.Launcher())
  plop.setGenerator('Locale', Item.Locale())
  plop.setGenerator('Store', Item.Store())
  plop.setGenerator('Api', Item.Api())
}

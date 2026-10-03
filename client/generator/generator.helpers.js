export default function (plop) {
  plop.setHelper('eq', (a, b) => a === b)

  plop.setHelper('pascalPath', text => {
    if (!text) return ''

    return text
      .split('/')
      .map(part => plop.getHelper('pascalCase')(part))
      .join('/')
  })
}

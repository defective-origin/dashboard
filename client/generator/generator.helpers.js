export default function (plop) {
  plop.setHelper('pascalPath', function (text) {
    if (!text) return ''

    return text
      .split('/')
      .map(part => plop.getHelper('pascalCase')(part))
      .join('/')
  })
}

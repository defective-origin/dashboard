export const InputPrompt = (options = {}) => ({
  message: `Enter ${options.name}`,
  type: 'input',
  ...options,
})

export const StringInputPrompt = (options = {}) => InputPrompt({
  ...options,
  filter: (input) => {
    const filteredInput = [
      options.prefix ? `${options.prefix} ` : '',
      input ?? '',
      options.postfix ? ` ${options.postfix}` : '',
    ].join('')

    return options.filter?.(filteredInput) ?? filteredInput
  },
})

export const NameInputPrompt = (options = {}) => StringInputPrompt({ name: 'name', ...options })
export const SubpathInputPrompt = (options = {}) => StringInputPrompt({ name: 'subpath', ...options })

export default {
  Input: InputPrompt,
  StringInput: StringInputPrompt,
  NameInput: NameInputPrompt,
  SubpathInput: SubpathInputPrompt,
}

export const Prompt = (options = {}) => ({
  message: [options.info, `Enter ${options.name}`].filter(Boolean).join('\n'),
  ...options,
})

export const ConfirmPrompt = (options = {}) => Prompt({
  ...options,
  type: 'confirm',
  default: false,
})

export const StringPrompt = (options = {}) => Prompt({
  ...options,
  type: 'input',
  filter: input => {
    const text = [options.prefix, input, options.postfix].filter(Boolean).join(' ')

    return options.filter?.(text) ?? text
  },
})

export const NamePrompt = (options = {}) => StringPrompt({ name: 'name', ...options })

export const PathPrompt = (options = {}) => StringPrompt({
  ...options,
  name: 'path',
  filter: input => input.trim().replace(/\s+/g, '/'),
})


export default {
  Prompt: Prompt,
  Confirm: ConfirmPrompt,
  String: StringPrompt,
  Name: NamePrompt,
  Path: PathPrompt,
}

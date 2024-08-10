import { useLayoutEffect, useState } from 'react'
import { FormManager, FormFieldState, FormPath, useForm } from './Form.context'


export const useWatch = <O extends object>(path: FormPath<O> | FormPath<O>[] = 'form', manager?: FormManager<O>): FormFieldState | undefined => {
  const form = useForm<O>() ?? manager
  const [field, setField] = useState<FormFieldState>()

  useLayoutEffect(() => {
    const deps = Array.isArray(path) ? path : [path]
    const update = () => {
      if (Array.isArray(path)) {
        setField({ errors: form?.errors, init: form?.initial, value: form?.state })
      } else {
        setField(form?.get(path))
      }
    }

    update()

    deps.forEach((dep) => form?.on(dep, update))

    return () => deps.forEach((dep) => form?.off(dep, update))
  }, [form, path])

  return field
}


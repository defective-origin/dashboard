export type GeneralProps<T extends HTMLElement = HTMLElement> = React.DOMAttributes<T> & React.HTMLAttributes<T>

export type GeneralUIProps<
  UIConf extends Record<string, unknown> = Record<string, unknown>,
  TElement extends HTMLElement = HTMLElement,
> = GeneralProps<TElement> & {
  ui?: UIConf
}

export type ReturnUIProps<
  UIConf extends Record<string, unknown>,
  UIProps extends GeneralUIProps<Record<string, unknown>>,
  TResult = Pick<UIProps, keyof Omit<UIProps, keyof UIConf>> & { ui: UIConf & UIProps['ui'] },
> = TResult

export type HocComponent = (...args: any[]) => any
export type MagicComponent = React.ComponentType<any> | HocComponent

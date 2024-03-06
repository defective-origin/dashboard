export type NestedStateNodeError = string[]
export type NestedStateNodeGroupError = { [key: string | number]: NestedStateNodeGroupError | NestedStateNodeError }
export type NestedStateNodeErrors<V> = V extends object | [] ? NestedStateNodeGroupError : NestedStateNodeError

export type NestedStateNodeEvent<V> = (value: V | undefined) => void
export type NestedStateNodeEvents<V> = Record<string, NestedStateNodeEvent<V>[]>

export type NestedStateNodeSelector<V, R> = (value: V | undefined, node: NestedStateNode<V>) => R

export class NestedStateNodeOptions<V> {
  /** State name. */
  name?: string = undefined

  /** Current state value. */
  value?: V = undefined

  /** Validation errors. */
  errors?: NestedStateNodeErrors<V> = undefined

  /** Refresh all store values on change */
  dependency?: boolean = false

  /** Build value from nested values. */
  formatter?: NestedStateNodeSelector<V, V>

  /** Validate value and return errors.  */
  validator?: NestedStateNodeSelector<V, NestedStateNodeErrors<V>>

  /** Change event is called when current state is changed. */
  onChange?: NestedStateNodeEvent<V>
}

/** One way node of tree. */
export class NestedStateNode<V> extends NestedStateNodeOptions<V> {
  /** Initial state value. */
  init?: V = undefined

  /** Sub nodes. */
  nested: Record<string, NestedStateNode<V>> = {}

  /** Path to state. */
  path: string[]

  constructor(parent?: NestedStateNode<V>, name = 'Node', options: Partial<NestedStateNodeOptions<V>> = {}) {
    super()

    Object.assign(this, options)

    this.name = name
    this.init = options.value
    this.path = [...parent?.path ?? [], name]
    this.dependency = parent?.dependency || this.dependency

    parent?.add(name, this)
  }

  reset = (value = this.init) => {
    this.init = value
    this.errors = undefined
    this.value = structuredClone(value)
    this.format()
  }

  set = (value?: V) => this.value = value

  map = (selector: (node: NestedStateNode<V>) => any): any => {
    // update node values if current node is array container
    const nodes = Object.values(this.nested)
    if (Array.isArray(this.value)) {
      return nodes
        .filter((node) => ![void 0, null].includes(selector(node)))
        .map(selector)

      // update node values if current node is object container
    } else if (typeof this.value === 'object') {
      return Object.fromEntries(nodes.map((node) => [node.name, selector(node)]))
    }

    return selector(this)
  }

  validate = () => { this.errors = this?.validator?.(this.value, this) ?? this.map((node) => node.errors) }
  format = () => { this.set(this?.formatter?.(this.value, this) ?? this.map((node) => node.value)) }

  /** Return nested node. */
  get = (name: string) => this.nested[name]

  /** Return true if sub node exist. */
  has = (name: string) => !!this.get(name)

  /** Add nested node if node does not exist. */
  add = (name: string, node: NestedStateNode<V>) => {
    if (!this.has(name)) {
      this.nested[name] = node

      this.format()
    }
  }

  /** Remove nested node if node exists. */
  remove = (name: string) => {
    if (this.has(name)) {
      delete this.nested[name]

      this.format()
    }
  }
}


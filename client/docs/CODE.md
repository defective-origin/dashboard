# [↤](../README.md) Rules

## Required
### Packages and scripts
- Packages should be updated `once per month`
- Package `versions` should be fixed and not include `^` or `~`
- Scripts with yarn must have `run` in command, example: `yarn run a && yarn run b`


### Best practice
- Support `documentations` in actual state
- Support `accessibility (a11y)`, `localization` and `SEO optimizations`
- Start implementing new functionality via `PoC` and `MVP`
- Use best practice like `SOLID` `DRY` `KISS` `YAGNI` `BDUF` `APO` `SoC` `Ockham's razor` `Boy Scout Rule` `Principle of Least Astonishment`
- `Module` should keep one type of functionality and export it, `Package` should keep and export several ones
- Stick to [design](./DESIGN.md) variables, components and rules


### Clearing
- `Circle deps`, `unused files`, `bundle size` should be checked `once per month`
- `Commented` and `unused` code should be `deleted permanent`


### Testing
- Tests should be `small` and `simple`
- Component tests should use selection only by `role` and `text`. Only the same list items can be taken by `testid`, example actions in table rows
- Forbidden to mock `app functionalities`. Only `browser functionality` can be mocked like ResizeObserver, fetch and so on
- Types of tests
  - `Unit` tests should be applied for `hooks` `tools` `components` 
  - `integration` `e2e` tests should be applied for `pages` `screens`


## Names
Names should be `short` and mirror `saved value` not a saved type. Should __not__ be bound to `realization` and `business`
```typescript
const REQUEST_DELAY = 5
```

Global constants should have `uppercase` notation
```typescript
const VARIABLE_NAME = 50
```

Function for data creators should start with `init`
```typescript
'build...' | 'create...' => 'init...'
```

Function for data `mappers`, `converters`, `formatters` should start with `to`:
```typescript
'format...' | 'parse...' | 'convert...' | 'map...' => 'to...'
```

If the array passed to the props has a generic type, then `items`. Otherwise, by the `TypeName`.
```typescript
// generic and unified names
item: T
items: T[]

// by type name: Column, ColumnItem ...
column: Column
columns: Column[]
```

## Comments
Describe functionality with short examples and don't describe simple things which can be understand by names.
```typescript
type SomeType {
  name: string
  /** Do something or what it for */
  complexLogicField?: boolean;
}

/** Do something
 * @example
 * space('xl xl 0 xl')
 * space('xl/xl/0/xl', '/')
 */
export const toSpace = (value: string, sep = ' ') => null
```


Mark legacy functionality as `@deprecated` to highlight it and not use it
```typescript
@deprecated use {name} instead
function func() {}

@deprecated use {name} instead
type Example = string
```

TODO and FIXME comments in code
- New Tech debt ticket can be created instead of leaving todo in code 
- Todos should be fixed asap in order to prevent high increasing technical debts
```typescript
// TODO: [firstname_secondname] necessary actions
```

## Types
Never use `Enums`. Enum created for pseudo typesation and string minification. Now we have Typescript and good minification.
- Use type instead
- Strings should have `uppercase` notation
```typescript
type TextVariant = 'PRIMARY' | 'SECONDARY'
```

### Props
- Name pattern `{ComponentName}Props`
- Static content is rendered via props `label` `title` `content` `children`
- Dynamic content from back-end via `value` prop
- If prop for sub component is passed via props then do type: `React.ReactNode | SomeComponentProps`. It allows to prevent stupid names in props and huge quantity of props.

```typescript
type ExampleProps = {
  help?: React.ReactNode | HelpProps
}

const Example = (props: ExampleProps) => {
  const { help } = props
  const helpProps = typeof help === 'object' ? { content: help } : help

  return <Help {...helpProps} >
}
```

Use `React.ReactNode` type if prop is used as content

```typescript
type ExampleProps = {
  title?: React.ReactNode
  content?: React.ReactNode
}

const Example = (props: ExampleProps) => {
  const { title, content, ...otherProps } = props

  return (
    <div {...otherProps}>
      {title}
      {content}
    </div>
  )
}
```

## Components
- Use `format` prop of `Text` component for data formatting
- Use base structure components for layout: `Layout` `Block` `Scroll` `Overlay` `Repeat` `Item` `Portal`
- Build composition components with attached components like: `Page` `Page.Header` `Page.Content` `Page.Footer` `Page.Section`
- Create pair components for list of items: `Alert` -> `Alert.List`, `Text` -> `Text.List`

### Composition, mappers, substitution
Use `composition` to unify logic and reduce code duplication
```typescript
const SaveButton = (props: ButtonProps) => {
  const form = useForm()

  return <Button content="Save" onClick={form.onSave} {...props} />
}
```

Use `mappers` in api or complex components only like tables, forms, inputs
```typescript
const items = useProjects()
const columns = [
  UserColumn({
    mapper: (record) => ({
      name: record.manager.name,
      age: record.manager.age,
      role: record.manager.role,
    })
  }),
  NumberColumn({
    mapper: (record) => record.price
  }),
]

useMapTableItems(items, columns)
```

Use `substitution` when render component can be custom
```typescript
export const textColumn = <T extends TableRecord>(column: TextColumn<T>): TextColumn<T> => ({
  sort: true,
  // custom component
  cell: Text,
  mapper: (_, __, field) => ({ content: field }),
  ...column,
  props: {
    v: 'caption',
    size: 'xxs',
    format: column.format,
    placeholder: column.placeholder,
    color: column.color,
    ellipsis: column.ellipsis,
    bold: column.bold,
    nowrap: column.nowrap,
    ...column.props,
  },
})
```

## Styles
Class names should have BEM notation
```scss
.card--hover {}
.card_header {}
.card_action--click {}
```

When you override ui framework variables
```scss
:root {
  // --component-color: var(--framework-color);
}
```

When you write unified component without ui framework
```scss
:global {
  .dark {
    // --component-color: color;
  }

  .light {
    // --component-color: color;
  }
}
```

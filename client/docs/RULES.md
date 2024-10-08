# [↤](../README.md) Rules


### Legacy
- Mark legacy functionality as __@deprecated__ to highlight it and not use it
- Legacy code should be saved in __legacy__ folder
- Legacy must be cleaned before use. After that, moved it to the general structure.


### All function for data creators should start with 'init'
```
'build...' | 'create...' => 'init...'
```

### All function for data mappers | converters | formatters should start with 'to':
```
'format...' | 'parse...' | 'convert...' | 'map...' => 'to...'
```

### Prop names
__Static content__ is rendered via props `label`, `title`, `content`, `children`.

__Dynamic content__ from back-end via props `value`. In extreme cases through static props.

### Types
__Never use Enums__. Enum created for pseudo typesation and string minification. Now we have Typescript and good minification.

Use type instead: 
```typescript
type TextVariant = 'primary' | 'secondary'
```

### API union types
All api union types should have `uppercase` notation
```typescript
type ACCESS = 'PRIVATE' | 'PUBLIC'
```

### Variables
- Names: describes __structure__ and __not__ be bound to __realization__ and __business__
- Size Unit: __rem__
- Size [text, scroll, button, link, icon]: __xxs | xs | sm | md | lg | xl | xxl__
- Space [gap, padding, margin]: __xxs | xs | sm | md | lg | xl | xxl__
- Color: __primary | secondary | success | info | warning | error | disable__
- Media: __mobile | tablet | desktop | tv | vertical | horizontal__
- Layout[Grid]: __board | row | rows | column | columns | header | footer | left-aside | right-aside | grid__
- Block[Flex]: __x | y | xy | cards__
- Direction: __x | y | xy__

### Architecture
#### Microfrontends | Micro | Microservice
- Built as separate package
- Can be loaded lazily

#### Responsibility
- Launcher
  - Responsible for launching all services
  - Responsible for Authentication and Authorization
  - Provide all necessary data
- Apps[Micro] - Can be separated to small apps by functionality and services
- pages[Micro] - Can be lazy loadable by usage priority
- screens/widgets[Micro] - Request Api data and spread it into components
- components - Small unified ui view item

### Components
- Use base structure components for layout: __Layout, Block, Scroll, Overlay, Repeat, Item, Portal__
- Create app layout components:
  - Base: __Header__[Text, Actions, Block], __Footer__[Text, Actions, Block], __Aside__[Layout], __Content__[Block + scroll], __Modal__[Overlay + Portal]
  - Layout: __Page__, __Section__, __Board__, __Card__, __Slider__
- Create Format components for data formatting with useFormat: __Text__, __Number__, __Date__ or add __format__ prop to __Text__ component
- Create pair components for list of items: __Alert__ -> __Alerts__, __Text__ -> __Messages__

### Styles
#### When you override ui framework variables
```scss
:root {
  // --ui-framework-color: var(--account-framework-color);
}
```

#### When you write unified component without ui framework
```scss
:global {
  .dark {
    // --ui-framework-color: color;
  }

  .light {
    // --ui-framework-color: color;
  }
}
```

#### Composition, mappers, substitution
In tables and forms, in special cases of inputs, create composition and mappers. Example:

```typescript
// Composition
const SaveButton = (props: ButtonProps) => {
  const form = useForm()

  return <Button content="Save" onClick={form.onSave} {...props} />
}

// Mappers
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

// substitution
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

#### Props
If prop for sub component is passed via props then do type: `common type` | `component props`.
It allows to prevent stupid names in props and huge quantity of props.

```typescript
type ExampleProps = {
  help?: React.ReactNode | HelpProps
}

const Example = (props: ExampleProps) => {
  const { help } = props
  const helpProps = typeof help === 'string' ? { content: help } : help

  return <Help {...helpProps} >
}
```

Use `React.ReactNode` if prop is used as content

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

If the array passed to the props has a generic type, then `items`. Otherwise, by the `component name`.

```typescript
// generic
item: T
items: T[]

// by component name: Column, ColumnItem ...
column: Column
columns: Column[]
```

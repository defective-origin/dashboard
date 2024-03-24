# [↤](../README.md) Rules


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

### Variables
- Names: describes __structure__ and __not__ be bound to __realization__ and __business__
- Size Unit: __rem__
- Size [text, scroll, button, link, icon]: __xxs | xs | sm | md | lg | xl | xxl__
- Space [gap, padding, margin]: __xxs | xs | sm | md | lg | xl | xxl__
- Color: __primary | secondary | success | info | warning | error | disable__
- Media: __mobile | mobile | mobile | tablet | tablet | tablet | desktop | tv | vertical | horizontal__
- Layout: __cards | row | rows | column | columns | header | footer | left-aside | right-aside | grid__
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

#### Composition and mapper
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
```

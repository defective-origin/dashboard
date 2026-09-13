# [↤](../README.md) Design

### Links
- [Requirements and components](https://defective-origin.github.io/dashboard/storybook/)
- [UI Framework](https://mui.com/material-ui/all-components/)
- [Icons](https://fonts.google.com/icons?icon.query=dark+mode)
- [Figma](https://www.figma.com/file/v8rxaTIDF3Y2XYPWhFb3zl/Dashboards?type=design&node-id=56-741&mode=design&t=l2I6c18GOkFlZEjf-0)

### Rules
- Names describes `structure` `stored value` and __not__ be bound to `realization` and `business`
- Create and use unified `components`, `screens`, `pages` [each component should have own page]
- Create and use unified variables `sizes`, `colors` and so on
- Implement design for `mobile`, `tablet`, `desktop` devices
- Small parts of design like widgets should support `@container` css rule
- Design should have `preview` mode with working actions


#### Colors
- Template: `--color-{color-name}` `--color-{color-name}-{number}`
- Color: `primary` `secondary` `success` `info` `warning` `error` `constant-primary` `constant-secondary`
- Theme: `light` `dark`

#### Sizes
- Unit: `rem`
- Template: `--{item}-{size}`
- Size [components, spaces]: `xxs` `xs` `sm` `md` `lg` `xl` `xxl`

#### Layout
- Template: `--{item}-{variant}`
- Media: `mobile` `tablet` `desktop` `tv` `vertical` `horizontal`
- Direction: `x` `y` `xy`
- Block[Flex]: `x` `y` `xy` `cards`
- Layout[Grid]: `board` `row` `rows` `column` `columns` `header` `footer` `left-aside` `right-aside` `grid`

### Layout
- Use `Block` model layout
- Use `gaps` instead of `margin` in order to add spaces between items
- Use `Hybrid layout` = adaptive + responsive
- If we change figma window size then layout should change

![layout](https://miro.medium.com/v2/resize:fit:640/format:webp/1*iQidatmT7jSDrLtPWIj56Q.png)

### Figma
- Row: [component | screen | page]
- Column: view variants
```
Help             Support
HelpA            SupportA
HelpB            SupportB
HelpC            SupportC

HelpTablet       SupportTablet
HelpA            SupportA
HelpB            SupportB
HelpC            SupportC

HelpMobile       SupportMobile
HelpA            SupportA
HelpB            SupportB
HelpC            SupportC
```

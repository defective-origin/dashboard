# Layout User Interface

Package includes only base layout components, hooks and features.

__The reason and description__
__gh-page__


## Package contents
### Components
#### Layout
__Block__ - Flex orientation component  
__Layout__ - Grid orientation component  
__Scroll__ - overlay scroll  
__Overlay__ - Allows to create overlay elements  

#### Extra
__Repeat__ - Allows to create same component by item list  
__Portal__ - Wrapped react Portal with Container

### Hooks

- device  
	- useMode  
	- useBreakpoint  
	- useMoreBreakpoint  
	- usePaginationBreakpoint  

- dom  
	- useElement  
	- useEvent  
	- useResize  
	- useResizeObserver  

- state  
	- useFunc  

### Tools

### Styles

## Possible compositions
__Markup compositions__  
App | Page | Section | Card = Layout + Text + Actions
Header | Footer = Block + Text + Actions

Examples

__Overlay compositions__ - it's better to create only Modal and use as Drawer and Dialog  
Slider = Overlay + Layout + Action  
FullScreen | Modal | Drawer | Dialog | Toast | Guard | Alert = Overlay + Card + Portal  

Examples

__List compositions__  
Messages = Block + Repeat + Text  
Alerts = Block + Repeat + Alert  
Actions = Block + Repeat + Action  
Menu = Block + Repeat + MenuItem

Examples

__Complex compositions__  
Form = Layout/Block + Text + Field  
Field = Layout/Block + Text + Messages + input  
Table = Layout/Block + Text + Pagination + Overlay + Scroll + table  

Examples

// ---| core |---
import { MockLauncher } from 'App/App.launcher'

// ---| self |---
import ComponentTestUtil from './component.tools'
import { buildCustomRender } from './render.tools'

const { render } = ComponentTestUtil
const renderWithLauncher = buildCustomRender(render, MockLauncher)


export { render, renderWithLauncher } // renderHook

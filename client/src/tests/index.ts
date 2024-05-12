// ---| core |---
import Launcher from 'App/App.launcher'

// ---| self |---
import ComponentTestUtil from './render/component.tool'
import { buildCustomRender } from './render/render.tool'

const { render } = ComponentTestUtil
const renderWithRootModule = buildCustomRender(render, Launcher)

export { render, renderWithRootModule } // renderHook

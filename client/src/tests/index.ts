// ---| core |---
import Launcher from 'Launcher'

// ---| self |---
import ComponentTestUtil from './render/component.tool'
import { buildCustomRender } from './render/render.tool'

const { render } = ComponentTestUtil
const renderWithRootModule = buildCustomRender(render, Launcher)

export { render, renderWithRootModule } // renderHook

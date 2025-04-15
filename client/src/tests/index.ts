// ---| core |---
import Launcher from 'App/App.launcher'

// ---| self |---
import ComponentTestUtil from './render/component.tools'
import { buildCustomRender } from './render/render.tools'

const { render } = ComponentTestUtil
const renderWithRootModule = buildCustomRender(render, Launcher)

export { render, renderWithRootModule } // renderHook

// ---| root |---
import { AppLauncher } from 'launchers/AppLauncher'

// ---| self |---
import ComponentTestUtil from './render/component.tool'
import { buildCustomRender } from './render/render.tool'

const { render } = ComponentTestUtil
const renderWithRootModule = buildCustomRender(render, AppLauncher)

export { render, renderWithRootModule } // renderHook

// ---| root |---
import { TestLauncher } from 'core/Launcher/Launcher.component'

// ---| self |---
import ComponentTestUtil from './render/component.tool'
import { buildCustomRender } from './render/render.tool'

const { render } = ComponentTestUtil
const renderWithRootModule = buildCustomRender(render, TestLauncher)

export { render, renderWithRootModule } // renderHook

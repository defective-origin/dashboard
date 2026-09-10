import * as tl from '@testing-library/react'
import * as vitest from 'vitest'
import * as overrides from './vitest.overrides.tsx'

// 'var' attaches it properly to the global namespace block
declare global {
  // types
  type MockInstance = vitest.MockInstance

  // functionality
  var render: typeof overrides.render
  var renderHook: typeof overrides.renderHook
  var act: typeof tl.act
  var waitFor: typeof tl.waitFor
}

export {} // Forces this file to be treated as a module

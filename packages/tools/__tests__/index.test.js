import { windowRefKey } from '../src/settings'

Object.defineProperties(global, {
  window: {
    enumerable: true,
    writable: true,
    value: {},
  },
})

describe('Ingresse Tools root', () => {
  describe('"window" support', () => {
    require('../src')

    test('validate "package.custom.windowKeyRef" definition', () => {
      expect(windowRefKey).toBeDefined()
    })

    test('validate "window" attribution', () => {
      expect(window).toBeDefined()
      expect(window[windowRefKey]).toBeDefined()
    })
  })

  describe('basics', () => {
    const tools = require('../src').default

    test('validate attribution', () => {
      expect(tools).toBeDefined()
    })

    test('validate presence of "paymentMethods"', () => {
      expect(tools.paymentMethods).toBeDefined()
    })

    test('validate presence of "transaction"', () => {
      expect(tools.transaction).toBeDefined()
    })
  })
})

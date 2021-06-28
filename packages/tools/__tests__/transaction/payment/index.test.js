import payment from '../../../src/transaction/payment/index.js'

describe('Transaction PAYMENT', () => {
  describe('Adapter', () => {
    test('should contain a function named as "adapter"', () => {
      expect(typeof payment.adapter).toBe('function')
    })

    test('should return an object', () => {
      const result = payment.adapter()

      expect(typeof result).toBe('object')
    })
  })

  describe('Methods', () => {
    test('should contain an object named as "methods"', () => {
      expect(typeof payment.methods).toBe('object')
    })
  })
})

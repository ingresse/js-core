import refund from '../../../src/transaction/refund'

describe('Transaction REFUND', () => {
  describe('"status"', () => {
    test('its defined as array', () => {
      expect(Array.isArray(refund.status)).toBeTruthy()
      expect
    })

    test('includes "approved"', () => {
      expect(refund.status.includes('approved')).toBeTruthy()
    })
  })

  describe('"paymentTypes"', () => {
    test('its defined as array', () => {
      expect(Array.isArray(refund.paymentTypes)).toBeTruthy()
      expect
    })

    test('includes "creditcard"', () => {
      expect(refund.paymentTypes.includes('creditcard')).toBeTruthy()
    })
  })

  describe('function "adapter"', () => {
    describe('returns a not refundable transaction', () => {
      const expectedIsRefundable = false
      const expectedIsRefundableText = ''
      let fakeTransaction = {
        payment: {
          gateway: refund.gateways[0],
          type: refund.paymentTypes[0],
        },
        status: {
          current: {
            name: refund.status[0],
          },
        },
      }

      test('by an invalid parameter passed', () => {
        expect(refund.adapter()).toBe(undefined)
        expect(refund.adapter('')).toBe('')
      })

      test('by an empty status in transaction', () => {
        const adaptedTransaction = refund.adapter({
          ...fakeTransaction,
          status: null,
        })

        expect(adaptedTransaction.isRefundable).toBe(expectedIsRefundable)
        expect(adaptedTransaction.isRefundableText).toBe(expectedIsRefundableText)
      })

      test('by an empty payment in transaction', () => {
        const adaptedTransaction = refund.adapter({
          ...fakeTransaction,
          payment: null
        })

        expect(adaptedTransaction.isRefundable).toBe(expectedIsRefundable)
        expect(adaptedTransaction.isRefundableText).toBe(expectedIsRefundableText)
      })

      test('by a not allowed payment type', () => {
        const adaptedTransaction = refund.adapter({
          ...fakeTransaction,
          payment: {
            ...fakeTransaction.payment,
            type: 'not-a-valid-one',
          },
        })

        expect(adaptedTransaction.isRefundable).toBe(expectedIsRefundable)
        expect(adaptedTransaction.isRefundableText).toBe(expectedIsRefundableText)
      })

      test('by a not allowed gateway', () => {
        const adaptedTransaction = refund.adapter({
          ...fakeTransaction,
          payment: {
            ...fakeTransaction.payment,
            gateway: 'not-a-valid-one',
          },
        })

        expect(adaptedTransaction.isRefundable).toBe(expectedIsRefundable)
        expect(adaptedTransaction.isRefundableText).toBe(expectedIsRefundableText)
      })
    })

    describe('returns a refundable transaction', () => {
      const expectedIsRefundable = true
      const fakeTransaction = {
        payment: {
          gateway: refund.gateways[0],
          type: refund.paymentTypes[0],
        },
        status: {
          current: {
            name: refund.status[0],
          },
        },
      }

      test('by "free" payment', () => {
        const anotherFakeTransaction = { payment: { free: true }, status: { current: { name: refund.status[0] } } }
        const { isRefundable, isRefundableText } = refund.adapter(anotherFakeTransaction)

        expect(isRefundable).toBe(expectedIsRefundable)
        expect(isRefundableText).toBe('Devolver Ingressos')
      })

      test('of a paid/approved transaction with allowed payment method and allowed gateway', () => {
        const { isRefundable, isRefundableText } = refund.adapter(fakeTransaction)

        expect(isRefundable).toBe(expectedIsRefundable)
        expect(isRefundableText).toBe('Pedir Reembolso')
      })

      test('of an in "manual review" transaction with allowed payment method and allowed gateway', () => {
        const { isRefundable, isRefundableText } = refund.adapter({
          ...fakeTransaction,
          status: {
            current: {
              name: 'manual review',
            },
          },
        })

        expect(isRefundable).toBe(expectedIsRefundable)
        expect(isRefundableText).toBe('Desistir da Compra')
      })
    })
  })
})

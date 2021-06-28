import cart from '../../../src/transaction/cart/index.js'

describe('Transaction CART', () => {
  test('should return quantity count property', () => {
    const result = cart.adapter()
    const expected = { totalQuantity: 0 }

    expect(result.totalQuantity).toEqual(expected.totalQuantity)
  })

  test('should return a valid quantity count', () => {
    const fakeTransaction = {
      assure: 'its-a-test',
      extras: [{ quantity: 2 }, { quantity: ''}, { quantity: 1, externalId: 'ing-coupon' }],
      tickets: [{ quantity: 2 }, { quantity: 'asd' }],
    }
    const result = cart.adapter(fakeTransaction)
    const expected = { totalQuantity: 4 }

    expect(result.totalQuantity).toEqual(expected.totalQuantity)
  })

  test('should return "cart" property', () => {
    const result = cart.adapter()

    expect(result.cart).toBeDefined()
    expect(Array.isArray(result.cart)).toBeTruthy()
  })

  test('should return "cart" property with "extras" and "tickets" arrays combined', () => {
    const fakeTransaction = { extras: [{}], tickets: [{}, {}] }
    const result = cart.adapter(fakeTransaction)

    expect(result.cart.length).toBe([ ...fakeTransaction.extras, ...fakeTransaction.tickets ].length)
  })
})

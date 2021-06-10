import adapter from '../../src/transaction/adapter.js'
import cart from '../../src/transaction/cart'
import payment from '../../src/transaction/payment'
import refund from '../../src/transaction/refund'
import status from '../../src/transaction/status'

describe('Transaction Adapter', () => {
  const transactionData = {}

  beforeEach(() => {
    jest.spyOn(cart, 'adapter')
    jest.spyOn(payment, 'adapter')
    jest.spyOn(refund, 'adapter')
    jest.spyOn(status, 'adapter')
  })

  test('should not call any module adapter, by missing param', () => {
    adapter()

    expect(status.adapter).not.toHaveBeenCalled()
  })

  test('should call basic modules adapters', () => {
    adapter(transactionData)

    expect(status.adapter).toHaveBeenCalled()
    expect(cart.adapter).toHaveBeenCalled()
    expect(payment.adapter).toHaveBeenCalled()
    expect(refund.adapter).toHaveBeenCalled()
  })
})

import base from '../../../../src/transaction/payment/methods/_base.js'

describe('Transaction Payment Methods BASE', () => {
  test('validate regular result without parameters', () => {
    const fakeMethod = base()

    expect(typeof fakeMethod).toBe('object')
    expect(typeof fakeMethod.ofTransaction).toBe('function')
    expect(typeof fakeMethod.sequence).toBe('undefined')
  })

  test('should return an object in case of missing param', () => {
    const result = base('credit')
    const transactionAdapted = result.ofTransaction()

    expect(typeof transactionAdapted).toBe('object')
    expect(typeof result).toBe('object')
    expect(typeof result.ofTransaction).toBe('function')
    expect(typeof result.sequence).toBe('number')
  })

  test('should apply "ofTransaction" as not enumerable function to any object received as param', () => {
    const aPaymentMethodObject = {}

    base('someMethodName', aPaymentMethodObject)

    expect(typeof aPaymentMethodObject).toBe('object')
    expect(typeof aPaymentMethodObject.ofTransaction).toBe('function')
    expect(typeof aPaymentMethodObject.sequence).toBe('undefined')
  })
})
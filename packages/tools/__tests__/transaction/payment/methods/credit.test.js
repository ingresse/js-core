import { credit } from '../../../../src/transaction/payment/methods'

describe('Transaction Payment Method: Credit Card', () => {
  describe('function "getBrandByKey"', () => {
    test('existent brand', () => {
      const brandToFind = 'mastercard'
      const brandObject = credit.getBrandByKey(brandToFind)

      expect(brandObject).toBeDefined()
      expect(brandObject.keys.includes(brandToFind)).toBe(true)
    })

    test('non existent brand', () => {
      const brandToFind = 'chatuba'
      const brandObject = credit.getBrandByKey(brandToFind)

      expect(brandObject).not.toBeDefined()
    })
  })

  describe('function "ofTransaction"', () => {
    const fakeCreatedAt = new Date()

    test('existent brand, from "ticketbooth"/"offline" transaction', () => {
      const fakeTransaction = {
        createdAt: fakeCreatedAt,
        payment: {
          type: 'creditcard_visa'
        }
      }

      const {
        createdAt,
        paymentCard,
        paymentCardBrand,
      } = credit.ofTransaction(fakeTransaction)

      expect(createdAt).toBe(fakeCreatedAt)
      expect(paymentCard).not.toBeDefined()
      expect(paymentCardBrand.name).toBe(credit.brands.visa.name)
    })

    test('existent brand', () => {
      const fakeTransaction = {
        createdAt: fakeCreatedAt,
        payment: {
          creditCard: {
            brand: 'visa',
            crazyPossibleProperty: 'testing'
          }
        }
      }

      const {
        createdAt,
        paymentCard,
        paymentCardBrand,
      } = credit.ofTransaction(fakeTransaction)

      expect(createdAt).toBe(fakeCreatedAt)
      expect(paymentCardBrand.name).toBe(credit.brands.visa.name)
      expect(paymentCard.crazyPossibleProperty).toBe(fakeTransaction.payment.creditCard.crazyPossibleProperty)
    })

    test('non existent brand', () => {
      const fakeTransaction = {
        createdAt: fakeCreatedAt,
        payment: {
          creditCard: {
            brand: 'not-mapped-brand',
            crazyPossibleProperty: 'ahoy'
          }
        }
      }

      const {
        createdAt,
        paymentCard,
        paymentCardBrand,
      } = credit.ofTransaction(fakeTransaction)

      expect(createdAt).toBe(fakeCreatedAt)
      expect(paymentCardBrand).toBe(null)
      expect(paymentCard.crazyPossibleProperty).toBe(fakeTransaction.payment.creditCard.crazyPossibleProperty)
    })

    test('not credit card transaction', () => {
      const fakeTransaction = {
        createdAt: fakeCreatedAt,
        payment: {
          creditCard: null,
          boleto: {
            url: 'https://banco.com/boleto-123'
          }
        }
      }

      const {
        createdAt,
        paymentCard,
        paymentCardBrand,
      } = credit.ofTransaction(fakeTransaction)

      expect(createdAt).toBe(fakeCreatedAt)
      expect(paymentCard).not.toBeDefined()
      expect(paymentCardBrand).not.toBeDefined()
    })

    test('no transaction at all', () => {
      const emptyObject = credit.ofTransaction()

      expect(emptyObject.toString()).toBe({}.toString())
    })
  })
})

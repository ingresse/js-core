import { credit } from '../../../../src/transaction/payment/methods'

describe('Transaction Payment Method: Credit Card', () => {
  describe('function "getBrands"', () => {
    test('mapped brands', () => {
      const result = credit.getBrands()

      expect(result.length).toBeGreaterThan(2)
    })

    test('custom brands', () => {
      const result = credit.getBrands({
        brandOne: { name: 'One' },
        brandTwo: { name: 'Two' },
      })

      expect(result.length).toBe(2)
    })
  })

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
            cardLast: '1234',
            crazyPossibleProperty: 'testing',
            installments: 2,
            masked: '4123 **** **12 1234',
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
            cardLast: '9999',
            crazyPossibleProperty: 'ahoy',
            installments: 1,
            masked: '6666 **** **88 9999',
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

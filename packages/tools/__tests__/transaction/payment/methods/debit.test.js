import { debit } from '../../../../src/transaction/payment/methods'

describe('Transaction Payment Method: Debit Card', () => {
  describe('function "getBrands"', () => {
    test('mapped brands', () => {
      const result = debit.getBrands()

      expect(result.length).toBeGreaterThan(2)
    })

    test('custom brands', () => {
      const result = debit.getBrands({
        brandOne: { name: 'One' },
        brandTwo: { name: 'Two' },
      })

      expect(result.length).toBe(2)
    })
  })

  describe('function "getBrandByKey"', () => {
    test('existent brand', () => {
      const brandToFind = 'master'
      const brandObject = debit.getBrandByKey(brandToFind)

      expect(brandObject).toBeDefined()
      expect(brandObject.keys.includes(brandToFind)).toBe(true)
    })

    test('non existent brand', () => {
      const brandToFind = 'chatuba'
      const brandObject = debit.getBrandByKey(brandToFind)

      expect(brandObject).not.toBeDefined()
    })

    test('no param', () => {
      const brandNotFound = debit.getBrandByKey()

      expect(brandNotFound).toBe(undefined)
    })
  })

  describe('function "ofTransaction"', () => {
    const fakeCreatedAt = new Date()

    test('existent brand, from "ticketbooth"/"offline" transaction', () => {
      const fakeTransaction = {
        createdAt: fakeCreatedAt,
        payment: {
          type: 'debitcard_visa'
        }
      }

      const {
        createdAt,
        paymentCard,
        paymentCardBrand,
      } = debit.ofTransaction(fakeTransaction)

      expect(createdAt).toBe(fakeCreatedAt)
      expect(paymentCard).not.toBeDefined()
      expect(paymentCardBrand.name).toBe(debit.brands.visa.name)
    })

    test('non existent brand', () => {
      const fakeTransaction = {
        createdAt: fakeCreatedAt,
        payment: {
          type: 'debitcard_non-existent-brand'
        }
      }

      const {
        createdAt,
        paymentCardBrand,
      } = debit.ofTransaction(fakeTransaction)

      expect(createdAt).toBe(fakeCreatedAt)
      expect(paymentCardBrand).toBe(null)
    })

    test('not debit card transaction', () => {
      const fakeTransaction = {
        createdAt: fakeCreatedAt,
        payment: {
          type: 'boleto',
          boleto: {
            url: 'https://banco.com/boleto-123'
          }
        }
      }

      const {
        createdAt,
        paymentCard,
        paymentCardBrand,
      } = debit.ofTransaction(fakeTransaction)

      expect(createdAt).toBe(fakeCreatedAt)
      expect(paymentCard).not.toBeDefined()
      expect(paymentCardBrand).not.toBeDefined()
    })

    test('no transaction at all', () => {
      const emptyObject = debit.ofTransaction()

      expect(emptyObject.toString()).toBe({}.toString())
    })
  })
})

import { transfer } from '../../../../src/transaction/payment/methods'

describe('Transaction Payment Method: Transfer', () => {
  describe('function "getBankByNumber"', () => {
    test('existent bank', () => {
      const bankToFind = '001'
      const bankObject = transfer.getBankByNumber(bankToFind)

      expect(bankObject).toBeDefined()
      expect(bankObject.name).toBe(transfer.banks[bankToFind].name)
    })

    test('non existent bank', () => {
      const bankToFind = 'chatuba'
      const bankObject = transfer.getBankByNumber(bankToFind)

      expect(bankObject).not.toBeDefined()
    })

    test('no bank at all', () => {
      const bankObject = transfer.getBankByNumber()

      expect(bankObject).not.toBeDefined()
    })
  })

  describe('function "ofTransaction"', () => {
    const fakeCreatedAt = new Date()

    test('existent bank', () => {
      const bankNumber = '001'
      const fakeTransaction = {
        createdAt: fakeCreatedAt,
        payment: {
          wireTransfer: {
            bank: {
              code: bankNumber
            }
          }
        }
      }

      const {
        paymentTransferBank,
        paymentTransferBankBrand
      } = transfer.ofTransaction(fakeTransaction)

      expect(paymentTransferBank.code).toBe(bankNumber)
      expect(paymentTransferBankBrand.name).toBe(transfer.banks[bankNumber].name)
    })
  })
})

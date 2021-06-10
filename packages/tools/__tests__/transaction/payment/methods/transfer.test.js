import { transfer } from '../../../../src/transaction/payment/methods'

describe('Transaction Payment Method: Transfer', () => {
  describe('function "getBankByCode"', () => {
    test('existent bank', () => {
      const bankToFind = '001'
      const bankObject = transfer.getBankByCode(bankToFind)

      expect(bankObject).toBeDefined()
      expect(bankObject.name).toBe(transfer.banks[bankToFind].name)
    })

    test('non existent bank', () => {
      const bankToFind = 'chatuba'
      const bankObject = transfer.getBankByCode(bankToFind)

      expect(bankObject).not.toBeDefined()
    })

    test('no bank at all', () => {
      const bankObject = transfer.getBankByCode()

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

    test('non listed bank', () => {
      const bankNumber = '999'
      const fakeTransaction = {
        createdAt: fakeCreatedAt,
        payment: {
          type: 'wiretransfer',
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
      expect(paymentTransferBankBrand.name).toBe(transfer.name)
    })

    test('no wire transfer payment', () => {
      const fakeTransaction = {
        createdAt: fakeCreatedAt,
        payment: {
          type: 'test'
        }
      }

      const {
        paymentTransferBank,
        paymentTransferBankBrand
      } = transfer.ofTransaction(fakeTransaction)

      expect(paymentTransferBank).not.toBeDefined()
      expect(paymentTransferBankBrand).not.toBeDefined()
    })

    test('invalid transaction', () => {
      const transferAdapted = transfer.ofTransaction()

      expect(transferAdapted).toEqual({})
    })
  })
})

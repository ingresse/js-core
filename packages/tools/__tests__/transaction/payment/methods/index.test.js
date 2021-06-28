import { paymentTransferPlaceholder } from '../../../../src/settings.js'
import methods, { adapter, formatter, getByKey, getList } from '../../../../src/transaction/payment/methods'

describe('Transaction Payment Methods', () => {
  describe('function "getByKey"', () => {
    test('returns a valid payment method', () => {
      const validPaymentMethodRef = methods.credit
      const validPaymentMethodFound = getByKey(validPaymentMethodRef.keys[0])

      expect(validPaymentMethodFound.name).toEqual(validPaymentMethodRef.name)
    })

    test('returns undefined in response of missing parameter', () => {
      const paymentMethodReturned = getByKey()

      expect(paymentMethodReturned).toEqual(undefined)
    })

    test('returns "other" in response of an invalid payment method as parameter', () => {
      const paymentMethodReturned = getByKey('not-existent-payment-method-name-to-test')

      expect(paymentMethodReturned).toEqual(undefined)
    })
  })

  describe('function "getList"', () => {
    test('returns the same quantity as original object', () => {
      const methodsList = Object.values(methods)

      expect(getList().length).toEqual(methodsList.length)
    })
  })

  describe('function "formatter"', () => {
    test('should return an object, without any param passed', () => {
      const transactionFormatted = formatter()

      expect(typeof transactionFormatted).toBe('object')
    })

    test('should return an object, only with one param passed', () => {
      const transactionFormatted = formatter({})

      expect(typeof transactionFormatted).toBe('object')
    })

    test('should return an object, without method\'s adapter call', () => {
      const transactionFormatted = formatter({}, {})

      expect(typeof transactionFormatted).toBe('object')
    })

    test('should return an object, with method\'s adapter call', () => {
      jest.spyOn(methods.credit, 'ofTransaction')

      const transactionFormatted = formatter({ payment: {} }, methods.credit)

      expect(typeof transactionFormatted).toBe('object')
      expect(methods.credit.ofTransaction).toHaveBeenCalled()
    })
  })

  describe('function "adapter"', () => {
    test('not a transaction/object', () => {
      const transactionAdapted = adapter()

      expect(transactionAdapted).toEqual(undefined)
    })

    test('a transaction without "payment" prop', () => {
      const fakeTransaction = { transactionId: 'test-0123' }
      const transactionAdapted = adapter(fakeTransaction)

      expect(transactionAdapted.checkoutMethod.name).toBe(methods.other.name)
      expect(transactionAdapted.paymentMethod).not.toBeDefined()
    })

    test('a "free" transaction', () => {
      const fakeTransaction = { payment: { free: true } }
      const transactionAdapted = adapter(fakeTransaction)

      expect(transactionAdapted.checkoutMethod.name).toBe(methods.freepass.name)
      expect(transactionAdapted.paymentMethod.name).toBe(methods.freepass.name)
    })

    test('a "boleto" transaction', () => {
      const fakeTransaction = { payment: { bankBillet: {} } }
      const transactionAdapted = adapter(fakeTransaction)

      expect(transactionAdapted.checkoutMethod.name).toBe(methods.boleto.name)
      expect(transactionAdapted.paymentMethod.name).toBe(methods.boleto.name)
    })

    test('a "creditCard" transaction, without a brand', () => {
      const fakeTransaction = { payment: { creditCard: {}, type: 'creditcard' } }
      const transactionAdapted = adapter(fakeTransaction)

      expect(transactionAdapted.checkoutMethod.icon).toBe(methods.credit.icon)
      expect(transactionAdapted.checkoutMethod.name).toBe(methods.credit.name)
      expect(transactionAdapted.paymentMethod.name).toBe(methods.credit.name)
      expect(transactionAdapted.paymentMethod.icon).toBe(methods.credit.icon)
    })

    test('a "creditCard" transaction, with a brand, online sale', () => {
      const creditCardBrand = methods.credit.getBrandByKey('visa')
      const fakeTransaction = { payment: { creditCard: { brand: creditCardBrand.name }, type: 'creditcard' } }
      const transactionAdapted = adapter(fakeTransaction)
      const expectedName = `${methods.credit.name} - ${creditCardBrand.name}`
      const expectedIcon = creditCardBrand.icon

      expect(transactionAdapted.checkoutMethod.icon).toBe(creditCardBrand.icon)
      expect(transactionAdapted.checkoutMethod.name).toBe(expectedName)
      expect(transactionAdapted.paymentMethod.name).toBe(expectedName)
      expect(transactionAdapted.paymentMethod.icon).toBe(expectedIcon)
    })

    test('a "creditCard" transaction, with a brand, offline sale', () => {
      const creditCardBrand = methods.credit.getBrandByKey('elo')
      const fakeTransaction = { payment: { type: 'creditcard_elo' } }
      const transactionAdapted = adapter(fakeTransaction)
      const expectedName = `${methods.credit.name} - ${creditCardBrand.name}`
      const expectedIcon = creditCardBrand.icon

      expect(transactionAdapted.checkoutMethod.icon).toBe(expectedIcon)
      expect(transactionAdapted.checkoutMethod.name).toBe(expectedName)
      expect(transactionAdapted.paymentMethod.name).toBe(expectedName)
      expect(transactionAdapted.paymentMethod.icon).toBe(expectedIcon)
    })

    test('a "wireTransfer" transaction, without a recognized bank', () => {
      const transferBankCode = '999'
      const fakeTransaction = {
        payment: {
          wireTransfer: {
            bank: {
              code: transferBankCode,
            },
          },
          type: 'wiretransfer',
        }
      }
      const transactionAdapted = adapter(fakeTransaction)
      const expectedIcon = methods.transfer.icon
      const expectedName = paymentTransferPlaceholder

      expect(transactionAdapted.checkoutMethod.icon).toBe(expectedIcon)
      expect(transactionAdapted.checkoutMethod.name).toBe(expectedName)
      expect(transactionAdapted.paymentMethod.name).toBe(expectedName)
      expect(transactionAdapted.paymentMethod.icon).toBe(expectedIcon)
    })

    test('a "wireTransfer" transaction, with a recognized bank', () => {
      const transferBank = methods.transfer.getBankByCode('001')
      const fakeTransaction = {
        payment: {
          wireTransfer: {
            bank: {
              code: transferBank.code,
            },
          },
          type: 'wiretransfer',
        }
      }
      const transactionAdapted = adapter(fakeTransaction)
      const expectedIcon = transferBank.icon
      const expectedName = `${methods.transfer.name} - ${transferBank.name}`

      expect(transactionAdapted.checkoutMethod.icon).toBe(expectedIcon)
      expect(transactionAdapted.checkoutMethod.name).toBe(expectedName)
      expect(transactionAdapted.paymentMethod.name).toBe(expectedName)
      expect(transactionAdapted.paymentMethod.icon).toBe(expectedIcon)
    })

    describe('transactions identified by "payment.type"', () => {
      test('unrecognized type', () => {
        const fakeTransaction = { payment: { type: 'test-inexistent-payment-type' } }
        const { icon: expectedIcon, name: expectedName } = methods.other
        const {
          checkoutMethod: {
            icon: checkoutMethodIcon,
            name: checkoutMethodName,
          },
          paymentMethod: {
            icon: paymentMethodIcon,
            name: paymentMethodName,
          },
        } = adapter(fakeTransaction)

        expect(checkoutMethodIcon).toBe(expectedIcon)
        expect(checkoutMethodName).toBe(expectedName)
        expect(paymentMethodIcon).toBe(expectedIcon)
        expect(paymentMethodName).toBe(expectedName)
      })

      test('online transactions, identified by "payment.type" : "pix"', () => {
        const fakeTransaction = { payment: { type: methods.pix.keys[0] } }
        const { icon: expectedIcon, name: expectedName } = methods.pix
        const {
          checkoutMethod: {
            icon: checkoutMethodIcon,
            name: checkoutMethodName,
          },
          paymentMethod: {
            icon: paymentMethodIcon,
            name: paymentMethodName,
          },
        } = adapter(fakeTransaction)

        expect(checkoutMethodIcon).toBe(expectedIcon)
        expect(checkoutMethodName).toBe(expectedName)
        expect(paymentMethodIcon).toBe(expectedIcon)
        expect(paymentMethodName).toBe(expectedName)
      })

      describe('online transactions, identified by "acquirer.name" (digital wallets)', () => {
        const digitalWallets = [
          methods.ame,
          methods.paypal,
          methods.picpay,
        ]

        digitalWallets.forEach(({ name: acquirerName, icon: acquirerIcon, keys: acquirerKeys }) => {
          test(`valid "${acquirerName}" transaction`, () => {
            const fakeTransaction = { payment: { acquirer: { name: acquirerKeys[0] }, type: 'qrcode' } }
            const expectedIcon = acquirerIcon
            const expectedName = acquirerName
            const {
              checkoutMethod: {
                icon: checkoutMethodIcon,
                name: checkoutMethodName,
              },
              paymentMethod: {
                icon: paymentMethodIcon,
                name: paymentMethodName,
              },
            } = adapter(fakeTransaction)

            expect(checkoutMethodIcon).toBe(expectedIcon)
            expect(checkoutMethodName).toBe(expectedName)
            expect(paymentMethodIcon).toBe(expectedIcon)
            expect(paymentMethodName).toBe(expectedName)
          })
        })
      })

      describe('offline/ticketbooth transactions', () => {
        test('"money"', () => {
          const fakeTransaction = { payment: { type: 'money' } }
          const { icon: expectedIcon, name: expectedName } = methods.money
          const {
            checkoutMethod: {
              icon: checkoutMethodIcon,
              name: checkoutMethodName,
            },
            paymentMethod: {
              icon: paymentMethodIcon,
              name: paymentMethodName,
            },
          } = adapter(fakeTransaction)

          expect(checkoutMethodIcon).toBe(expectedIcon)
          expect(checkoutMethodName).toBe(expectedName)
          expect(paymentMethodIcon).toBe(expectedIcon)
          expect(paymentMethodName).toBe(expectedName)
        })

        describe('"creditcard" (offline/ticketbooth)', () => {
          test('"creditcard"', () => {
            const fakeTransaction = { payment: { type: 'creditcard' } }
            const { icon: expectedIcon, name: expectedName } = methods.credit
            const {
              checkoutMethod: {
                icon: checkoutMethodIcon,
                name: checkoutMethodName,
              },
              paymentMethod: {
                icon: paymentMethodIcon,
                name: paymentMethodName,
              },
            } = adapter(fakeTransaction)

            expect(checkoutMethodIcon).toBe(expectedIcon)
            expect(checkoutMethodName).toBe(expectedName)
            expect(paymentMethodIcon).toBe(expectedIcon)
            expect(paymentMethodName).toBe(expectedName)
          })

          methods.credit.getBrands().forEach(({ icon: brandIcon, name: brandName, keys: brandKeys }) => {
            test(`brand "${brandName}"`, () => {
              const fakeTransaction = { payment: { type: `creditcard_${brandKeys[0].toLowerCase()}` } }
              const expectedIcon = brandIcon
              const expectedName = `${methods.credit.name} - ${brandName}`
              const {
                checkoutMethod: {
                  icon: checkoutMethodIcon,
                  name: checkoutMethodName,
                },
                paymentMethod: {
                  icon: paymentMethodIcon,
                  name: paymentMethodName,
                },
              } = adapter(fakeTransaction)

              expect(checkoutMethodIcon).toBe(expectedIcon)
              expect(checkoutMethodName).toBe(expectedName)
              expect(paymentMethodIcon).toBe(expectedIcon)
              expect(paymentMethodName).toBe(expectedName)
            })
          })
        })

        describe('"debitcard" (offline/ticketbooth)', () => {
          test('"debitcard"', () => {
            const fakeTransaction = { payment: { type: 'debitcard' } }
            const { icon: expectedIcon, name: expectedName } = methods.debit
            const {
              checkoutMethod: {
                icon: checkoutMethodIcon,
                name: checkoutMethodName,
              },
              paymentMethod: {
                icon: paymentMethodIcon,
                name: paymentMethodName,
              },
            } = adapter(fakeTransaction)

            expect(checkoutMethodIcon).toBe(expectedIcon)
            expect(checkoutMethodName).toBe(expectedName)
            expect(paymentMethodIcon).toBe(expectedIcon)
            expect(paymentMethodName).toBe(expectedName)
          })

          methods.debit.getBrands().forEach(({ icon: brandIcon, name: brandName, keys: brandKeys }) => {
            test(`brand "${brandName}"`, () => {
              const fakeTransaction = { payment: { type: `debitcard_${brandKeys[0].toLowerCase()}` } }
              const expectedIcon = brandIcon
              const expectedName = `${methods.debit.name} - ${brandName}`
              const {
                checkoutMethod: {
                  icon: checkoutMethodIcon,
                  name: checkoutMethodName,
                },
                paymentMethod: {
                  icon: paymentMethodIcon,
                  name: paymentMethodName,
                },
              } = adapter(fakeTransaction)

              expect(checkoutMethodIcon).toBe(expectedIcon)
              expect(checkoutMethodName).toBe(expectedName)
              expect(paymentMethodIcon).toBe(expectedIcon)
              expect(paymentMethodName).toBe(expectedName)
            })
          })
        })
      })
    })
  })
})

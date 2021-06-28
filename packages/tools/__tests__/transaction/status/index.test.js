import status from '../../../src/transaction/status'

describe('Transaction STATUS', () => {
  describe('function "getByKey"', () => {
    test('a not valid status, returning "unknown"', () => {
      const statusKey = 'a-not-valid-status-key'
      const expectedKey = statusKey
      const { color: expectedColor, text: expectedText } = status.unknown

      const {
        key: returnedStatusKey,
        color: returnedStatusColor,
        text: returnedStatusText,
      } = status.getByKey(statusKey)

      expect(returnedStatusKey).toBe(expectedKey)
      expect(returnedStatusColor).toBe(expectedColor)
      expect(returnedStatusText).toBe(expectedText)
    })

    test('a valid status', () => {
      const statusKey = Object.keys(status)[0]
      const statusBase = Object.values(status)[0]
      const expectedKey = statusKey
      const { color: expectedColor, text: expectedText } = statusBase

      const {
        key: returnedStatusKey,
        color: returnedStatusColor,
        text: returnedStatusText,
      } = status.getByKey(statusKey)

      expect(returnedStatusKey).toBe(expectedKey)
      expect(returnedStatusColor).toBe(expectedColor)
      expect(returnedStatusText).toBe(expectedText)
    })
  })

  test('function "getKeys"', () => {
    expect(status.getKeys().includes('approved')).toBeTruthy()
  })

  test('function "getList"', () => {
    const statusList = status.getList()
    const firstItem = statusList[0] || {}

    expect(firstItem).toBeDefined()
    expect(firstItem.hasOwnProperty('color')).toBeTruthy()
    expect(firstItem.hasOwnProperty('key')).toBeTruthy()
    expect(firstItem.hasOwnProperty('text')).toBeTruthy()
  })

  describe('function "adapter"', () => {
    const { adapter } = status

    test('without param, return "undefined"', () => {
      expect(adapter()).toBe(undefined)
    })

    test('returns "unknown" in case of transaction "status" prop is missing', () => {
      const { status: returnedStatus } = adapter({})

      expect(returnedStatus.current.text).toBe(status.unknown.text)
    })

    test('returns "unknown" in case of transaction "status.history.item" prop is missing', () => {
      const { status: returnedStatus } = adapter({
        status: {
          history: [
            null,
            { test: 'test' },
          ],
        },
      })

      expect(returnedStatus.history[0].text).toBe(status.unknown.text)
    })

    test('boolean helper "isApproved"', () => {
      const fakeTransaction = {
        status: {
          current: { name: 'approved' },
          history: [
            { name: 'approved', order: 2 },
            { name: 'pending', order: 1 },
          ],
        },
      }

      const {
        isApproved,
        wasPending,
      } = adapter(fakeTransaction)

      expect(isApproved).toBeTruthy()
      expect(wasPending).toBeTruthy()
    })
  })
})

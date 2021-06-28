import list from '../../src/transaction/list.js'
import transactionAdapter from '../../src/transaction/adapter.js'

jest.mock('../../src/transaction/adapter.js', () => {
  return jest.fn().mockImplementation((transaction) => transaction)
})

describe('Transaction LIST Adapter', () => {
  let listApiResponse = {}

  test('should not call adapter, by missing param', () => {
    const result = list()

    expect(result).toBe(undefined)
    expect(transactionAdapter).not.toHaveBeenCalled()
  })

  test('should return default data format without any results', () => {
    const result = list(listApiResponse)
    const expected = JSON.stringify({ data: [], pagination: null, review: 0 })

    expect(JSON.stringify(result)).toBe(expected)
  })

  test('should call transaction adapter to each transaction present in array', () => {
    listApiResponse = {
      data: [ {}, {}, {} ],
      pagination: { total: 3 },
    }

    list(listApiResponse)

    expect(transactionAdapter).toHaveBeenCalledTimes(listApiResponse.data.length)
  })

  test('should count each transaction in "manual review" status, present in array', () => {
    const mockData = [ { isManualReview: true }, { isManualReview: true }, {} ]
    const reviewCount = mockData.filter(({ isManualReview }) => isManualReview).length
    listApiResponse = {
      data: mockData,
      pagination: { total: 3 },
    }

    const result = list(listApiResponse)

    expect(result.review).toBe(reviewCount)
  })
})

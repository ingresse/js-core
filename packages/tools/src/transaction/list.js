import adapter from './adapter.js'

/**
 * Transactions List adapter
 *
 * @param {Object} response
 *
 * @returns {Object}
 */
export default function list(response) {
  if (!response || (typeof response !== 'object')) {
    return response
  }

  let review = 0
  const data = []
  const {
    data: dataRaw = [],
    paginationInfo: pagination = null,
  } = response

  dataRaw.forEach(function (transaction) {
    const adaptedTransaction = adapter(transaction)
    const { isManualReview } = adaptedTransaction

    review += isManualReview ? 1 : 0

    data.push(adaptedTransaction)
  })

  return {
    ...response,
    data,
    pagination,
    review,
  }
}

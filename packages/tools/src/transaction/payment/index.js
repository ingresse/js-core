import methods from './methods'

/**
 * Transaction Payment adapter
 *
 * @param {Object} transaction
 *
 * @returns {Object}
 */
function adapter(transaction = {}) {
  return {
    ...transaction,
    ...methods.adapter(transaction),
  }
}

/**
 * Transaction Payment ref
 */
const payment = {
  methods,
}

/**
 * Defining object hidden props
 */
Object.defineProperties(payment, {
  adapter: {
    enumerable: false,
    writable: true,
    value: adapter,
  },
})

export default payment

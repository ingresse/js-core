import sequence from './_sequence.js'

/**
 * Base properties to Transaction Payment Method
 *
 * @param {String} methodName
 * @param {Object} method
 *
 * @returns {Object}
 */
export default function base(methodName = '', method = {}) {
  /**
   * Transaction Payment Method base adapter
   *
   * @param {Object} transaction - Ingresse's API Transaction
   *
   * @returns {Object}
   */
  function ofTransaction(transaction = {}) {
    const { name, icon } = method

    return {
      ...transaction,
      checkoutMethod: {
        name,
        icon,
      },
    }
  }

  Object.defineProperties(method, {
    ofTransaction: {
      enumerable: false,
      writable: true,
      value: (transaction) => ofTransaction(transaction, method),
    },
    ...(typeof sequence[methodName] !== 'number' ? {} : {
      sequence: {
          enumerable: true,
          writable: true,
          value: sequence[methodName],
      },
    }),
  })

  return method
}

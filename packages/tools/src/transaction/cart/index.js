/**
 * Transaction Cart adapter sums extra items and tickets totals
 *
 * @param {Object} transaction
 *
 * @returns {Object}
 */
function adapter(transaction = {}) {
  let totalQuantity = 0
  const { extras, tickets } = transaction
  const cart = [
    ...(tickets || []),
    ...(extras || []),
  ]

  /**
   * Items quantity sum
   *
   * @param {Array} items
   */
  function itemsIncrement(items) {
    if (!items || !items.length) {
      return
    }

    items.forEach(({ externalId, quantity }) => {
      const parsedQuantity = parseInt(quantity || 0, 10)

      if (!parsedQuantity || (externalId === 'ing-coupon')) {
        return
      }

      totalQuantity += parsedQuantity
    })
  }

  itemsIncrement(extras)
  itemsIncrement(tickets)

  return {
    ...transaction,
    cart,
    totalQuantity,
  }
}

/**
 * Transaction Cart ref
 */
const cart = {}

/**
 * Defining object hidden props
 */
Object.defineProperties(cart, {
  adapter: {
    enumerable: false,
    writable: true,
    value: adapter,
  },
})

export default cart

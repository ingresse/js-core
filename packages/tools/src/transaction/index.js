import adapter from './adapter.js'
import list from './list.js'
import cart from './cart'
import payment from './payment'
import status from './status'

/**
 * Transaction ref
 */
const transaction = {
  cart,
  payment,
  status,
}

/**
 * Defining object hidden props
 */
Object.defineProperties(transaction, {
  adapter: {
    enumerable: false,
    writable: true,
    value: adapter,
  },
  list: {
    enumerable: false,
    writable: true,
    value: list,
  },
})

export default transaction

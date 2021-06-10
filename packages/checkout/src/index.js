import pck from '../package.json'
import methods, { methodIdentifier, methodTransaction } from './methods'

/**
 * Checkout reference
 */
const checkout = {
  methods,
  methodIdentifier,
  methodTransaction,
}

/**
 * Set it as "window" resource
 */
if (typeof window !== 'undefined') {
  window[pck.custom.windowRefKey] = checkout
}

/**
 * Main entry point
 */
export default checkout

import pck from '../package.json'
import transaction from './transaction'

/**
 * Tools reference
 */
const tools = {
  transaction,
}

/**
 * Set Ingresse's Tools as "window" resource
 */
if (typeof window !== 'undefined') {
  const { custom: { windowRefKey } } = pck
  const { payment } = transaction
  const { methods: paymentMethods } = payment

  window[windowRefKey] = {
    ...(window[windowRefKey] || {}),
    ...tools,
    paymentMethods
  }
}

/**
 * Main entry point
 */
export default tools

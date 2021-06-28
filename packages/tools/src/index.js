import { windowRefKey } from './settings'
import transaction from './transaction'

/**
 * Shortcuts
 */
const { payment } = transaction
const { methods: paymentMethods } = payment

/**
 * Tools reference
 */
const tools = {
  paymentMethods,
  transaction,
}

/**
 * Set Ingresse's Tools as "window" resource
 */
if (typeof window !== 'undefined') {
  window[windowRefKey] = {
    ...(window[windowRefKey] || {}),
    ...tools,
  }
}

/**
 * Main entry point
 */
export default tools

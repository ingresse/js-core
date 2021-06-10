import cart from './cart'
import payment from './payment'
import refund from './refund'
import status from './status'

/**
 * Transaction Adapter wich applies easy-to-use data formats
 *
 * @param {Object} raw - transaction raw response
 *
 * @returns {Object}
 */
 export default function adapter(raw) {
  if (!raw || (typeof raw !== 'object')) {
    return raw
  }

  const transactionAdaptedStatus = status.adapter(raw)

  return {
    ...raw,
    ...cart.adapter(transactionAdaptedStatus),
    ...payment.adapter(transactionAdaptedStatus),
    ...refund.adapter(transactionAdaptedStatus),
  }
}

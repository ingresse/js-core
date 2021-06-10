import transactionStatus from '../status'

const refundableStatus = [
  'approved',
  'manual review',
]
const refundableGateways = [
  'ingresse',
]
const refundablePaymentTypes = [
  'creditcard',
  'wiretransfer',
]

/**
 * Transaction Refund adapter
 *
 * @param {Object} transaction
 *
 * @returns {Object}
 */
function adapter(transaction) {
  if (!transaction || typeof transaction !== 'object') {
    return transaction
  }

  const afterStatusAdapter = transactionStatus.adapter(transaction)
  const { isApproved, isInReview, payment, status } = afterStatusAdapter
  const { free: paymentFree, gateway: paymentGateway, type: paymentType } = payment || {}
  const { current } = status
  const { name: currentStatusName } = current
  const isFree = !!(paymentFree && !paymentGateway && !paymentType && isApproved)
  const isRefundableGateway = refundableGateways.includes(paymentGateway)
  const isRefundablePaymentType = refundablePaymentTypes.includes(paymentType)
  const isRefundableStatus = refundableStatus.includes(currentStatusName)

  const isRefundable = isFree || !!(
    isRefundableGateway &&
    isRefundablePaymentType &&
    isRefundableStatus
  )
  const isRefundableText = !isRefundable ? '' : (
    isFree ? 'Devolver Ingressos' : (
      isInReview ? 'Desistir da Compra' : 'Pedir Reembolso'
    )
  )

  return {
    ...afterStatusAdapter,
    isRefundable,
    isRefundableText,
    isRefundableGateway,
    isRefundablePaymentType,
    isRefundableStatus,
  }
}

/**
 * Transaction Refund ref
 */
const refund = {
  gateways: refundableGateways,
  paymentTypes: refundablePaymentTypes,
  status: refundableStatus,
}

/**
 * Defining object hidden props
 */
Object.defineProperties(refund, {
  adapter: {
    enumerable: false,
    writable: true,
    value: adapter,
  },
})

export default refund

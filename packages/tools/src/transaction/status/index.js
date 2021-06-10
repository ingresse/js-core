/**
 * Transaction Status reference
 */
const status = {
  'approved': {
    text: 'Aprovada',
    color: '#60c659',
  },
  'authorized': {
    text: 'Autorizada',
    color: '#3cc2a5',
  },
  'cancelled': {
    text: 'Cancelada',
    color: '#7a8085',
  },
  'declined': {
    text: 'Recusada',
    color: '#ef3c3e',
  },
  'error': {
    text: 'Erro',
    color: '#ef3c3e',
  },
  'limitExceeded': {
    text: 'Limite por Conta',
    color: '#fca311',
  },
  'manual review': {
    text: 'Análise',
    color: '#516cb2',
  },
  'outOfStock': {
    text: 'Sem Estoque',
    color: '#fca311',
  },
  'pending': {
    text: 'Pendente',
    color: '#00a5db',
  },
  'refund': {
    text: 'Reembolsada',
    color: '#ac6cb8',
  },
  'unknown': {
    text: 'Desconhecido',
    color: '#dddfe0',
  },
}

/**
 * Get status by key
 *
 * @param {String} statusKey
 *
 * @returns {Object}
 */
function getByKey(statusKey = '') {
  const found = status[statusKey] || {}

  return {
    key: statusKey,
    ...status.unknown,
    ...found,
  }
}

/**
 * Status Keys and List
 */
const keys = Object.keys(status)
const list = keys.map((key) => getByKey(key))

/**
 * Get Status Keys
 *
 * @returns {Array}
 */
function getKeys() {
  return keys
}

/**
 * Get Status List
 *
 * @returns {Array}
 */
function getList() {
  return list
}

/**
 * Adapt Status of a Transaction
 *
 * @param {Object} transaction
 *
 * @returns {Object}
 */
function adapter(transaction) {
  if (!transaction || typeof transaction !== 'object') {
    return transaction
  }

  const { status: tStatus } = transaction
  const { current: statusCurrent, history: statusHistory = [] } = tStatus || {}
  const { name: statusCurrentName } = statusCurrent || {}
  const history = []
  const currentIdentified = getByKey(statusCurrentName)
  const current = {
    ...(statusCurrent || {}),
    ...currentIdentified,
  }
  let statusBools = {
    isApproved: statusCurrentName === 'approved',
    isAuthorized: statusCurrentName === 'authorized',
    isCancelled: statusCurrentName === 'cancelled',
    isDeclined: statusCurrentName === 'declined',
    isError: statusCurrentName === 'error',
    isLimitExceeded: statusCurrentName === 'limitExceeded',
    isManualReview: statusCurrentName === 'manual review',
    isInReview: statusCurrentName === 'manual review',
    isOutOfStock: statusCurrentName === 'outOfStock',
    isPending: statusCurrentName === 'pending',
    isRefund: statusCurrentName === 'refund',
    isRefunded: statusCurrentName === 'refund',
  }

  statusHistory.forEach((item) => {
    const statusItem = item || {}
    const { name = '' } = statusItem
    const statusIdentified = getByKey(name)
    const statusNameSplitted = String(name).split(/ |-/g)
    const statusKeyUpper = statusNameSplitted.map((keyName) => `${keyName.charAt(0).toUpperCase()}${keyName.slice(1)}`).join('')
    const boolKey = `was${statusKeyUpper}`

    statusBools[boolKey] = true

    history.push({
      ...statusItem,
      ...statusIdentified,
    })
  })

  const status = {
    current,
    history: history.sort(({ order: oA }, { order: oB }) => oA - oB).reverse(),
  }

  return {
    ...transaction,
    ...statusBools,
    status,
  }
}

/**
 * Defining object hidden props
 */
Object.defineProperties(status, {
  adapter: {
    enumerable: false,
    writable: true,
    value: adapter,
  },
  getByKey: {
    enumerable: false,
    writable: true,
    value: getByKey,
  },
  getKeys: {
    enumerable: false,
    writable: true,
    value: getKeys,
  },
  getList: {
    enumerable: false,
    writable: true,
    value: getList,
  },
  keys: {
    enumerable: false,
    writable: true,
    value: keys,
  },
  list: {
    enumerable: false,
    writable: true,
    value: list,
  },
})

export default status

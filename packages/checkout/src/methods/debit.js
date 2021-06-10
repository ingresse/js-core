import { credit } from './credit.js'

/**
 * Debit Card brands reference
 */
const brands = {
  elo: credit.getBrands('elo')[0],
  mastercard: credit.getBrands('mastercard')[0],
  visa: credit.getBrands('visa')[0],
}

/**
 * Get Debit Card Brands
 *
 * @param {String} [brandKey]
 *
 * @returns {Array}
 */
function getBrands(brandKey = '') {
  return credit.getBrands(brandKey, brands)
}

export const debit = {
  ...credit,
  brands,
  getBrands,
  name: 'Débito',
  keys: [
    'card',
    'debit',
    'debito',
    'debitcard',
    'debit-card',
    'cartaodebito'
  ],
}

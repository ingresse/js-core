import { urlIcon } from '../../../utils'
import base from './_base.js'

/**
 * Boleto reference
 */
export const boleto = base('boleto', {
  name: 'Boleto',
  icon: urlIcon('boleto'),
  iconInverse: urlIcon('boleto-inverse'),
  iconRegular: urlIcon('boleto-regular'),
  keys: [
    'bankbillet',
    'bank-billet',
    'boleto',
    'boletobancario',
    'boleto-bancario'
  ],
})

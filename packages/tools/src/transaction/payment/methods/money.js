import { urlIcon } from '../../../utils'
import base from './_base.js'

/**
 * Money reference
 */
export const money = base('money', {
  name: 'Dinheiro',
  icon: urlIcon('money'),
  iconInverse: urlIcon('money-inverse'),
  iconRegular: urlIcon('money-regular'),
  keys: [
    'money',
    'cash',
    'dinheiro'
  ],
})

import { urlIcon } from '../../../utils'
import base from './_base.js'

/**
 * Apple Pay reference
 */
export const applepay = base('applepay', {
  name: 'Apple Pay',
  icon: urlIcon('applepay'),
  iconInverse: urlIcon('applepay-inverse'),
  iconRegular: urlIcon('applepay-regular'),
  keys: [
    'applepay'
  ],
})

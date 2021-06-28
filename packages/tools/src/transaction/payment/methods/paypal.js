import { urlIcon } from '../../../utils'
import base from './_base.js'

/**
 * PayPal reference
 */
export const paypal = base('paypal', {
  name: 'PayPal',
  icon: urlIcon('paypal'),
  iconInverse: urlIcon('paypal-inverse'),
  iconRegular: urlIcon('paypal-regular'),
  keys: [
    'paypal'
  ],
})

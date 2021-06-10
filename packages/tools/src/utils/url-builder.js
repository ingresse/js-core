import pck from '../../package.json'

/**
 * Assets URL Builder
 *
 * @param {String} path
 *
 * @returns {String}
 */
export function urlBuilder(path = '/') {
  return `${pck.custom.cdn}${path}`
}

/**
 * Icon URL Builder
 *
 * @param {String} iconName
 * @param {String} folder
 * @param {String} extension
 *
 * @returns {String}
 */
export function urlIcon(
  iconName = '',
  folder = 'assets/payment/methods',
  extension = '.svg'
) {
  return !iconName ? '' : urlBuilder(`/${folder}/${iconName}${extension}`)
}

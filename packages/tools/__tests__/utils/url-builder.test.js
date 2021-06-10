import { hostingURL } from '../../src/settings.js'
import { urlBuilder, urlIcon } from '../../src/utils/url-builder'

describe('Utility: URL Builder', () => {
  const defaultAddress = hostingURL

  describe('method "urlBuild', () => {
    const defaultUrl = `${defaultAddress}/`

    test('gets CDN default address with simple path', () => {
      expect(urlBuilder()).toBe(defaultUrl)
    })

    test('gets CDN address with custom path', () => {
      const customPath = '/testing-url-build'
      const expectedUrl = `${defaultAddress}${customPath}`

      expect(urlBuilder(customPath)).toBe(expectedUrl)
    })
  })

  describe('method "urlIcon', () => {
    const defaultUrl = `${defaultAddress}/assets/payment/methods/`
    const defaultExtension = '.svg'

    test('gets empty string by missing params usage', () => {
      expect(urlIcon()).toBe('')
    })

    test('gets an icon url address', () => {
      const iconName = 'ame'
      const expectedUrl = `${defaultUrl}${iconName}${defaultExtension}`

      expect(urlIcon(iconName)).toBe(expectedUrl)
    })

    test('gets an icon url from different folder', () => {
      const iconName = 'fake-icon'
      const customFolder = 'another-folder'
      const expectedUrl = `${defaultAddress}/${customFolder}/${iconName}${defaultExtension}`

      expect(urlIcon(iconName, customFolder)).toBe(expectedUrl)
    })

    test('gets an icon url from different folder and extension', () => {
      const iconName = 'fake-icon'
      const customFolder = 'another-folder'
      const customExtension = '.png'
      const expectedUrl = `${defaultAddress}/${customFolder}/${iconName}${customExtension}`

      expect(urlIcon(iconName, customFolder, customExtension)).toBe(expectedUrl)
    })
  })
})

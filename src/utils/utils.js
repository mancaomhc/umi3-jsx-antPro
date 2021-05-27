import CryptoJS from 'crypto-js'
import { ENCRYPT_KEY } from './dictionary'

/**
 * AES 加密
 * @param {*string} str 要加密的字符
 */
export const encryptByAes = str => {
  const parsedKey = CryptoJS.enc.Latin1.parse(ENCRYPT_KEY)
  const encryptResult = CryptoJS.AES.encrypt(str, parsedKey, {
    iv: parsedKey,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  })

  return encryptResult.toString()
}

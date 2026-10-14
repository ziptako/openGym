import { getLang, t as mainT } from './i18n-core.js'
import zh from '../admin-locales/zh.js'

// Keep operator-only translations separate from the end-user packs: a partial operator
// locale falls back to the existing UI translations, then the English source text.
export function t(source, ...args) {
  if (!source) return source
  let value = getLang() === 'zh' ? zh[source] : null
  if (!value) return mainT(source, ...args)
  for (let i = 0; i < args.length; i++) value = value.replaceAll('{' + i + '}', args[i])
  return value
}

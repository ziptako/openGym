import { afterEach, expect, it } from 'vitest'
import zh from '../admin-locales/zh.js'
import { t } from './admin-i18n.js'
import { _setLangState } from './i18n-core.js'
import { auditLabel, auditReason } from './audit.js'

afterEach(() => _setLangState('en', {}, null, null))
it('keeps interpolation fields intact in every operator translation', () => {
  const marks = s => [...s.matchAll(/\{\d+\}/g)].map(m => m[0]).sort()
  for (const [source, target] of Object.entries(zh)) {
    expect(target.trim(), source).not.toBe('')
    expect(marks(target), source).toEqual(marks(source))
  }
})
it('falls back to the UI locale and preserves unknown server codes', () => {
  _setLangState('de', { 'Admin': 'Verwaltung' }, null, null)
  expect(t('Admin')).toBe('Verwaltung')
  expect(t('copy {0}', 'ABC')).toBe('copy ABC')
  _setLangState('zh', {}, null, null)
  expect(auditLabel('new.event')).toBe('new.event')
  expect(auditReason('provider-specific-code')).toBe('provider-specific-code')
})

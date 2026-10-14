import { afterEach, expect, it } from 'vitest'
import { _setLangState, _setDetails, descFor, instrFor } from './i18n-core.js'
import instructions from '../instr/zh.js'
import descriptions from '../exercise-desc/zh.js'
import enInstructions from '../instr/en.js'
import enDescriptions from '../exercise-desc/en.js'

afterEach(() => _setLangState('en', {}, null, null))
it('loads Chinese description AND steps for 1 2 stick drill, with English still available', () => {
  _setLangState('zh', {}, instructions, null)
  _setDetails(enInstructions, enDescriptions, descriptions, 'zh')
  expect(descFor({ id: '5965' })).toBe('通过快速、轻盈的脚步训练，提升敏捷性与协调能力。')
  expect(instrFor({ id: '5965' })).toHaveLength(5)
  expect(instrFor({ id: '5965' }).every(s => /[\u4e00-\u9fff]/.test(s))).toBe(true)
  _setLangState('en', {}, null, null)
  expect(instrFor({ id: '5965' })).toEqual(enInstructions['5965'])
})

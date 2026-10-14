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

it.each([
  ['0463', 6],
  ['0715', 6],
  ['1197', 5],
  ['6211', 6],
  ['3094', 6],
  ['2471', 6],
  ['1243', 5],
  ['5213', 6],
  ['4646', 5],
  ['4295', 5],
  ['0166', 6],
  ['2487', 6],
  ['3018', 5],
  ['6406', 5],
  ['10671', 6],
  ['2659', 5],
  ['4973', 6],
  ['3668', 5],
  ['4861', 5],
  ['1241', 5],
  ['1030', 5],
  ['2291', 6],
  ['6032', 5],
  ['1454', 5],
  ['2234', 6],
  ['5656', 5],
  ['2249', 6],
  ['1060', 6],
  ['2290', 6],
  ['1992', 5],
  ['0585', 6], // lever leg extension
  ['3386', 6], // lever seated leg extension v. 2
  ['0739', 7], // sled 45° leg press
  ['2146', 5], // lever hip thrust
  ['7384', 5], // lever hip thrust (plate loaded)
  ['0599', 7], // lever seated leg curl
  ['0597', 6], // lever seated hip abduction
  ['0598', 5], // lever seated hip adduction
])('shows complete Chinese details for %s and retains English on language switch', (id, stepCount) => {
  const ex = { id }
  _setLangState('zh', {}, instructions, null)
  _setDetails(enInstructions, enDescriptions, descriptions, 'zh')
  expect(descFor(ex)).toMatch(/[\u4e00-\u9fff]/)
  expect(descFor(ex)).not.toBe(enDescriptions[id])
  expect(instrFor(ex)).toHaveLength(stepCount)
  expect(instrFor(ex).every(step => /[\u4e00-\u9fff]/.test(step))).toBe(true)
  _setLangState('en', {}, null, null)
  expect(descFor(ex)).toBe(enDescriptions[id])
  expect(instrFor(ex)).toEqual(enInstructions[id])
})

import { expect, test } from 'vitest'
import { presetUno } from 'unocss'
import { transformCss } from '../src'

test('single rule', async() => {
  const transform = await transformCss('body {@apply pb-1;}', { presets: [presetUno()] })
  expect(transform).toEqual('body {padding-bottom: 0.25rem;}')
})

test('multiple rules', async() => {
  const transform = await transformCss('body {@apply pb-1 mt-4;}', { presets: [presetUno()] })
  expect(transform).toEqual('body {margin-top: 1rem; padding-bottom: 0.25rem;}')
})

test('background', async() => {
  const transform = await transformCss('body {@apply bg-blue-500;}', { presets: [presetUno()] })
  expect(transform).toEqual('body {--un-bg-opacity: 1; background-color: rgba(59,130,246,var(--un-bg-opacity));}')
})

test('background and opacity', async() => {
  const transform = await transformCss('body {@apply bg-blue-500 bg-opacity-50;}', { presets: [presetUno()] })
  expect(transform).toEqual('body {--un-bg-opacity: 1; background-color: rgba(59,130,246,var(--un-bg-opacity)); --un-bg-opacity: 0.5;}')
})

test('multiple properties', async() => {
  const transform = await transformCss('html {@apply bg-black;}\nbody {@apply p-4;}', { presets: [presetUno()] })
  expect(transform).toEqual('html {--un-bg-opacity: 1; background-color: rgba(0,0,0,var(--un-bg-opacity));}\nbody {padding: 1rem;}')
})

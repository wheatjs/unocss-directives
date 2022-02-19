import { createGenerator, normalizeCSSEntries } from 'unocss'
import type { CSSValues, UserConfig } from 'unocss'
import { resolveConfig } from './util'

const APPLY_REGEX = /@apply ([^;]*;)/gm

export const transformCss = async(input: string, config: UserConfig) => {
  const resolvedConfig = resolveConfig(config)
  const generator = createGenerator(config)
  const ctx = {
    theme: resolvedConfig.theme,
    variantHandlers: [],
    // @ts-expect-error just because
    constructCSS: (...args) => generator.constructCustomCSS(ctx, ...args),
    generator,
    currentSelector: '',
  }
  const properties = input.matchAll(APPLY_REGEX)

  for (const props of properties) {
    const rules = props[1].slice(0, -1).split(' ')
    const styles: (string | CSSValues | undefined)[] = []

    for (const rule of resolvedConfig.rulesDynamic) {
      if (rule) {
        for (const prop of rules) {
          const match = prop.match(rule[0])

          if (match) {
            const style = await rule[1](match, { ...ctx, rawSelector: prop })
            styles.push(style)
          }
        }
      }
    }

    for (const rule in resolvedConfig.rulesStaticMap) {
      for (const prop of rules) {
        if (prop === rule) {
          const x = resolvedConfig.rulesStaticMap[rule]
          if (x)
            styles.push(x[1])
        }
      }
    }

    const computedStyles: string[] = []

    for (const style of styles) {
      if (typeof style === 'string')
        computedStyles.push(style)
      else if (typeof style !== 'undefined')
        normalizeCSSEntries(style as any).forEach(x => computedStyles.push(`${x[0]}: ${x[1]};`))
    }

    input = input.replace(props[0], computedStyles.join(' '))
  }

  return input
}

// export const UnocssPreprocessor: Plugin = {
//   name: 'unocss-proprocessor',
// }

// export default UnocssPreprocessor

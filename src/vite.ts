import type { Plugin } from 'vite'
import type { VitePluginConfig } from 'unocss/vite'
import UnocssPlugin from 'unocss/vite'
import { createConfigLoader } from '@unocss/config'
import { transformCss } from './index'

const cssRegex = /\.(css)$/

const UnocssDirectivesPlugin = (configOrPath?: VitePluginConfig | string): Plugin[] => {
  let config: VitePluginConfig<{}>

  const plugin: Plugin = {
    name: 'unocss:directives',
    async config() {
      config = (await createConfigLoader(configOrPath, [])()).config
    },
    async transform(src, id) {
      if (cssRegex.test(id)) {
        return {
          code: await transformCss(src, config),
          map: null,
        }
      }
    },
  }

  return [
    plugin,
    ...UnocssPlugin(configOrPath),
  ].filter(Boolean) as Plugin[]
}

export default UnocssDirectivesPlugin

import type { Plugin } from 'esbuild'

type moduleType = 'es|cjs|auto'

interface Options {
  module: moduleType
}

declare function esbuildPluginElementPlusSmartImport(options: Options & {}): Plugin

export = esbuildPluginElementPlusSmartImport

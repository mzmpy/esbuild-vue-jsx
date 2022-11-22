import type { Plugin } from 'esbuild'

type moduleType = 'es|cjs|auto'

interface Options {
  module: moduleType
}

declare function esbuildPluginElementPlusAutoImport(options: Options & {}): Plugin

export = esbuildPluginElementPlusAutoImport

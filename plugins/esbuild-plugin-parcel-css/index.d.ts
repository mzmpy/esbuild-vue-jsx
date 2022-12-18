import type { Plugin } from 'esbuild'
import type { TransformOptions } from '@parcel/css'

interface Code {
  code: Buffer
}

type Options = Omit<TransformOptions, keyof Code>

declare function esbuildPluginParcelCss(options: Options): Plugin

export = esbuildPluginParcelCss

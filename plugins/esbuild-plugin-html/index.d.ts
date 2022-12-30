import type { Plugin } from 'esbuild'

interface Options {
  source: string|string[]|EntryPoints,
  module: boolean
}

type EntryPoints = Record<string, string>

declare function esbuildPluginHtml(options: Options): Plugin

export = esbuildPluginHtml

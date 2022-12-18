import type { Plugin } from 'esbuild'

interface Options {
  source: string|string[]|EntryPoints
}

type EntryPoints = Record<string, string>

declare function esbuildPluginHtml(options: Options): Plugin

export = esbuildPluginHtml

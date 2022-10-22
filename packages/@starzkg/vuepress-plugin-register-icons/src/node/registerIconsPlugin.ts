import type { Plugin } from '@vuepress/core'
import { hash, path } from '@vuepress/utils'
import chokidar from 'chokidar'
import { prepareClientConfigFile } from './prepareClientConfigFile.js'

/**
 * Options for @vuepress/plugin-register-icons
 */
export interface RegisterIconsPluginOptions {
  /**
   * An object that defines name of icons and their corresponding file path
   */
  icons?: Record<string, string>

  /**
   * Absolute path to the icons directory
   */
  iconsDir?: string | null

  /**
   * Patterns to match component files using [globby](https://github.com/sindresorhus/globby)
   *
   * The patterns are relative to iconsDir`
   */
  iconsPatterns?: string[]

  /**
   * A function to get component name from the filename
   */
  getIconName?: (filename: string) => string

  /**
   * Icon  prefix
   *
   * @default 'icon-'
   */
  iconPrefix?: string
}

export const registerIconsPlugin = ({
  icons = {},
  iconsDir = null,
  iconsPatterns = ['**/*.vue', '**/*.svg'],
  getIconName = (filename) => path.trimExt(filename.replace(/\/|\\/g, '-')),
  iconPrefix = 'icon-',
}: RegisterIconsPluginOptions = {}): Plugin => {
  const options = {
    icons,
    iconsDir,
    iconsPatterns,
    getIconName,
    iconPrefix,
  }

  // use options hash as the identifier of client app enhance file
  // to avoid conflicts when using this plugin multiple times
  const optionsHash = hash(options)

  return {
    name: '@starzkg/vuepress-plugin-register-icons',

    multiple: true,

    clientConfigFile: (app) =>
      prepareClientConfigFile(app, options, optionsHash),

    onWatched: (app, watchers) => {
      if (iconsDir) {
        const iconsWatcher = chokidar.watch(iconsPatterns, {
          cwd: iconsDir,
          ignoreInitial: true,
        })
        iconsWatcher.on('add', () => {
          prepareClientConfigFile(app, options, optionsHash)
        })
        iconsWatcher.on('unlink', () => {
          prepareClientConfigFile(app, options, optionsHash)
        })
        watchers.push(iconsWatcher)
      }
    },
  }
}

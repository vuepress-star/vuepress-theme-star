import { globby, path } from '@vuepress/utils'
import type { RegisterIconsPluginOptions } from './registerIconsPlugin.js'

export const getIconsFromDir = async ({
  iconsDir,
  iconsPatterns,
  getIconName,
}: Omit<Required<RegisterIconsPluginOptions>, 'icons'>): Promise<
  Record<string, string>
> => {
  if (!iconsDir) {
    return {}
  }

  // get all matched component files
  const iconsDirFiles = await globby(iconsPatterns, {
    cwd: iconsDir,
  })

  // transform files to name => filepath map
  return Object.fromEntries(
    iconsDirFiles.map((filename) => [
      getIconName(filename),
      path.resolve(iconsDir, filename),
    ])
  )
}

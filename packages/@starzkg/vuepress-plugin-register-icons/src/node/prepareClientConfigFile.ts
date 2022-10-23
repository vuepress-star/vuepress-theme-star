import type { App } from '@vuepress/core'
import { fs, path } from '@vuepress/utils'
import { optimize } from 'svgo'
import { getIconsFromDir } from './getIconsFromDir.js'
import type { RegisterIconsPluginOptions } from './registerIconsPlugin.js'

const config = {
  plugins: [
    'cleanupAttrs',
    'removeDoctype',
    'removeXMLProcInst',
    'removeComments',
    'removeMetadata',
    'removeTitle',
    'removeDesc',
    'removeUselessDefs',
    'removeEditorsNSData',
    'removeEmptyAttrs',
    'removeHiddenElems',
    'removeEmptyText',
    'removeEmptyContainers',
    // 'removeViewBox',
    'cleanupEnableBackground',
    'convertStyleToAttrs',
    'convertColors',
    'convertPathData',
    'convertTransform',
    'removeUnknownsAndDefaults',
    'removeNonInheritableGroupAttrs',
    'removeUselessStrokeAndFill',
    'removeUnusedNS',
    'cleanupIDs',
    'cleanupNumericValues',
    'moveElemsAttrsToGroup',
    'moveGroupAttrsToElems',
    'collapseGroups',
    // 'removeRasterImages',
    'mergePaths',
    'convertShapeToPath',
    'sortAttrs',
    'removeDimensions',
    { name: 'removeAttrs', params: { attrs: '(stroke|class)' } },
  ],
}

const generateIconComponent = async (
  app: App,
  name: string,
  filepath: string
): Promise<string> => {
  const content = await fs.promises.readFile(filepath, {
    encoding: 'utf-8',
  })

  const componentName = name
    .split('-')
    .map((s) => {
      return s[0].toUpperCase() + s.slice(1)
    })
    .join('')

  const optimized = optimize(content, config)

  const tempIcon = `icons/${componentName}.vue`

  await app.writeTemp(
    tempIcon,
    `
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: '${componentName}',
})
</script>
<template>
  ${optimized.data}
</template>
`
  )
  return app.dir.temp(tempIcon)
}

export const prepareClientConfigFile = async (
  app: App,
  options: Required<RegisterIconsPluginOptions>,
  identifier: string
): Promise<string> => {
  // get icons from directory
  const iconsFromDir = await getIconsFromDir(options)

  // icons from options will override icons from dir
  // if they have the same component name
  const iconsMap = await Object.entries({
    ...iconsFromDir,
    ...options.icons,
  }).reduce<Promise<Record<string, string>>>(async (result, [key, value]) => {
    const result0 = await result

    if (path.extname(value) === '.svg') {
      result0[key] = await generateIconComponent(app, key, value)
    } else {
      result0[key] = value
    }
    return new Promise((resolve) => resolve(result0))
  }, new Promise((resolve) => resolve({})))

  // client app enhance file content
  const content = `\
import { defineComponent } from 'vue'

export default {
  enhance: async ({ app }) => {\
    ${Object.entries(iconsMap).map(
      ([name, filepath]) => `
      app.component(${JSON.stringify(
        (options.iconPrefix || '') + name
      )}, (await import(/* webpackChunkName: "icons" */ ${JSON.stringify(
        filepath
      )})).default)`
    )}
  },
}
`

  // write temp file and return the file path
  return app.writeTemp(`register-icons/clientConfig.${identifier}.js`, content)
}

import type { CopyrightOptions } from './options.js'

export interface CopyrightPluginFrontmatter {
  copy?:
    | Pick<
        CopyrightOptions,
        'triggerWords' | 'disableCopy' | 'disableSelection'
      >
    | boolean
}

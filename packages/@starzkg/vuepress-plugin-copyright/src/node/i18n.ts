import type { CopyrightLocaleConfig } from '../shared'

/** Multi-language config for copy code */
export const i18n: CopyrightLocaleConfig = {
  'en-US': {
    author: 'author',
    beforeAuthor: 'Copyright © ',
    afterAuthor: '\nLink: ',
  },
  'zh-CN': {
    author: '作者',
    beforeAuthor: '著作权归',
    afterAuthor: '所有。\n链接：',
  },
}

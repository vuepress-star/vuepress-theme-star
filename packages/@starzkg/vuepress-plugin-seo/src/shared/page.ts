import type { Page } from '@vuepress/core'
import type { GitData } from '@vuepress/plugin-git'
import type { SeoPageFrontmatter } from './frontmatter.js'

export declare type SeoPage = Page<{ git: GitData }, SeoPageFrontmatter>

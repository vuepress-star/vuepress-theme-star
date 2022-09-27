import { HTML_TAGS } from './html.js'
import { MATHML_TAGS } from './mathml.js'
import { SVG_TAGS } from './svg.js'

export * from './html.js'
export * from './mathml.js'
export * from './svg.js'

export const TAGS = [HTML_TAGS, SVG_TAGS, MATHML_TAGS].join()

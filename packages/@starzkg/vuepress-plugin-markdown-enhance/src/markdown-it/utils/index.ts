export * from './token.js'
export * from './parseArgs.js'

// https://spec.commonmark.org/0.30/#line-ending
export const NEWLINES_RE = /\r\n?|\n/g

export const UNESCAPE_RE = /\\([ \\!"#$%&'()*+,./:;<=>?@[\]^_`{|}~-])/gu

export const escapeHtml = (unsafeHTML: string): string =>
  unsafeHTML
    .replace(/&/gu, '&amp;')
    .replace(/</gu, '&lt;')
    .replace(/>/gu, '&gt;')
    .replace(/"/gu, '&quot;')
    .replace(/'/gu, '&#039;')

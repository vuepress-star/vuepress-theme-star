export const markdown = (): Promise<
  typeof import('reveal.js/dist/reveal.esm.js')
> =>
  import(
    /* webpackChunkName: "reveal" */ 'reveal.js/plugin/markdown/markdown.esm.js'
  )

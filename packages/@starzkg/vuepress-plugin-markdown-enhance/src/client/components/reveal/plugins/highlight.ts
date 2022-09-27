export const highlight = (): Promise<
  typeof import('reveal.js/dist/reveal.esm.js')
> =>
  import(
    /* webpackChunkName: "reveal" */ 'reveal.js/plugin/highlight/highlight.esm.js'
  )

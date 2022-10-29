export * from '../shared/index.js'
export * from './composables/index.js'
export * from './utils/index.js'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    icon?: string
    date: string
    time: number
    excerpt: string
  }
}

import { useRouter } from 'vue-router'
import type { RouteRecordNormalized } from 'vue-router'
import type { StarPageMeta } from '../../shared/index.js'
import { useResolveRouteWithRedirect } from './useResolveRouteWithRedirect.js'

const resolveRoute = (route: RouteRecordNormalized) => {
  // the route path of vue-router is url-encoded, and we expect users are using
  // non-url-encoded string in theme config, so we need to url-encode it first to
  // resolve the route correctly
  const resolved = useResolveRouteWithRedirect(route.path)
  return {
    title: resolved.meta.title || route.path,
    icon: resolved.meta.icon,
    path: resolved.name === '404' ? route.path : resolved.fullPath,
    date: resolved.meta.date || '0000-00-00',
    time: 0,
    excerpt: resolved.meta.excerpt || '',
  }
}

/**
 * Resolve PageMata props from string
 *
 * @example
 * - Input: 'v-8365d882'
 * - Output: { title: 'Home', path: '/' }
 */
export const usePageMata = (pageKey: string): StarPageMeta | undefined => {
  const router = useRouter()

  const routes = router.getRoutes()

  const route = routes.find(({ name }) => name === pageKey)

  if (!route) {
    return undefined
  }
  return resolveRoute(route)
}

export const usePagesMata = (pageKeys: string[]): StarPageMeta[] => {
  const router = useRouter()

  return router
    .getRoutes()
    .filter(({ name }) => name && pageKeys.includes(name as string))
    .map(resolveRoute)
}

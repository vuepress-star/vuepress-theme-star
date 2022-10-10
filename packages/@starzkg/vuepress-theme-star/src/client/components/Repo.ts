import { isLinkHttp } from '@vuepress/shared'
import { computed, defineComponent, h, VNode } from 'vue'
import { useThemeLocaleData } from '../composables/index.js'
import { GitHub } from '../icons/index.js'
import { resolveRepoType } from '../utils/index.js'

export default defineComponent({
  name: 'Repo',
  setup: () => {
    /**
     * Get navbar config of repository link
     */
    const themeLocale = useThemeLocaleData()

    const repo = computed(() => themeLocale.value.repo)
    const repoType = computed(() =>
      repo.value ? resolveRepoType(repo.value) : null
    )

    const repoLink = computed(() => {
      if (repo.value && !isLinkHttp(repo.value)) {
        return `https://github.com/${repo.value}`
      }

      return repo.value
    })

    const repoLabel = computed(() => {
      if (!repoLink.value) return null
      if (themeLocale.value.repoLabel) return themeLocale.value.repoLabel
      if (repoType.value === null) return 'Source'
      return repoType.value
    })

    return (): null | VNode => {
      if (!repoLink.value || !repoLabel.value) {
        return null
      }
      return h(
        'a',
        {
          'class': 'repo',
          'aria-label': repoLabel.value,
          'data-balloon-pos': 'left',
          'href': repoLink.value,
          'rel': 'noopener noreferrer',
          'target': '_blank',
        },
        h(GitHub)
      )
    }
  },
})

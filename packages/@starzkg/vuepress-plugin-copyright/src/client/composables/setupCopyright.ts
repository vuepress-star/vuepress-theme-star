import { usePageData, usePageFrontmatter } from '@vuepress/client'
import { useEventListener } from '@vueuse/core'
import { computed, onMounted, watchEffect } from 'vue'
import type { CopyrightPluginFrontmatter } from '../../shared/index.js'

declare const COPYRIGHT_SELECTOR: string
declare const COPYRIGHT_COPY: boolean
declare const COPYRIGHT_SELECTION: boolean
declare const COPYRIGHT_TRIGGER_WORDS: number

export const setupCopyright = (): void => {
  const page = usePageData<{ copyright: string }>()
  const frontmatter = usePageFrontmatter<CopyrightPluginFrontmatter>()

  const canCopy = computed(() => {
    if (frontmatter.value.copy) {
      return true
    }
    return COPYRIGHT_COPY
  })

  const canSelection = computed(() => {
    if (frontmatter.value.selection) {
      return true
    }
    return COPYRIGHT_SELECTION
  })

  const copyright = computed(() => {
    return frontmatter.value.copyright || page.value.copyright || ''
  })

  const onCopy = (event: ClipboardEvent): void => {
    const selection = getSelection()
    if (selection) {
      const textRange = selection.getRangeAt(0)

      if (!canCopy.value) {
        event.preventDefault()
        return
      }

      if (textRange.toString().length >= COPYRIGHT_TRIGGER_WORDS) {
        event.preventDefault()

        if (event.clipboardData) {
          const node = document.createElement('div')

          node.appendChild(textRange.cloneContents())

          event.clipboardData.setData(
            'text/html',
            `${node.innerHTML}<hr>
                <div class="copyright">
                  ${copyright.value.replace(/\\n/g, '<br>')}
                </div>`
          )

          event.clipboardData.setData(
            'text/plain',
            `${textRange.cloneContents().textContent || ''}\n------\n${
              copyright.value
            }`
          )
        }
      }
    }
  }

  onMounted(() => {
    const elements = document.querySelectorAll<HTMLElement>(COPYRIGHT_SELECTOR)!
    elements.forEach((element) => {
      useEventListener(element, 'copy', onCopy)
      watchEffect(() => {
        element.style.userSelect = canSelection.value ? 'auto' : 'none'
      })
    })
  })
}

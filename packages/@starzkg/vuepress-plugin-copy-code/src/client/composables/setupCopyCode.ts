import {
  Message,
  useCopyToClipboard,
} from '@starzkg/vuepress-star-shared/client'
import { useRouteLocale } from '@vuepress/client'
import type { LocaleConfig } from '@vuepress/core'
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { CopyCodeLocaleData, CopyCodeOptions } from '../../shared/index.js'

import '@starzkg/vuepress-star-shared/styles/message.scss'

declare const CODE_COPY_OPTIONS: Required<CopyCodeOptions>
declare const CODE_COPY_LOCALES: LocaleConfig<CopyCodeLocaleData>

const options = CODE_COPY_OPTIONS

const locales = CODE_COPY_LOCALES

const CHECK_ICON =
  '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#06a35a"><path d="M822.812 824.618c-83.076 81.992-188.546 124.614-316.05 127.865-122.085-3.251-223.943-45.873-305.935-127.865S76.213 640.406 72.962 518.682c3.251-127.503 45.873-232.973 127.865-316.05 81.992-83.075 184.211-126.058 305.936-129.309 127.503 3.251 232.973 46.234 316.049 129.31 83.076 83.076 126.059 188.546 129.31 316.05-2.89 121.723-46.234 223.943-129.31 305.935zM432.717 684.111c3.973 3.974 8.307 5.78 13.364 6.14 5.057.362 9.753-1.444 13.365-5.417l292.57-287.515c3.974-3.973 5.78-8.307 5.78-13.364s-1.806-9.753-5.78-13.365l1.807 1.806c-3.973-3.973-8.669-5.779-14.087-6.14-5.418-.361-10.475 1.445-14.809 5.418L460.529 592.006c-3.973 3.25-8.669 4.695-14.448 4.695-5.78 0-10.836-1.445-15.531-3.973l-94.273-72.962c-4.335-3.251-9.392-4.335-14.448-3.973s-9.392 3.25-12.642 7.585l-2.89 3.973c-3.25 4.334-4.334 9.391-3.973 14.81.722 5.417 2.528 10.113 5.779 14.086L432.717 684.11z"/></svg>'

const isMobile = (): boolean =>
  navigator
    ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/iu.test(
        navigator.userAgent
      )
    : false

const timeoutIdMap: Map<HTMLElement, NodeJS.Timeout> = new Map()

export const setupCopyCode = (): void => {
  const route = useRoute()
  const routeLocale = useRouteLocale()
  const locale = computed((): Partial<CopyCodeLocaleData> => {
    return locales[routeLocale.value] || {}
  })

  let message: Message

  const insertCopyButton = (codeBlockElement: HTMLElement): void => {
    if (!codeBlockElement.hasAttribute('copy-code-registered')) {
      const copyElement = document.createElement('button')

      copyElement.classList.add('copy')
      copyElement.innerHTML = '<div class="copy-icon" />'
      copyElement.setAttribute('aria-label', locale.value.copy || 'Copy code')
      copyElement.setAttribute('data-copied', locale.value.copied || 'Copied')

      if (options.pure) copyElement.classList.add('pure')
      else copyElement.setAttribute('data-balloon-pos', 'left')

      if (codeBlockElement.parentElement)
        codeBlockElement.parentElement.insertBefore(
          copyElement,
          codeBlockElement
        )
      codeBlockElement.setAttribute('copy-code-registered', '')
    }
  }

  const generateCopyButton = (): void => {
    const selector =
      options.selector || '.theme-default-content div[class*="language-"] pre'

    setTimeout(() => {
      if (typeof selector === 'string')
        document
          .querySelectorAll<HTMLElement>(selector)
          .forEach(insertCopyButton)
      else if (Array.isArray(selector))
        selector.forEach((item) => {
          document.querySelectorAll<HTMLElement>(item).forEach(insertCopyButton)
        })
    }, options.delay || 500)
  }

  const copy = (
    codeContainer: HTMLDivElement,
    codeContent: HTMLPreElement,
    button: HTMLButtonElement
  ): void => {
    let { innerText: text = '' } = codeContent

    if (
      // is shell
      /language-(shellscript|shell|bash|sh|zsh)/.test(
        codeContainer.classList.toString()
      )
    )
      text = text.replace(/^ *(\$|>) /gm, '')

    useCopyToClipboard(text).then(() => {
      button.classList.add('copied')
      clearTimeout(timeoutIdMap.get(button))

      const timeoutId = setTimeout(() => {
        button.classList.remove('copied')
        button.blur()
        timeoutIdMap.delete(button)
      }, 2000)

      timeoutIdMap.set(button, timeoutId)

      if (!options.pure)
        message.pop(
          `${CHECK_ICON}<span>${
            locale.value.hint || 'Copied successfully'
          } 🎉</span>`,
          options.duration
        )
    })
  }

  onMounted(() => {
    message = new Message()

    if (!isMobile() || options.showInMobile) generateCopyButton()

    window.addEventListener('click', (event) => {
      const el = event.target as HTMLElement

      if (el.matches('div[class*="language-"] > button.copy')) {
        const codeContainer = <HTMLDivElement>el.parentElement
        const preBlock = <HTMLPreElement | null>el.nextElementSibling

        if (preBlock) copy(codeContainer, preBlock, <HTMLButtonElement>el)
      } else if (el.matches('div[class*="language-"] div.copy-icon')) {
        const buttonElement = <HTMLButtonElement>el.parentElement
        const codeContainer = <HTMLDivElement>buttonElement.parentElement
        const preBlock = <HTMLPreElement | null>buttonElement.nextElementSibling

        if (preBlock) copy(codeContainer, preBlock, buttonElement)
      }
    })
  })

  watch(
    () => route.path,
    () => {
      if (!isMobile() || options.showInMobile) generateCopyButton()
    }
  )
}

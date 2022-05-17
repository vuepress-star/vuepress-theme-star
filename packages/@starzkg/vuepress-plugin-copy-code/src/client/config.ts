import {
  useCopyToClipboard,
  useLocaleConfig,
} from '@starzkg/vuepress-shared/es/client'
import { defineClientConfig } from '@vuepress/client'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import './styles/index.scss'
import 'balloon-css/balloon.css'
import { CopyCodeLocaleConfig, CopyCodeOptions } from '../shared'

declare const CODE_COPY_OPTIONS: Required<CopyCodeOptions>
declare const CODE_COPY_I18N: CopyCodeLocaleConfig

export const i18n = CODE_COPY_I18N
export const options = CODE_COPY_OPTIONS

const isMobile = (): boolean =>
  navigator
    ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/iu.test(
        navigator.userAgent
      )
    : false

export default defineClientConfig({
  setup() {
    const route = useRoute()
    const locale = useLocaleConfig(i18n)

    const insertCopyButton = (codeBlockElement: HTMLElement): void => {
      if (!codeBlockElement.hasAttribute('copy-code-registerd')) {
        const copyElement = document.createElement('button')
        copyElement.className = 'copy-code-button'
        copyElement.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="icon-copy-code"><path fill="currentColor" d="M384 112v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h80c0-35.29 28.71-64 64-64s64 28.71 64 64h80c26.51 0 48 21.49 48 48zM192 40c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24m96 114v-20a6 6 0 00-6-6H102a6 6 0 00-6 6v20a6 6 0 006 6h180a6 6 0 006-6z" /></svg>'

        copyElement.addEventListener('click', () => {
          useCopyToClipboard(codeBlockElement.innerText)
        })

        copyElement.setAttribute('aria-label', locale.value.hint)
        copyElement.setAttribute('data-balloon-pos', 'left')

        if (codeBlockElement.parentElement)
          codeBlockElement.parentElement.insertBefore(
            copyElement,
            codeBlockElement
          )
        codeBlockElement.setAttribute('copy-code-registerd', '')
      }
    }

    const genCopyButton = (): void => {
      const selector =
        options.selector || '.theme-default-content div[class*="language-"] pre'

      setTimeout(() => {
        if (typeof selector === 'string') {
          document
            .querySelectorAll<HTMLElement>(selector)
            .forEach(insertCopyButton)
        } else if (Array.isArray(selector))
          selector.forEach((item) => {
            document
              .querySelectorAll<HTMLElement>(item)
              .forEach(insertCopyButton)
          })
      }, options.delay || 500)
    }

    onMounted(() => {
      if (!isMobile() || options.showInMobile) genCopyButton()
    })

    watch(
      () => route.path,
      () => {
        if (!isMobile() || options.showInMobile) genCopyButton()
      }
    )
  },
})

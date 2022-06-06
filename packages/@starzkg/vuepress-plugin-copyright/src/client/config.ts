import Clipboard from '@clipboardComponent'
import { defineClientConfig } from '@vuepress/client'
import { createApp, h } from 'vue'
import type { CopyrightLocaleConfig, CopyrightOptions } from '../shared'

declare const COPYRIGHT_OPTIONS: Required<CopyrightOptions>
declare const COPYRIGHT_I18N: CopyrightLocaleConfig
declare global {
  interface Window {
    clipboardData: DataTransfer
  }
}

export const i18n = COPYRIGHT_I18N
export const options = COPYRIGHT_OPTIONS
export default defineClientConfig({
  enhance: ({ app }) => {
    app.mixin({
      data: () => ({
        isElement: false,
      }),

      watch: {
        isElement(value) {
          if (!value) return

          let { copyright = !options.disabled } = this.$frontmatter
          if (!copyright) return

          if (typeof copyright !== 'object') {
            copyright = {}
          }

          const noSelect = copyright.noSelect || options.noSelect
          this.minLength = copyright.minLength || options.minLength
          this.noCopy = copyright.noCopy || options.noCopy

          if (noSelect) {
            this.$el.style.userSelect = 'none'
          } else {
            this.$el.addEventListener('copy', this.onCopy)
          }
        },
      },

      created() {
        this.onCopy = (event) => {
          const textRange = getSelection()!.getRangeAt(0)
          if (String(textRange).length < this.minLength) return

          event.preventDefault()
          if (this.noCopy) return

          const node = document.createElement('div')
          node.appendChild(getSelection()!.getRangeAt(0).cloneContents())

          const lang = this.$lang
          const instance = createApp({
            render: () =>
              h(Clipboard, {
                html: node.innerHTML,
                lang,
              }),
          }).mount(document.createElement('div'))

          const { innerHTML, innerText } = instance.$el
          if (event.clipboardData) {
            event.clipboardData.setData('text/html', innerHTML)
            event.clipboardData.setData('text/plain', innerText)
          } else if (window.clipboardData) {
            window.clipboardData.setData('text', innerText)
          }
        }
      },

      updated() {
        this.isElement = this.$el.nodeName !== '#comment'
      },

      beforeUnmount() {
        this.$el.removeEventListener('copy', this.onCopy)
      },
    })
  },
})

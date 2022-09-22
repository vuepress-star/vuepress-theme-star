<script>
import Typed from 'typed.js'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VueTypedJs',
  props: {
    strings: {
      type: Array,
      required: false,
      default: function () {
        return ['Hello World!']
      },
    },
    stringsElement: {
      type: String,
      required: false,
      default: null,
    },
    typeSpeed: {
      type: Number,
      required: false,
      default: 50,
    },
    startDelay: {
      type: Number,
      required: false,
      default: 0,
    },
    backSpeed: {
      type: Number,
      required: false,
      default: 30,
    },
    smartBackspace: {
      type: Boolean,
      required: false,
      default: true,
    },
    shuffle: {
      type: Boolean,
      required: false,
      default: false,
    },
    backDelay: {
      type: Number,
      required: false,
      default: 700,
    },
    fadeOut: {
      type: Boolean,
      required: false,
      default: false,
    },
    fadeOutClass: {
      type: String,
      required: false,
      default: 'typed-fade-out',
    },
    fadeOutDelay: {
      type: Number,
      required: false,
      default: 500,
    },
    loop: {
      type: Boolean,
      required: false,
      default: false,
    },
    loopCount: {
      type: Number,
      required: false,
      default: Infinity,
    },
    showCursor: {
      type: Boolean,
      required: false,
      default: true,
    },
    cursorChar: {
      type: String,
      required: false,
      default: '|',
    },
    autoInsertCss: {
      type: Boolean,
      required: false,
      default: true,
    },
    attr: {
      type: String,
      required: false,
      default: null,
    },
    bindInputFocusEvents: {
      type: Boolean,
      required: false,
      default: false,
    },
    contentType: {
      type: String,
      required: false,
      default: 'html',
    },
  },
  emits: [
    'onStart',
    'onComplete',
    'preStringTyped',
    'onStringTyped',
    'onLastStringBackspaced',
    'onTypingPaused',
    'onTypingResumed',
    'onReset',
    'onStop',
    'onDestroy',
  ],
  data() {
    return {
      typedObj: null,
    }
  },
  mounted: function () {
    this.initTypedJS()
  },
  updated() {
    if (this.typedObj !== undefined) {
      this.typedObj.destroy()
      this.initTypedJS()
    }
  },
  methods: {
    getEventHandlers() {
      return {
        onComplete: () => {
          this.$emit('onComplete')
        },
        preStringTyped: () => {
          this.$emit('preStringTyped')
        },
        onStringTyped: () => {
          this.$emit('onStringTyped')
        },
        onLastStringBackspaced: () => {
          this.$emit('onLastStringBackspaced')
        },
        onTypingPaused: () => {
          this.$emit('onTypingPaused')
        },
        onTypingResumed: () => {
          this.$emit('onTypingResumed')
        },
        onReset: () => {
          this.$emit('onReset')
        },
        onStop: () => {
          this.$emit('onStop')
        },
        onStart: () => {
          this.$emit('onStart')
        },
        onDestroy: () => {
          this.$emit('onDestroy')
        },
      }
    },
    throwError: function (message) {
      throw new TypeError(message)
    },
    initTypedJS: function () {
      const typedConfig = this.$props
      this.typedObj = new Typed(this.$refs.typedElement, {
        ...this.getEventHandlers(),
        ...typedConfig,
      })
    },
  },
})
</script>

<template>
  <div class="typed">
    <span ref="typedElement"></span>
  </div>
</template>

<style lang="scss">
.typed {
  display: flex;
  align-items: center;

  .typed-cursor {
    opacity: 1;
    animation: typedjsBlink 0.7s infinite;
  }
}

@keyframes typedjsBlink {
  50% {
    opacity: 0;
  }
}
</style>

<script lang="ts">
/* eslint-disable import/first, import/no-duplicates, import/order */
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TabNav',
})
</script>

<script lang="ts" setup>
import type { PropType, VNode } from 'vue'

const props = defineProps({
  panes: {
    type: Array as PropType<VNode[]>,
    default: () => [],
  },
  activeIndex: {
    type: Number,
    default: 0,
  },
})

const emits = defineEmits(['tabClick'])

// activate next tab
const activateNext = (i = props.activeIndex): void => {
  if (i < props.panes?.length - 1) {
    emits('tabClick', props.panes[i + 1], i + 1)
  } else {
    emits('tabClick', props.panes[0], 0)
  }
}

// activate previous tab
const activatePrev = (i = props.activeIndex): void => {
  if (i > 0) {
    emits('tabClick', props.panes[i - 1], i - 1)
  } else {
    emits(
      'tabClick',
      props.panes[props.panes?.length - 1],
      props.panes?.length - 1
    )
  }
}

// handle keyboard event
const keyboardHandler = (event: KeyboardEvent, i: number): void => {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault()
    emits('tabClick', props.panes[i], i)
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    activateNext(i)
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault()
    activatePrev(i)
  }
}
</script>

<template>
  <div class="tabs__nav">
    <ul class="tabs__ul">
      <li v-for="(pane, i) in panes" :key="i" class="tabs__li">
        <button
          :class="{
            'tabs__nav-tab': true,
            'tabs__nav-tab-active': activeIndex === i,
          }"
          :aria-pressed="activeIndex === i"
          :aria-expanded="activeIndex === i"
          @click="(e) => $emit('tabClick', pane, i, e)"
          @Keydown="(e) => keyboardHandler(e, i)"
        >
          {{ pane.props.title }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>

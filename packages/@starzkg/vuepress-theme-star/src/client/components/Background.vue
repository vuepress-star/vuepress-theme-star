<script lang="ts">
/* eslint-disable import/first, import/no-duplicates, import/order */
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Background',
})
/* eslint-enable import/order */
</script>

<script setup lang="ts">
import { nextTick, onMounted } from 'vue'

onMounted(() => {
  nextTick(() => {
    const renderCanvas = document.getElementById(
      'vuepress-canvas-hack'
    ) as HTMLCanvasElement
    const yPositions: number[] = Array(500)
    for (let i = 0; i < 500; i++) {
      yPositions[i] = 0
    }
    let width = (renderCanvas.width = window.innerWidth)
    let height = (renderCanvas.height = window.innerHeight)
    const ctx = renderCanvas.getContext('2d')
    if (ctx != null) {
      setInterval(() => {
        ctx.fillStyle = 'rgba(0,0,0,0.05)'
        ctx.fillRect(0, 0, width, height)
        ctx.fillStyle = 'green'
        ctx.font = '10pt Georgia'

        // eslint-disable-next-line array-callback-return
        yPositions.map((y, index) => {
          const text = String.fromCharCode(1e2 + Math.random() * 33)
          const x = index * 10 + 10
          ctx.fillText(text, x, y)
          if (y > Math.random() * 1e4) {
            yPositions[index] = 0
          } else {
            yPositions[index] = y + 10
          }
        })
      }, 30)
    }
    window.addEventListener('resize', () => {
      width = renderCanvas.width = window.innerWidth
      height = renderCanvas.height = window.innerHeight
    })
  })
})
</script>

<template>
  <div class="background">
    <canvas id="vuepress-canvas-hack"></canvas>
  </div>
</template>

<style scoped></style>

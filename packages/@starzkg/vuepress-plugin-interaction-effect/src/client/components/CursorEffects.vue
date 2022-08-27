<script lang="ts">
import { defineComponent } from 'vue'
import { Boom } from '../utils/mouse/index.js'

interface CursorEffect {
  shape: string
  size: number
  zIndex: number
  computerCanvas: HTMLCanvasElement | null
  renderCanvas: HTMLCanvasElement | null
  computerContext: CanvasRenderingContext2D | null
  renderContext: CanvasRenderingContext2D | null
  clientSize: { width: number; height: number }
  resizeTimeout: number
  booms: Boom[]
  running: boolean
}

export default defineComponent({
  name: 'CursorEffects',
  data() {
    return {
      shape: 'star',
      size: 2,
      zIndex: 99999999,
      computerCanvas: null,
      renderCanvas: null,
      computerContext: null,
      renderContext: null,
      clientSize: { width: 0, height: 0 },
      resizeTimeout: -1,
      booms: [],
      running: false,
    } as CursorEffect
  },
  mounted() {
    this.computerCanvas = document.createElement('canvas')
    this.renderCanvas = document.getElementById(
      'vuepress-canvas-cursor'
    ) as HTMLCanvasElement

    this.computerContext = this.computerCanvas.getContext('2d')
    this.renderContext = this.renderCanvas.getContext('2d')

    this.clientSize.width = window.innerWidth
    this.clientSize.height = window.innerHeight

    this.init()
  },

  methods: {
    init() {
      if (this.renderCanvas !== null && this.computerCanvas !== null) {
        this.setStyle(this.renderCanvas.style)
        this.renderCanvas.width = this.computerCanvas.width =
          this.clientSize.width
        this.renderCanvas.height = this.computerCanvas.height =
          this.clientSize.height
        this.makeHighRes(this.renderCanvas, this.renderContext)
        this.makeHighRes(this.computerCanvas, this.computerContext)
      }

      window.addEventListener('mousedown', this.handleMouseDown)
      window.addEventListener('pagehide', this.handlePageHide)
      window.addEventListener('resize', this.handleResize)
    },

    setStyle(style) {
      style.position = 'fixed'
      style.top = 0
      style.left = 0
      style.zIndex = this.zIndex
      style.pointerEvents = 'none'
      style.width = this.clientSize.width
      style.height = this.clientSize.height
    },

    makeHighRes(canvas, ctx) {
      const dpr = window.devicePixelRatio || 1

      const oldWidth = canvas.width
      const oldHeight = canvas.height

      canvas.width = Math.round(oldWidth * dpr)
      canvas.height = Math.round(oldHeight * dpr)
      canvas.style.width = oldWidth + 'px'
      canvas.style.height = oldHeight + 'px'

      ctx.scale(dpr, dpr)
    },

    handleMouseDown(e) {
      if (this.computerContext !== null) {
        const origin = { x: e.clientX, y: e.clientY }
        const boom = new Boom(
          origin,
          this.computerContext,
          this.size,
          this.shape,
          10,
          this.clientSize
        )
        boom.init()
        this.booms.push(boom)
        this.running || this.run()
      }
    },

    handlePageHide() {
      this.booms = []
      this.running = false
    },

    handleResize() {
      if (this.resizeTimeout != null) {
        clearTimeout(this.resizeTimeout)
      }
      this.resizeTimeout = Number(
        setTimeout(() => {
          this.clientSize.width = window.innerWidth
          this.clientSize.height = window.innerHeight
          if (this.renderCanvas !== null && this.computerCanvas !== null) {
            this.renderCanvas.width = this.computerCanvas.width =
              this.clientSize.width
            this.renderCanvas.height = this.computerCanvas.height =
              this.clientSize.height
          }

          this.makeHighRes(this.renderCanvas, this.renderContext)
          this.makeHighRes(this.computerCanvas, this.computerContext)
        }, 500)
      )
    },

    run() {
      this.running = true
      if (this.booms.length === 0) {
        return (this.running = false)
      }

      requestAnimationFrame(this.run)
      if (this.renderContext !== null && this.computerContext !== null) {
        this.computerContext.clearRect(
          0,
          0,
          this.clientSize.width,
          this.clientSize.height
        )
        this.renderContext.clearRect(
          0,
          0,
          this.clientSize.width,
          this.clientSize.height
        )

        this.booms.forEach((boom, index) => {
          if (boom.stop) {
            this.booms.splice(index, 1)
            return
          }
          boom.move()
          boom.draw()
        })
        if (this.computerCanvas !== null) {
          this.renderContext.drawImage(
            this.computerCanvas,
            0,
            0,
            this.clientSize.width,
            this.clientSize.height
          )
        }
      }
    },
  },
})
</script>

<template>
  <canvas id="vuepress-canvas-cursor"></canvas>
</template>

import type { default as StateInline } from 'markdown-it/lib/rules_inline/state_inline.js'

export const parseArgs = (
  state: StateInline,
  start: number,
  disableNested?: boolean
): number => {
  let level
  let found
  let marker
  let prevPos
  let labelEnd = -1
  const max = state.posMax
  const oldPos = state.pos

  state.pos = start + 1
  level = 1

  while (state.pos < max) {
    marker = state.src.charCodeAt(state.pos)
    if (marker === 0x7d /* } */) {
      level--
      if (level === 0) {
        found = true
        break
      }
    }

    prevPos = state.pos
    state.md.inline.skipToken(state)
    if (marker === 0x7b /* { */) {
      if (prevPos === state.pos - 1) {
        // increase level if we find text `}`, which is not a part of any token
        level++
      } else if (disableNested) {
        state.pos = oldPos
        return -1
      }
    }
  }

  if (found) {
    labelEnd = state.pos
  }

  // restore old state
  state.pos = oldPos

  return labelEnd
}

import type { PluginWithOptions } from 'markdown-it'
import type { default as StateCore } from 'markdown-it/lib/rules_core/state_core.js'
import { default as Token } from 'markdown-it/lib/token.js'
import {
  getParentTokenIndex,
  isInlineToken,
  isListItemToken,
  isParagraphToken,
  setTokenAttr,
} from '../utils/index.js'

export interface TaskListOptions {
  /**
   * 是否禁用 checkbox
   *
   * Whether disable checkbox
   *
   * @default true
   */
  disabled?: boolean

  /**
   * Whether use `<label>` to wrap text
   *
   * 是否使用 `<label>` 来包裹文字
   *
   * @default true
   */
  label?: boolean

  /**
   * Whether place `<label>` after `<input>` or wrap `<input>`
   *
   * 是否将 `<label>` 放置在 `<input>` 后还是包裹住 `<input>`
   *
   * @default true
   */
  labelAfter?: boolean
}

interface TaskListEnv {
  taskLists: number
}

interface TaskListStateCore extends StateCore {
  env: TaskListEnv
}
// The leading whitespace in a list item (token.content) is already trimmed off by markdown-it.
// The regex below checks for '[ ] ' or '[x] ' or '[X] ' at the start of the string token.content,
// where the space is either a normal space or a non-breaking space (character 160 = \u00A0).
const startsWithTodoMarkdown = (token: Token): boolean =>
  /^\[[xX \u00A0]\][ \u00A0]/.test(token.content)

const isTaskListItem = (tokens: Token[], index: number): boolean =>
  isInlineToken(tokens[index]) &&
  isParagraphToken(tokens[index - 1]) &&
  isListItemToken(tokens[index - 2]) &&
  startsWithTodoMarkdown(tokens[index])

const generateCheckbox = (token: Token, id: string, disabled = true): Token => {
  const checkbox = new Token('checkbox_input', 'input', 0)

  checkbox.attrs = [
    ['type', 'checkbox'],
    ['class', 'task-list-item-checkbox'],
    ['id', id],
  ]

  // if token.content starts with '[x] ' or '[X] '
  if (/^\[[xX]\][ \u00A0]/.test(token.content))
    checkbox.attrs.push(['checked', 'checked'])

  if (disabled) checkbox.attrs.push(['disabled', 'disabled'])

  return checkbox
}

const beginLabel = (id: string): Token => {
  const label = new Token('label_open', 'label', 1)

  label.attrs = [
    ['class', 'task-list-item-label'],
    ['for', id],
  ]

  return label
}

const endLabel = (): Token => new Token('label_close', 'label', -1)

const todoify = (
  token: Token,
  state: TaskListStateCore,
  options: Required<TaskListOptions>
): void => {
  const id = `task-item-${state.env.taskLists++}`

  token.children = token.children || []

  // remove the checkbox syntax letter
  token.children[0].content = token.children[0].content.slice(3)

  if (options.label) {
    // add label
    token.children.unshift(beginLabel(id))
    token.children.push(endLabel())
  }
  // checkbox
  token.children.unshift(generateCheckbox(token, id, options.disabled))
}

export const taskList: PluginWithOptions<TaskListOptions> = (
  md,
  { disabled = true, label = true, labelAfter = true } = {}
) => {
  md.core.ruler.after('inline', 'task-lists', (state: TaskListStateCore) => {
    const tokens = state.tokens

    if (!state.env.taskLists) state.env.taskLists = 0

    for (let i = 2; i < tokens.length; i++) {
      if (isTaskListItem(tokens, i)) {
        todoify(tokens[i], state, { disabled, label, labelAfter })
        setTokenAttr(tokens[i - 2], 'class', 'task-list-item')
        setTokenAttr(
          tokens[getParentTokenIndex(tokens, i - 2)],
          'class',
          'task-list-container'
        )
      }
    }

    return true
  })
}

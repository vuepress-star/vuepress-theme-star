import chalk from 'chalk'
import ora from 'ora'
import type { Ora } from 'ora'
import { dayjs } from '../shared/index.js'

const colors: string[] = [
  '#FF0000',
  '#FF7F00',
  '#FFFF00',
  '#00FF00',
  '#00FFFF',
  '#0000FF',
  '#8B00FF',
]

export const createLogger = (
  name: string,
  color: string = colors[Math.floor(Math.random() * 7)]
): Ora => {
  return ora({
    prefixText: () =>
      chalk.hex(color)(
        `[${dayjs().format('YYYY-MM-DD HH:mm:ss,SSS')}] ${name || ''}: `
      ),
  })
}

import chalk from 'chalk'
import ora from 'ora'
import type { Ora } from 'ora'
import { dayjs } from '../shared/index.js'

/**
 * Shell Logger
 */
export class Logger {
  private instance: Ora

  private static colors: string[] = [
    '#FF0000',
    '#FF7F00',
    '#FFFF00',
    '#00FF00',
    '#00FFFF',
    '#0000FF',
    '#8B00FF',
  ]

  private constructor(
    /**
     * Plugin name
     */
    private name = ''
  ) {
    const color = Logger.colors[Math.floor(Math.random() * 7)]
    this.instance = ora({
      prefixText: chalk.hex(color)(`${this.name}: `) || '',
    })
  }

  public static create(
    /**
     * Plugin name
     */
    name = ''
  ): Logger {
    return new Logger(name)
  }

  /**
   * Trigger current instance to loading state or create a new loading spinner with hint text
   *
   * @param text Loading hint text
   * @returns Ora Instance
   */
  load(text = ''): Ora {
    return this.instance.start(
      `[${dayjs().format('YYYY-MM-DD HH:mm:ss,SSS')}]  ${text}`
    )
  }

  /**
   * Trigger current instance to info state or create a new info icon with hint text
   *
   * @param text Loading hint text
   * @returns Ora Instance
   */
  info(text = ''): Ora {
    return this.instance.info(
      `[${dayjs().format('YYYY-MM-DD HH:mm:ss,SSS')}]  ${text}`
    )
  }

  /**
   * Trigger current instance to success state or create a new success icon with hint text
   *
   * @param text Loading hint text
   * @returns Ora Instance
   */
  succeed(text = ''): Ora {
    return this.instance.succeed(
      `[${dayjs().format('YYYY-MM-DD HH:mm:ss,SSS')}]  ${text}`
    )
  }

  /**
   * Trigger current instance to warn state or create a new warn icon with hint text
   *
   * @param text Loading hint text
   * @returns Ora Instance
   */
  warn(text = ''): Ora {
    return this.instance.warn(
      `[${dayjs().format('YYYY-MM-DD HH:mm:ss,SSS')}]  ${text}`
    )
  }

  /**
   * Trigger current instance to warn state or create a new warn icon with hint text
   *
   * @param text Loading hint text
   * @returns Ora Instance
   */
  error(text = ''): Ora {
    return this.instance.fail(
      `[${dayjs().format('YYYY-MM-DD HH:mm:ss,SSS')}]  ${text}`
    )
  }
}

import chalk from 'chalk'
import ora from 'ora'

/**
 * Shell Logger
 */
export class Logger {
  private instance: ora.Ora

  private static colors: string[] = [
    '#FF0000',
    '#FF7F00',
    '#FFFF00',
    '#00FF00',
    '#00FFFF',
    '#0000FF',
    '#8B00FF',
  ]

  constructor(
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

  /**
   * Trigger current instance to loading state or create a new loading spinner with hint text
   *
   * @param text Loading hint text
   * @returns Ora Instance
   */
  load(text = ''): ora.Ora {
    return this.instance.start(text)
  }

  /**
   * Trigger current instance to info state or create a new info icon with hint text
   *
   * @param text Loading hint text
   * @returns Ora Instance
   */
  info(text = ''): ora.Ora {
    return this.instance.info(text)
  }

  /**
   * Trigger current instance to success state or create a new success icon with hint text
   *
   * @param text Loading hint text
   * @returns Ora Instance
   */
  succeed(text = ''): ora.Ora {
    return this.instance.succeed(text)
  }

  /**
   * Trigger current instance to warn state or create a new warn icon with hint text
   *
   * @param text Loading hint text
   * @returns Ora Instance
   */
  warn(text = ''): ora.Ora {
    return this.instance.warn(text)
  }

  /**
   * Trigger current instance to warn state or create a new warn icon with hint text
   *
   * @param text Loading hint text
   * @returns Ora Instance
   */
  error(text = ''): ora.Ora {
    return this.instance.fail(text)
  }
}

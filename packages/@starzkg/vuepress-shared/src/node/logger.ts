import chalk from 'chalk'
import ora, { Ora } from 'ora'

export class Logger {
  private currentInstance: Ora | null = ora()
  constructor(private name = '') {}

  create(text: string): Ora {
    this.currentInstance = ora({
      prefixText: chalk.blue(`${this.name}: `) || '',
      text,
    })

    return this.currentInstance
  }

  update(text: string): void {
    if (this.currentInstance) this.currentInstance.text = text
    else this.create(text)
  }

  load(text = ''): Ora {
    return (!text && this.currentInstance
      ? this.currentInstance
      : this.create(text)
    ).start()
  }

  info(text = ''): Ora {
    return (!text && this.currentInstance
      ? this.currentInstance
      : this.create(text)
    ).info()
  }

  success(text = ''): Ora {
    return (!text && this.currentInstance
      ? this.currentInstance
      : this.create(text)
    ).succeed()
  }

  warn(text = ''): Ora {
    return (!text && this.currentInstance
      ? this.currentInstance
      : this.create(text)
    ).warn()
  }

  error(text = ''): Ora {
    return (!text && this.currentInstance
      ? this.currentInstance
      : this.create(text)
    ).fail()
  }
}

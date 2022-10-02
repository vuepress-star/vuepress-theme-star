import { dirname } from 'path'
import { chalk, fs, logger } from '@vuepress/utils'

export const outputFile = async (
  pathname: string,
  content: string
): Promise<void> => {
  await fs.ensureDir(dirname(pathname))
  await fs.outputFile(pathname, content)
  logger.info(`file generated and saved to ${chalk.cyan(pathname)}`)
}

import { chalk, fs, path, withSpinner } from '@vuepress/utils'

export const outputFile = async (
  pathname: string,
  content: string
): Promise<void> =>
  withSpinner(
    `Generating feed ${chalk.cyan(path.basename(pathname))} on ${chalk.cyan(
      pathname
    )}`
  )(async () => {
    await fs.ensureDir(path.dirname(pathname))
    await fs.outputFile(pathname, content)
  })

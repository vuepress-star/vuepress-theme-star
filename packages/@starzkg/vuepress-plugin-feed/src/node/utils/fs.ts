import { chalk, fs, path, withSpinner } from '@vuepress/utils'

export const outputFile = async (
  pathname: string,
  content: string
): Promise<void> =>
  withSpinner(
    `Generating feed ${chalk.cyan(path.basename(pathname))} on ${chalk.cyan(
      pathname
    )}`
  )(async (spinner) => {
    spinner?.start(`create file ${chalk.cyan(path.basename(pathname))}`)
    await fs.ensureDir(path.dirname(pathname))
    spinner?.start(`write file ${chalk.cyan(path.basename(pathname))}`)
    await fs.outputFile(pathname, content)
    spinner?.succeed(
      `Generating feed ${chalk.cyan(path.basename(pathname))} on ${chalk.cyan(
        pathname
      )} success`
    )
  })

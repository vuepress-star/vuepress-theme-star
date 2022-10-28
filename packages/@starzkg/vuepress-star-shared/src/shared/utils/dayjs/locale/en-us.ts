// English [en-us]
import dayjs from 'dayjs'
import type { Locale } from './locale.js'

export const locale: Partial<Locale> = {
  name: 'en-us',
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
    '_'
  ),
  months:
    'January_February_March_April_May_June_July_August_September_October_November_December'.split(
      '_'
    ),
}

dayjs.locale('en-us', locale)

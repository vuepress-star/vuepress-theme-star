import { default as dayjs } from 'dayjs'
import duration from 'dayjs/plugin/duration.js'
import localeData from 'dayjs/plugin/localeData.js'
import localizedFormat from 'dayjs/plugin/localizedFormat.js'
import objectSupport from 'dayjs/plugin/objectSupport.js'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'
import weekYear from 'dayjs/plugin/weekYear.js'
import './locale/de-at.js'
import './locale/de.js'
import './locale/en-us.js'
import './locale/es.js'
import './locale/fr.js'
import './locale/pl.js'
import './locale/pt-br.js'
import './locale/ru.js'
import './locale/sk.js'
import './locale/uk.js'
import './locale/vi.js'
import './locale/zh.js'
import './locale/zh-cn.js'
import './locale/zh-tw.js'
import './locale/ja.js'

dayjs.extend(duration)
dayjs.extend(localeData)
dayjs.extend(localizedFormat)
dayjs.extend(objectSupport)
dayjs.extend(relativeTime)
dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(weekYear)

export { dayjs }

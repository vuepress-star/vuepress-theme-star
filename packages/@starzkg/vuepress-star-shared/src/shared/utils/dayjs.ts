import Dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration.js'
import localizedFormat from 'dayjs/plugin/localizedFormat.js'
import objectSupport from 'dayjs/plugin/objectSupport.js'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'
import weekYear from 'dayjs/plugin/weekYear.js'

Dayjs.extend(duration)
Dayjs.extend(localizedFormat)
Dayjs.extend(objectSupport)
Dayjs.extend(relativeTime)
Dayjs.extend(utc)
Dayjs.extend(timezone)
Dayjs.extend(weekYear)

export const dayjs = Dayjs

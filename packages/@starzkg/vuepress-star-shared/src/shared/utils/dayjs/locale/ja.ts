import dayjs from 'dayjs'
import { locale } from './ja-jp.js'

dayjs.locale('ja', { ...locale, name: 'ja' })

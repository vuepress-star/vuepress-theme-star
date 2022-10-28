import dayjs from 'dayjs'
import { locale } from './zh-cn.js'

dayjs.locale('zh', { ...locale, name: 'zh' })

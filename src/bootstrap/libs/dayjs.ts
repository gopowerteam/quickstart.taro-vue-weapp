import * as dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear' // import plugin
import isToday from 'dayjs/plugin/isToday'

import 'dayjs/locale/zh-cn' // import locale

export default () => {
    dayjs.extend(isLeapYear) // use plugin
    dayjs.extend(isToday)
    dayjs.locale('zh-cn') // us
}

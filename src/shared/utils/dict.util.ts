import * as dictData from '@/config/dict.config'

/**
 * 字典转换
 * @param value
 * @param code 字典名称
 */
export default function (value, code, defaultValue): string {
    try {
        const target = dictData[code] as any[]
        const { label } = target.find((x) => x.value === value)
        return label
    } catch (ex) {
        return defaultValue
    }
}

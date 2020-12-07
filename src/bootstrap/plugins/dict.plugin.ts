import dictUtil from '@/shared/utils/dict.util'
import * as dict from '@/config/dict.config'

export default {
    install: (app, options) => {
        const dictPlugin = Object.assign(dict, { filter: dictUtil })
        app.config.globalProperties.$dict = dictPlugin
    }
}

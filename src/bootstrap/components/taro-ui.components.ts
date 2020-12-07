import { AtButton } from 'taro-ui-vue3'
import { App } from 'vue'

/**
 * 注册TaroUI组件
 * @param app
 */
export const registerTaroUIComponents = (app: App) => {
    app.component('at-button', AtButton)

}

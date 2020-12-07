import  { App } from 'vue'
import components from '@/bootstrap/components'

/**
 * 注册组件
 */
export const componentsBoot = async (app: App<Element>) => {
    Object.entries(components).forEach(([name, registerComponent]) => {
        registerComponent(app)
    })
}

import { App } from 'vue'

import {
    libsBoot,
    httpBoot,
    guardBoot,
    pluginBoot,
    launchBoot,
    componentsBoot
} from './boots'

export const bootstrap = (app: App<Element>) => {
    // 初始化第三方库
    libsBoot()
    // 网络初始化
    httpBoot()
    // 路由守卫
    // guardBoot()
    // 安装插件
    pluginBoot(app)
    // 安装组件
    componentsBoot(app)
    // 执行启动逻辑
    launchBoot()
}

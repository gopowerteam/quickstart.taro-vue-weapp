import { App } from 'vue'
import PageContainer from '@/shared/components/page-container.vue'

export const registerGlobalComponents = (app: App) => {
    app.component('page-container', PageContainer)
}

import { WechatUtil } from '@/shared/utils/wechat.util'
import { ref } from 'vue'
import {
    NavigationGuardNext,
    RouteLocationNormalized,
    Router
} from 'vue-router'
import { useStore } from '@/store'
import { GuardAction, GuardType } from '../boots'
const store = useStore()
/**
 * 安装后置角色守卫
 */
export default {
    type: 'after',
    guard: async function (
        {
            router
        }: {
            router: Router
        },
        {
            to,
            from
        }: {
            to: RouteLocationNormalized
            from: RouteLocationNormalized
        }
    ) {
        const target = store.state.pages.find((x) => x.name === to.name)
        if (target) {
            document.title = target.title
        }
    }
} as { guard: GuardAction; type: GuardType }

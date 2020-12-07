import guards from '@/bootstrap/guards'

const RouterGuards:any[] = []

/**
 * 守卫注册
 * @param param0
 */
export function registerGuard({
    guard,
    type
}) {
    RouterGuards.push({
        type,
        guard
    })
}

/**
 * 安装路由守卫
 */
export const guardBoot = () => {
    // // 注册路由前置守卫
    // router.beforeEach(routerBeforeEach(router))
    // // 注册路由后置守卫
    // router.afterEach(routerAfterEach(router))
    // 安装路由守卫
    guards.forEach((guard) => {
        registerGuard(guard)
    })
}

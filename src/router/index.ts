// 全局路由表
const routes: routerPageOption[] = []

// 创建路由参数
interface createRoutesOption {
    package: {
        path: string
        root?: boolean
    }
    pages: routerPageOption[]
}

// 路由页面参数
interface routerPageOption {
    name: string
    path: string
    meta: {
        auth: boolean
    }
}

interface IPageConfig {
    pages: string[]
    subpackages: {
        root: string
        pages: string[]
    }[]
}

/**
 * 创建模块路由
 * @param param
 */
export function createRoutes({
    package: { path, root },
    pages
}: createRoutesOption) {
    const config: IPageConfig = {
        pages: [],
        subpackages: []
    }

    const subpackage: { root: string; pages: string[] } = {
        root: `/packages/${path}`,
        pages: []
    }

    pages.forEach((page) => {
        // 页面路径
        const pagePath = `/packages/${path}/${page.path}`
        // 注册路由元素
        registerRoute(page, pagePath)

        if (root) {
            config.pages.push(pagePath)
        } else {
            subpackage.pages.push(page.path)
        }
    })

    // 非主包则添加分包模块
    if (!root) {
        config.subpackages.push(subpackage)
    }

    return config
}

/**
 * 注册路由
 * @param packagePath
 * @param page
 */
export function registerRoute(page, fullPath) {
    routes.push(
        Object.assign(page, {
            fullPath
        })
    )
}

export function createPageConfig(packages: IPageConfig[]) {
    return {
        pages: packages.filter((x) => x.pages).flat(),
        subpackages: packages.filter((x) => x.subpackages).flat()
    }
}

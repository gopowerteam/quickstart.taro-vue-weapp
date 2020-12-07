import { createRoutes } from '@/router'

export default createRoutes({
    package: {
        root: true,
        path: 'index'
    },
    pages: [
        {
            name: 'index',
            path: 'index/index',
            meta: {
                auth: true
            }
        }
    ]
})

const path = require('path')
const fs = require('fs')

const PACKAGE_ROOT = path.join(__dirname, '..', 'src', 'packages')
const PACKAGE_DEFAULT_NAME = 'index'

/**
 * 生成Page数据
 * @param {*} package
 */
function generatePage(pages, package) {
    const directory = path.join(PACKAGE_ROOT, package, 'pages')

    fs.readdirSync(directory)
        .filter((page) => {
            const stat = fs.statSync(path.join(PACKAGE_ROOT, package))
            return stat.isDirectory()
        })
        .forEach(function (page) {
            pages.push(`packages/${package}/pages/${page}/${page}`)
        })
}

function generatePackage(packages, package) {
    const directory = path.join(PACKAGE_ROOT, package, 'pages')
    const pages = []

    fs.readdirSync(directory)
        .filter((page) => {
            const stat = fs.statSync(path.join(PACKAGE_ROOT, package))
            return stat.isDirectory()
        })
        .forEach(function (page) {
            pages.push(`pages/${page}/${page}`)
        })

    packages.push({
        root: `packages/${package}`,
        pages: pages
    })
}

const packages = []
const pages = []

// 获取包列表
fs.readdirSync(PACKAGE_ROOT).forEach(function (package) {
    const stat = fs.statSync(path.join(PACKAGE_ROOT, package))

    if (!stat.isDirectory()) return

    package === PACKAGE_DEFAULT_NAME
        ? generatePage(pages, package)
        : generatePackage(packages, package)
})

module.exports = {
    pages: pages,
    subpackages: packages
}

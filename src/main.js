const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'B', url: 'https://bilibili.com' },
    { logo: 'G',  url: 'https://github.com' },
    { logo: 'L',  url: 'https://lol.qq.com' }
]

const Symplifyurl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www', '')
        .replace(/\/.*/, '')
}
const render = () => {
    $siteList.find('li:not(.last)').remove() // 唯独不要最后一个
    hashMap.forEach((node, index) => {
        const $li = $(`
        <li>
                        <div class="site">
                            <div class="logo">${node.logo}</div>
                            <div class="link">${Symplifyurl(node.url)}</div>
                            <div class='close'><svg class="icon">
                            <use xlink:href="#icon-cc-close-crude"></use>
                        </svg></div>
                        </div>
                </li>
        `).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url,'_self')
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()

$('.addButton').on('click', () => {
    let url = window.prompt("请问你要添加的网址是啥？")
    if (url.indexOf('http')!==0) {
        url = 'https://' + url
    }
    hashMap.push({
        logo: Symplifyurl(url)[0].toUpperCase(),
        logoType: 'text',
        url: url
    })
    render()
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string) // 在本地设置x，值就是这个string
}

$(document).on('keypress', (e) => {
    const key = e.key
    for (let i = 0; i < hashMap.length; i++){
        if (hashMap[i].logo.toLowerCase() === key){
            window.open(hashMap[i].url)
        }
    }
})
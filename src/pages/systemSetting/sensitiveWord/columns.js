const columns = [
    {
        type: 'selection',
        width: 50,
        align: 'center'
    },
    {
        title: '敏感词',
        key: 'sensitiveName'
    },
    {
        title: '等级',
        key: 'sensitiveLevel',
        render: (h, params) => {
            let data = params.row.sensitiveLevel;
            let text = null;
            if (data === 'WARNING') text = '违规级'
            if (data === 'MASK') text = '敏感级'
            if (data === 'FORBBIDEN') text = '禁发级'
            return h('span', text)
        }
    },
    {
        title: '替换类型',
        key: 'replaceType'
    },
    {
        title: '替换词',
        key: 'replaceWord'
    },
    {
        title: '使用方式',
        key: 'sensitiveUse',
        render: (h, params) => {
            let data = params.row.sensitiveUse;
            let text = null;
            text = data.replace('CHAT', '发言')
            text = text.replace('NICKNAME', '昵称')
            text = text.replace('PUBLISH_CONTENT', '文本')
            return h('span', text)
        }
    },
    {
        title: '创建时间',
        key: 'createTime'
    }
];
columns.forEach((item, index) => {
    !item.width && (item.minWidth = 100)
    if (index > 0) item.sortable = true
});

export default columns

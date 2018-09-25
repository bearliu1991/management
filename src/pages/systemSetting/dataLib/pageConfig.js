export default {
    filters: [
        {
            key: 'itemKey',
            value: '',
            width: 320,
            placeholder: '搜索字典值/字典父值'
        }
    ],
    formItems: [
        {
            label: '字典值：',
            prop: 'itemValue'
        },
        {
            label: '字典键值：',
            prop: 'itemKey'
        },
        {
            label: '字典名：',
            prop: 'itemName'
        },
        {
            label: '字典父值：',
            prop: 'itemPv'
        },
        {
            label: '字典值排序：',
            prop: 'itemIdx'
        },
        {
            label: 'json信息：',
            prop: 'itemJson'
        },
        {
            label: 'html信息：',
            prop: 'itemHtml'
        }
    ]
}

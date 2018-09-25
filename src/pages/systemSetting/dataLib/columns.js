const columns = [
    {
        fixed: 'left',
        type: 'selection',
        width: 50,
        align: 'center'
    },
    {
        title: '字典值',
        key: 'itemValue'
    },
    {
        title: '字典键值',
        key: 'itemKey'
    },
    {
        title: '字典的父值',
        key: 'itemPv'
    },
    {
        title: '字典名',
        key: 'itemName'
    },
    {
        title: '字典值排序',
        key: 'itemIdx'
    },
    {
        title: 'json信息',
        key: 'itemJson'
    },
    {
        title: 'html信息',
        key: 'itemHtml'
    }
];

columns.forEach((item, index) => {
    !item.width && (item.minWidth = 150)
    // if (index > 0) item.sortable = true
});

export default columns

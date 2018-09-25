const columns = [
    {
        type: 'selection',
        width: 50,
        align: 'center'
    },
    {
        title: '全局参数',
        key: 'paramId'
    },
    {
        title: '参数说明',
        key: 'paramName'
    },
    {
        title: '参数值',
        key: 'paramValue'
    },
    {
        title: '值单位',
        key: 'unitType'
    }
];
columns.forEach((item, index) => {
    !item.width && (item.minWidth = 100)
    if (index > 0) item.sortable = true
});

export default columns

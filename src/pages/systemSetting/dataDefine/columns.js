const columns = [
    {
        fixed: 'left',
        type: 'selection',
        width: 50,
        align: 'center'
    },
    {
        title: '字典键值',
        key: 'itemKey'
    },
    {
        title: '字典值',
        key: 'itemKeyDesc'
    },
    {
        title: '值说明',
        key: 'itemPk'
    }
];

columns.forEach((item, index) => {
    !item.width && (item.minWidth = 100)
    if (index > 0) item.sortable = true
});
export default columns

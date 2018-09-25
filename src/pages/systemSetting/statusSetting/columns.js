const columns = [
    {
        type: 'selection',
        width: 50,
        align: 'center'
    },
    {
        title: '状态id',
        key: 'statusId'
    },
    {
        title: '状态描述',
        key: 'statusDesc'
    }
];

columns.forEach((item, index) => {
    !item.width && (item.minWidth = 100)
    if (index > 0) item.sortable = true
});

export default columns

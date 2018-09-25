const columns = [
    {
        fixed: 'left',
        type: 'selection',
        width: 50,
        align: 'center'
    },
    {
        title: '套餐id',
        key: 'id'
    },
    {
        title: '套餐名',
        key: 'name'
    },
    {
        title: '坐席数',
        key: 'seatNum'
    },
    {
        title: '订阅号数',
        key: 'publiccodeNum'
    },
    {
        title: '服务号数',
        key: 'servicecodeNum'
    },
    {
        title: '授权类型',
        key: 'authType'
    },
    {
        title: '授权开始时间',
        key: 'startTime'
    },
    {
        title: '授权结束时间',
        key: 'endTime'
    },
    {
        title: '生效天数',
        key: 'validDay'
    },
    {
        title: '价格(单位分)',
        key: 'price'
    },
    {
        title: '代理价格(单位分)',
        key: 'isSon'
    },
    {
        title: '自动审核',
        key: 'autoAudit'
    },
    {
        title: '描述',
        key: 'remark'
    },
    {
        title: '创建日期',
        key: 'createTime'
    },
    {
        title: '创建人id',
        key: 'createId'
    },
    {
        title: '更新日期',
        key: 'updateTime'
    },
    {
        title: '更新人id',
        key: 'updateId'
    }
];

columns.forEach((item, index) => {
    !item.width && (item.width = 150)
    if (index > 0) item.sortable = true
});

export default columns

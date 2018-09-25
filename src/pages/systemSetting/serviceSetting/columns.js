const columns = [
    {
        fixed: 'left',
        type: 'selection',
        width: 50,
        align: 'center'
    },
    {
        title: '服务id',
        key: 'serviceId'
    },
    {
        title: '服务代码',
        key: 'serviceCode'
    },
    {
        title: '服务名称',
        key: 'serviceName'
    },
    {
        title: '服务类型',
        key: 'serviceType'
    },
    {
        title: '全局性功能',
        key: 'isGlobal',
        render: (h, params) => {
            if (params.row.isGlobal === 'Y') {
                return h('span', '是')
            } else {
                return h('span', '否')
            }
        }
    },
    {
        title: '管理服务',
        key: 'optrType',
        render: (h, params) => {
            if (params.row.optrType === 'FORBIDDEN') {
                return h('span', '禁用')
            } else {
                return h('span', '恢复')
            }
        }
    }
];

columns.forEach((item, index) => {
    !item.width && (item.minWidth = 100)
    if (index > 0) item.sortable = true
});

export default columns

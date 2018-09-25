const columns = [
    {
        title: '套餐名称',
        key: 'name'
    },
    {
        title: '公众号数',
        key: 'publicCodeNUm'
    },
    {
        title: '员工数量',
        key: 'employees'
    },
    {
        title: '坐席数量',
        key: 'seats'
    },
    {
        title: '有效期 ',
        key: 'validityPeriod'
    },
    {
        title: '状态',
        key: 'status',
        render: (h, params) => {
            let data = params.row.status;
            let text = '';
            if (data === 1) text = '启用'
            if (data === 2) text = '停售'
            if (data === 0) text = '禁用'
            if (data === 3) text = '删除'
            return h('span', text)
        }
    },
    {
        title: '创建人',
        key: 'createName'
    },
    {
        title: '创建时间',
        key: 'createTime',
        render: (h, params) => {
            let data = params.row.createTime;
            let text = data ? data.substring(0, 16) : ''
            return h('span', text)
        }
    },
    {
        title: '最后修改时间',
        key: 'lastModifyTime',
        render: (h, params) => {
            let data = params.row.lastModifyTime;
            let text = data ? data.substring(0, 16) : ''
            return h('span', text)
        }
    }
];

columns.forEach((item, index) => {
    !item.width && (item.minWidth = 150)
    item.ellipsis = true
    if (index > 0) item.sortable = true
});

export default columns

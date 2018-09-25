const columns = [
    {
        fixed: 'left',
        type: 'selection',
        width: 50,
        align: 'center'
    },
    {
        title: 'app标识',
        key: 'appId'
    },
    {
        title: 'app中文名',
        key: 'appName'
    },
    {
        title: 'app英文名',
        key: 'appEnname'
    },
    {
        title: 'app密钥',
        key: 'appSecret'
    },
    {
        title: 'app独立域名',
        key: 'appDomain'
    },
    {
        title: '应用',
        key: 'appType',
        render: (h, params) => {
            let data = params.row.cheatType;
            let text = null;
            if (data === 0 || data === 1) text = '外部应用'
            if (data === 'ACCOUNT') text = '内部应用'
            return h('span', text)
        }
    },
    {
        title: '状态',
        key: 'appStatus',
        render: (h, params) => {
            let data = params.row.appStatus;
            let text = null;
            if (data === 0 || data === 1) text = '停用'
            if (data === 'ACCOUNT') text = '启用'
            return h('span', text)
        }
    },
    {
        title: '创建时间',
        key: 'createTime'
    },
    {
        title: '描述',
        key: 'description'
    }
];

columns.forEach((item, index) => {
    !item.width && (item.minWidth = 100)
    if (index > 0) item.sortable = true
});

export default columns

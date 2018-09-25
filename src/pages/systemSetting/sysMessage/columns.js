const columns = [
    {
        fixed: 'left',
        type: 'selection',
        width: 50,
        align: 'center'
    },
    {
        title: '状态',
        key: 'status'
    },
    {
        title: '消息名称',
        key: 'messageName'
    },
    {
        title: '发布类型',
        key: 'subtype',
        render: (h, params) => {
            let data = params.row.subtype;
            let text = null;
            if (data === 'localroom') text = '只发送到aid数组的房间去'
            if (data === 'broadcast') text = '发送到所有的房间'
            if (data === 'user') text = '发给指定的用户'
            return h('span', text)
        }
    },
    {
        title: '接收消息的房间',
        key: 'roomIds'
    },
    {
        title: '接受消息的用户',
        key: 'userIds',
        render: (h, params) => {
            let data = params.row.userIds;
            let text = null;
            if (data === 'ASC') text = '升序'
            if (data === 'DESC') text = '降序'
            return h('span', text)
        }
    },
    {
        title: '用户类型',
        key: 'userType',
        render: (h, params) => {
            let data = params.row.userType;
            let text = null;
            if (data === '1') text = '用户'
            if (data === '2') text = '管理员'
            return h('span', text)
        }
    },
    {
        title: '显示区域',
        key: 'display'
    },
    {
        title: '平台',
        key: 'platform'
    },
    {
        title: '生效时间',
        key: 'effDate'
    },
    {
        title: '失效时间',
        key: 'expDate'
    },
    {
        title: 'cron表达式',
        key: 'cronExpression'
    },
    {
        title: '消息内容',
        key: 'message'
    },
    {
        title: '自定义扩展',
        key: 'ext'
    }
];

columns.forEach((item, index) => {
    !item.width && (item.minWidth = 100)
    if (index > 0) item.sortable = true
});

export default columns

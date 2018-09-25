const columns = [
    {
        fixed: 'left',
        type: 'selection',
        width: 50,
        align: 'center'
    },
    {
        title: '公众号头像名称',
        key: 'pubName',
        width: 280,
        render: (h, params) => {
            let data = params.row.pubName;
            let avatar = params.row.avatar;
            return h('div', [
                h('img', {
                    class: "public-num-avatar",
                    domProps: { src: avatar }
                }),
                h('span', data) ])
        }
    },
    {
        title: '类型',
        key: 'type',
        width: 120,
        render: (h, params) => {
            let data = params.row.type;
            let text = '';
            if (data === 0 || data === 1) text = '订阅号'
            if (data === 2) text = '服务号'
            return h('span', text)
        }
    },
    {
        title: '认证状态',
        key: 'authStatus',
        width: 120,
        render: (h, params) => {
            let data = params.row.authStatus;
            let text = '';
            if (data === 0 || data === 3 || data === 4 || data === 5) text = '已认证'
            if (data === -1 || data === 1 || data === 2) text = '未认证'
            return h('span', text)
        }
    },
    {
        title: '所属企业',
        key: 'affiliatedCopr'
    },
    {
        title: '粉丝数',
        key: 'fansNum',
        width: 120
    },
    {
        title: '授权员工',
        key: 'authEmployee'
    },
    {
        title: '授权时间',
        key: 'authTime',
        width: 150,
        render: (h, params) => {
            let data = params.row.authTime || '';
            let text = data.substring(0, 16)
            return h('span', text)
        }
    },
    {
        title: '公众号状态 ',
        key: 'status',
        render: (h, params) => {
            let data = params.row.pubStatus;
            let text = '';
            if (data === 0) text = '禁用'
            if (data === 1) text = '正常'
            if (data === 2) text = '停用'
            if (data === 3) text = '未授权'
            if (data === 4) text = '删除'
            return h('span', text)
        }
    }
];

columns.forEach((item, index) => {
    !item.width && (item.minWidth = 150)
    item.ellipsis = true
    // if (index > 0) item.sortable = true
});

export default columns

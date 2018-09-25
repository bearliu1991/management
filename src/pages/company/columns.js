const columns = [
    {
        fixed: 'left',
        type: 'selection',
        width: 50,
        align: 'center'
    },
    {
        title: '企业名称',
        key: 'companyName',
        width: 280,
        render: (h, params) => {
            let data = params.row.companyName;
            return h('router-link', {
                class: "company-item-link",
                props: { to: { name: 'Login' } }
            }, data)
        }
    },
    {
        title: '套餐版本',
        key: 'version',
        width: 120,
        render: (h, params) => {
            let data = params.row.version;
            return h('router-link', {
                class: "company-item-link",
                props: { to: { name: 'Login' } }
            }, data)
        }
    },
    // {
    //     title: '联系人',
    //     key: 'contact'
    // },
    // {
    //     title: '手机号码',
    //     key: 'telNum'
    // },
    {
        title: '公众号数',
        key: 'publicCodeNUm',
        width: 120,
        render: (h, params) => {
            let data = params.row.publicCodeNUm;
            return h('router-link', {
                class: "company-item-link",
                props: { to: { name: 'Login' } }
            }, data)
        }
    },
    {
        title: '粉丝总数',
        key: 'fans',
        width: 120,
        render: (h, params) => {
            let data = params.row.fans;
            return h('router-link', {
                class: "company-item-link",
                props: { to: { name: 'Login' } }
            }, data)
        }
    },
    {
        title: '员工数量',
        key: 'employees',
        width: 120,
        render: (h, params) => {
            let data = params.row.employees;
            return h('router-link', {
                class: "company-item-link",
                props: { to: { name: 'Login' } }
            }, data)
        }
    },
    {
        title: '坐席数量',
        key: 'seats',
        width: 120,
        render: (h, params) => {
            let data = params.row.seats;
            return h('router-link', {
                class: "company-item-link",
                props: { to: { name: 'Login' } }
            }, data)
        }
    },
    {
        title: '所属销售',
        key: 'saleman',
        render: (h, params) => {
            let data = params.row.saleman;
            return h('router-link', {
                class: "company-item-link",
                props: { to: { name: 'Login' } }
            }, data)
        }
    },
    {
        title: '创建时间',
        key: 'createTime',
        render: (h, params) => {
            let data = params.row.createTime;
            let text = data.substring(0, 16)
            return h('span', text)
        }
    },
    {
        title: '到期时间',
        key: 'expireTime',
        render: (h, params) => {
            let data = params.row.expireTime;
            let text = data.substring(0, 10)
            return h('span', text)
        }
    },
    {
        title: '状态',
        key: 'status',
        render: (h, params) => {
            let data = params.row.status;
            let text = '';
            if (data === 'ACTIVE') text = '正常'
            if (data === 'DISABLE') text = '停用'
            if (data === 'DELETE') text = '标记删除'
            if (data === 'EXPIRE') text = '过期'
            return h('span', text)
        }
    }
];

columns.forEach((item, index) => {
    !item.width && (item.minWidth = 100)
    item.ellipsis = true
    if (index > 0) item.sortable = true
});

export default columns

const columns = [
    {
        fixed: 'left',
        type: 'selection',
        width: 50,
        align: 'center'
    },
    {
        title: '身份代码',
        key: 'identityCode',
        width: 150
    },
    {
        title: '身份名称',
        key: 'identityName',
        width: 150
    },
    {
        title: '身份图标',
        key: 'identityPicId',
        width: 150
    },
    {
        title: '身份类型',
        key: 'identityType',
        width: 150
    },
    {
        title: '权限系统的角色ID',
        key: 'roleId',
        width: 200
    },
    {
        title: '所属系统',
        key: 'subSystem',
        width: 200,
        render: (h, params) => {
            let value = params.row.subSystem;
            if (!value) return h('span', '')
            if (value === 1) return h('span', '是pc端web聊天系统')
            if (value === 2) return h('span', 'MGR')
            if (value === 3) return h('span', '是pc端web管理系统')
            if (value === 4) return h('span', '否pc端web运营系统')
            if (value === 5) return h('span', '是IOS')
            if (value === 6) return h('span', '否安卓')
        }
    },
    {
        title: '所属行业',
        key: 'busiType',
        width: 150,
        render: (h, params) => {
            let value = params.row.busiType;
            if (value === 0) return h('span', 'MGR')
        }
    },
    {
        title: '状态',
        key: 'status',
        render: (h, params) => {
            let value = params.row.status;
            let text = '';
            if (value === 'ACTIVE') {
                text = '启用';
            } else if (value === 'DISABLED') {
                text = '停用';
            } else {
                text = value
            }
            return h('span', text)
        }
    }
];

columns.forEach((item, index) => {
    !item.width && (item.minWidth = 100)
    if (index > 0) item.sortable = true
});

export default columns

const columns = [
    {
        fixed: 'left',
        type: 'selection',
        width: 50,
        align: 'center'
    },
    // {
    //     title: '角色ID',
    //     key: 'roleId'
    // },
    {
        title: '权限名称',
        key: 'roleName'
    },
    {
        title: '排序',
        key: 'authRoleOrder'
    },
    {
        title: '状态',
        key: 'isEnabled',
        render: (h, params) => {
            let data = params.row.isEnabled;
            let text = null;
            if (data === 1) text = '启用';
            if (data === 0) text = '停用';
            return h('span', text)
        }
    },
    {
        title: '创建时间',
        key: 'createTime'
    },
    {
        title: '所属系统',
        key: 'subSystem',
        render: (h, params) => {
            let data = params.row.subSystem;
            let text = null;
            if (data === 1) text = '是pc端web聊天系统';
            if (data === 2) text = 'pc端桌面聊天系统';
            if (data === 3) text = 'pc端web管理系统';
            if (data === 4) text = 'pc端web管理系统';
            if (data === 5) text = 'IOS';
            if (data === 6) text = '安卓';
            return h('span', text)
        }
    },
    {
        title: '所属行业',
        key: 'busiType',
        render: (h, params) => {
            let data = params.row.busiType;
            let text = null;
            if (data === 0) text = 'MGR'
            if (data === 1) text = '1'
            return h('span', text)
        }
    }
];
columns.forEach((item, index) => {
    !item.width && (item.minWidth = 100)
    if (index > 0) item.sortable = true
});
export const Columns = columns

const columnsById = [
    {
        fixed: 'left',
        type: 'selection',
        width: 50,
        align: 'center'
    },
    {
        title: '权限名称',
        key: 'itemName'
    },
    {
        title: '所属系统',
        key: 'subSystem',
        width: 200,
        render: (h, params) => {
            let data = params.row.subSystem;
            let text = null;
            if (data === 1) text = '是pc端web聊天系统';
            if (data === 2) text = 'pc端桌面聊天系统';
            if (data === 3) text = 'pc端web管理系统';
            if (data === 4) text = 'pc端web管理系统';
            if (data === 5) text = 'IOS';
            if (data === 6) text = '安卓';
            return h('span', text)
        }
    },
    {
        title: 'URL',
        key: 'uri'
    },
    {
        title: '排序',
        key: 'itemOrder'
    },
    {
        title: '显示菜单',
        key: 'showInMenu',
        render: (h, params) => {
            let data = params.row.showInMenu;
            let text = null;
            if (data === 'T') text = '是';
            if (data === 'F') text = '否';
            return h('span', text)
        }
    },
    {
        title: '位置',
        key: 'itemPosition'
    },
    {
        title: '描述',
        key: 'itemDesc'
    }
];

columnsById.forEach((item, index) => {
    !item.width && (item.minWidth = 100)
    if (index > 0) item.sortable = true
});

export const ColumnsById = columnsById

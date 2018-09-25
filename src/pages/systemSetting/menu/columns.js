const columns = [
    {
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
        render: (h, params) => {
            let data = params.row.subSystem;
            let text = null;
            if (data === 1) text = 'pc端web聊天系统'
            if (data === 2) text = 'pc端桌面聊天系统'
            if (data === 3) text = 'pc端web管理系统'
            if (data === 4) text = 'pc端web管理系统'
            if (data === 5) text = 'IOS'
            if (data === 6) text = '安卓'
            return h('span', text)
        }
    },
    {
        title: 'URL',
        key: 'uri'
    },
    {
        title: ' 排序',
        key: 'itemOrder'
    },
    {
        title: '是否显示菜单',
        key: 'showInMenu',
        render: (h, params) => {
            let data = params.row.showInMenu;
            let text = null;
            if (data === "T") text = '显示'
            if (data === "F") text = '不显示'
            return h('span', text)
        }
    },
    {
        title: '是否显示URL',
        key: 'showUri',
        render: (h, params) => {
            let data = params.row.showUri;
            let text = null;
            if (data === "T") text = '显示'
            if (data === "F") text = '不显示'
            return h('span', text)
        }
    },
    {
        title: ' 描述',
        key: 'itemDesc'
    }
];

columns.forEach((item, index) => {
    !item.width && (item.minWidth = 100)
    // if (index > 0) item.sortable = true
});

export default columns

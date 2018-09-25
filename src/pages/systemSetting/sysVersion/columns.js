const columns = [
    {
        fixed: 'left',
        type: 'selection',
        width: 50,
        align: 'center'
    },
    {
        title: '是否更新',
        key: 'isUpdate',
        render: (h, params) => {
            let data = params.row.isUpdate;
            let text = null;
            if (data === 0) text = '不更新'
            if (data === 1) text = '更新'
            return h('span', text)
        }
    },
    {
        title: '更新方式',
        key: 'updateMode',
        render: (h, params) => {
            let data = params.row.updateMode;
            let text = null;
            if (data === '0') text = '热更新和安装更新'
            if (data === '1') text = '热更新'
            if (data === '2') text = '安装更新'
            return h('span', text)
        }
    },
    {
        title: '新内部版本号',
        key: 'insideVersion'
    },
    {
        title: '外部版本号',
        key: 'outsideVersion'
    },
    {
        title: '热更新数据集合',
        key: 'hotUpdateDetail'
    },
    {
        title: '安装更新地址',
        key: 'installUpdateUrl'
    },
    {
        title: '热更新内容描述',
        key: 'hotUpdateDescribe'
    },
    {
        title: '安装更新内容描述',
        key: 'installUpdateDescribe'
    },
    {
        title: '终端版本名',
        key: 'appName'
    },
    {
        title: '版本更新时间',
        key: 'createTime'
    }
];

columns.forEach((item, index) => {
    !item.width && (item.minWidth = 100)
    if (index > 0) item.sortable = true
});

export default columns

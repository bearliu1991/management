const columns = [
    {
        fixed: 'left',
        type: 'selection',
        width: 50,
        align: 'center'
    },
    {
        title: '客户id',
        key: 'id'
    },
    {
        title: '公司id',
        key: 'corpId'
    },
    {
        title: '客户名称',
        key: 'name'
    },
    {
        title: '简称',
        key: 'abbreviation'
    },
    {
        title: '我方维护人id',
        key: 'mgrId'
    },
    {
        title: '我方维护人',
        key: 'mgr'
    },
    {
        title: '客户介绍人',
        key: 'introducer'
    },
    {
        title: '客户联系电话',
        key: 'telephone'
    },
    {
        title: '邮箱地址',
        key: 'email'
    },
    {
        title: '网址',
        key: 'website'
    },
    {
        title: '是否为子公司',
        key: 'isSon'
    },
    {
        title: '父公司id',
        key: 'parentId'
    },
    {
        title: '纳税人识别码',
        key: 'taxpayerCode'
    },
    {
        title: '信用控制',
        key: 'control'
    },
    {
        title: '客户类型',
        key: 'type'
    },
    {
        title: '客户等级',
        key: 'level'
    },
    {
        title: '客户所属行业',
        key: 'industry'
    },
    {
        title: '客户备注',
        key: 'remark'
    },
    {
        title: '状态',
        key: 'status'
    },
    {
        title: '创建人',
        key: 'createUserId'
    },
    {
        title: '客户业务金额累计',
        key: 'amount'
    }
]

columns.forEach((item, index) => {
    !item.width && (item.width = 150)
    if (index > 0) item.sortable = true
});

export default columns

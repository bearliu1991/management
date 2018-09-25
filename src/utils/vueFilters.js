const subSystem = (value) => {
    if (!value) return ''
    if (value === 1) return '是pc端web聊天系统'
    if (value === 2) return '否pc端桌面聊天系统'
    if (value === 3) return '是pc端web管理系统'
    if (value === 4) return '否pc端web运营系统'
    if (value === 5) return '是IOS'
    if (value === 6) return '否安卓'
};

const busiType = (value) => {
    if (!value) return ''
    if (value === 0) return 'MGR'
};

const isSonOrNot = (value) => {
    if (!value) return ''
    if (value === 'Y') return '是'
    if (value === 'N') return '否'
};

const infoStatus = (value) => {
    let text = '';
    if (value === 'ACTIVE') {
        text = '启用';
    } else if (value === 'DISABLED') {
        text = '停用';
    } else if (value === 'DELETE') {
        text = '标记删除';
    }
    return text;
}

export default {
    subSystem,
    busiType,
    isSonOrNot,
    infoStatus
}

// {
//     title: '微信头像昵称',
//         key: 'nickName',
//             render: (h, params) => {
//                 let nickName = params.row.nickName;
//                 let Avatar = params.row.avatar;
//                 return h('div', { class: "table-avtar-cell" }, [
//                     h('img', {
//                         class: "wx-avatar",
//                         domProps: { src: Avatar }
//                     }),
//                     h('span', { class: "wx-nickName" }, nickName)
//                 ])
//             }
// }

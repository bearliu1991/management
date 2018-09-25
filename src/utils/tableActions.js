/**
 * fn 为当前table的判断操作的方法
 * actionItems 为当前table的操作方法
 * pageName 为当前table的所属页面
 */
export default function (fn, actionItems, pageName) {
    return {
        fixed: 'right',
        title: '操作',
        key: 'action',
        width: 150,
        align: 'center',
        render: (h, params) => {
            let actions = {
                show: function () {
                    return h('div', {
                        class: 'action-item',
                        on: { click: () => { fn('show', params, pageName) } }
                    }, '详情')
                },
                modify: function () {
                    return h('div', {
                        class: 'action-item',
                        on: { click: () => { fn('modify', params, pageName) } }
                    }, '修改')
                },
                delete: function () {
                    return h('div', {
                        class: 'action-item',
                        on: { click: () => { fn('delete', params, pageName) } }
                    }, '删除')
                }
            };
            let actionFnArr = function () {
                return actionItems.map(item => {
                    if (typeof item === 'string') {
                        return actions[item]()
                    } else if (!item.options || item.options.includes(params.row[item.key])) {
                        return h('div', {
                            class: 'action-item',
                            on: { click: () => { fn(item.type, params, pageName) } }
                        }, item.title)
                    }
                })
            };
            if (actionItems.length === 1) {
                return h('Poptip', {
                            class: 'action',
                            props: { trigger: "click", placement: 'bottom', transfer: true }
                        }, actionFnArr());
            }
            return h('Poptip', {
                class: 'action',
                props: { trigger: "click", placement: 'bottom', transfer: true }
            }, [
                    h('div', {
                        domProps: { innerHTML: '查看业务<i class="ivu-icon ivu-icon-arrow-down-b"></i>' }
                    }),
                    h('div', { slot: "content" }, actionFnArr())
                ]);
        }
    }
}

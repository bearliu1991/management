/**
transformData = function (obj, rules = {}, reverse, subobj) {
    let reverseRules = {}
    if (reverse) {
        for (let key in rules) {
            reverseRules[rules[key]] = key
        }
        rules = reverseRules
        console.log(reverseRules)
    }
    const transform = function (obj, rules, subobj) {
        let temp = {};
        for (let key in rules) {
            if (key === subobj && obj[key]) {
                if (Array.isArray(obj[key])) {
                    temp[rules[key]] = []
                    obj[key].forEach(_item => {
                        temp[rules[key]].push(transform(_item, rules, subobj))
                    })
                } else {
                    temp[rules[key]] = transform(obj[key], rules, subobj)
                }
            } else {
                temp[rules[key]] = obj[key]
            }
        }
        return temp
    }
    return transform(obj, rules, subobj)
};

obj= { 
    a: 1, 
    b: 2,
    sub: { 
        a: 11, 
        b: 22 ,
        sub: {
            a: 11,
            b: 22
        }
    } }

rules = {
    a: 'aa',
    b: 'bb',
    sub: 'subqq'
}
// obj1 = transformData({ aa: 11, bb: 22, subqq: { aa: 11, bb: 22, subqq: undefined } }, rules, true, 'subqq')


let data5= [
    {
        title: '杭州星客互联有限公司',
        order: 1,
        expand: true,
        children: [
            {
                title: '杭州星客互联有限公司',
                order: 1,
                children: [
                    {
                        title: '杭州星客互联有限公司',
                    }
                ]
            },
            {
                title: '杭州星客互联有限公司',
                order: 2,
                children: [
                    {
                        title: 'leaf 1-2-1',
                    }
                ]
            },
            {
                title: '杭州星客互联有限公司',
                order: 3,
                children: [
                    {
                        title: 'leaf 1-2-1',
                    }
                ]
            }
        ]
    },
    {
        title: '杭州星客互联有限公司',
        order: 2,
        children: [
            {
                title: '杭州星客互联有限公司',
                children: [
                    {
                        title: '杭州星客互联有限公司',
                    }
                ]
            }
        ]
    },
    {
        title: '杭州星客互联有限公司',
        order: 3,
        children: []
    },
    {
        order: 4,
        title: '杭州星客互联有限公司'
    }
]
function sortTreeNode(treeData =[]) {
    treeData.sort((item1, item2) => {
        if (Array.isArray(item1.children)) {
            sortTreeNode(item1.children)
        }
        return item1.order > item2.order
    })
}
sortTreeNode(data5)



obj = {
    total: null,
    currLevel: null,
    a: 1,
    num: 2,
    sub: [{
        total: null,
        currLevel: null,
        a: 11,
        num: 22,
        sub: [{
            total: null,
            currLevel: null,
            a: 11,
            num: 22
        }]
    }]
}
 */

 obj1 =  {
        a: 1,
        b: 'b0',
        num: 10,
        sub: [
            {
                a: 11,
                b: 'b1',
                num: 10,
                sub: [{
                        a: 111,
                        b: 'b2',
                        num: 10,
                        sub: [{
                            a: 111333,
                            b: 'b3',
                            num: 10,
                        }],
                    },
                    {
                        a: 111,
                        b: 'b2',
                        num: 10,
                        sub: [{
                            a: 111333,
                            b: 'b3',
                            num: 10,
                        }]
                    }
                ]
            },
            {
                a: 11,
                b: 'b1',
                num: 10,
                sub: [{
                    a: 111,
                    b: 'b2',
                    num: 10,
                    sub: [{
                        a: 111333,
                        b: 'b3',
                        num: 10,
                    }]
                }]
            }
        ]
    }

_getTreeTotal = function (obj, rules, subobj, ruleSumItem) {
      const copyTarget = (obj, rules, subobj, ruleSumItem, arr, flag) => {
          let temp = {}
            temp['flag'] = flag || 'tree'
          let _arr = arr || []
            _arrLen = _arr.length
            for (let key in rules) {
                if(key !== ruleSumItem && _arrLen >= 1) {
                    temp[key] = _arr[_arrLen-1][rules[key]]
                } else {
                    temp[key] = 0
                }
            }
            _arr.push(temp)
            _arr.forEach(item => {
                if (temp['flag'].includes(item.flag)) {
                    // item[ruleSumItem] += obj[rules[ruleSumItem]] || 0
                    item.total += obj.num || 0
                    console.log(item[ruleSumItem])
                }
            })
            for (let key in obj) {
                if (key === subobj && Array.isArray(obj[subobj])) {
                    temp[key] = []
                    obj[key].forEach((item, index) => {
                        temp[key].push(copyTarget(item, rules, subobj, ruleSumItem, _arr, temp.flag+index))
                    })
                } else {
                    temp[key] = obj[key]
                }
            }          
          return temp;
      }
      return copyTarget(obj, rules, subobj, ruleSumItem);
    }


let target = _getTreeTotal(obj1, {
    parentB: 'b',
    total: 'num'
}, 'sub', 'total')

console.log(JSON.stringify(target))


const copyTarget = (obj, rules = {}, subobj, arr, flag) => {
    let temp = {}
        temp["save"] = 0
        temp["flag"] = ''
        temp['flag'] = flag || 'tree'
    let _arr = arr || []
        _arr.push(temp)
        _arr.forEach(item => {
            if (temp['flag'].includes(item.flag)) {                
                item.save += obj['num']
                console.log(item.save)
            }
        })
        
    for (let key in rules) {
        if (key === subobj && Array.isArray(obj[subobj])) {
            temp[rules[key]] = []
            obj[subobj].forEach((item, index) => {
                temp[rules[key]].push(copyTarget(item, rules, subobj, _arr, temp.flag+index))
            })
        } else {
            temp[key] = obj[key]
        }
    }
    return temp;
}


obj2 =  {
        a: 1,
        b: 2,
        num: 10,
        name: 'level1',
        parentName: '',
        c: {},
        d: [],
        sub: [
            {
                a: 11,
                b: 2,
                num: 10,
                c: {},
                d: [],
                sub: [{
                    a: 111,
                    b: 2,
                    num: 10,
                    c: {},
                    d: [],
                    sub: [{
                        a: 111333,
                        b: 2,
                        num: 10,
                        c: {},
                        d: []
                    }]
                }]
            },
            {
                a: 11,
                b: 2,
                num: 10,
                c: {},
                d: [],
                sub: [{
                    a: 111,
                    b: 2,
                    num: 10,
                    c: {},
                    d: [],
                    sub: [{
                        a: 111333,
                        b: 2,
                        num: 0,
                        c: {},
                        d: []
                    }]
                }]
            },
            {
                a: 11,
                b: 2,
                num: 10,
                c: {},
                d: [],
                sub: [{
                    a: 111,
                    b: 2,
                    num: 10,
                    c: {},
                    d: [],
                    sub: [{
                        a: 111333,
                        b: 2,
                        num: 0,
                        c: {},
                        d: []
                    }]
                }]
            }
        ]
    }
/*
let _target = copyTarget(obj2, {
    a: 'a1',
    b: 'b1',
    sub: 'sub1'
}, 'sub', [])

console.log(JSON.stringify(_target))
*/


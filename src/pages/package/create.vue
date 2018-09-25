<template>
<div class="page-template">
    <p class="page-template-title">{{initTitle}}</p>
    <div class="page-template-content">
        <Form class="page-template-main" :ref="refName" :model="formValidate" :rules="ruleValidate" :label-width="150" label-position="left">
            <p class="form-content-order"><span>1</span>套餐名称</p>
            <div class="ykt-form-content">
                <FormItem class="ykt-form-item item-width-1" label="版本名称：" prop="name">
                    <span v-if="initType === 'show'">{{formValidate.name}}</span>
                    <Input v-else v-model="formValidate.name" placeholder="请填写版本名称"></Input>
                </FormItem>
                <FormItem class="ykt-form-item item-width-1" label="套餐原价：" prop="price">
                    <span v-if="initType === 'show'">{{formValidate.price}}</span>
                    <Input v-else class="size" number v-model="formValidate.price" placeholder="请填写版本价格"></Input>
                    <span class="item-unit">元</span>
                </FormItem>
                <FormItem class="ykt-form-item item-width-1" label="优惠价：" prop="discountedPrice">
                    <span v-if="initType === 'show'">{{formValidate.discountedPrice}}</span>
                    <Input v-else class="size" number v-model="formValidate.discountedPrice" placeholder="请填写版本价格"></Input>
                    <span class="item-unit">元</span>
                </FormItem>
                <FormItem class="ykt-form-item item-width" label="套餐状态：" prop="status">
                    <span v-if="initType === 'show'">{{formValidate.status | status}}</span>
                    <RadioGroup v-else v-model="formValidate.status">
                        <Radio label="0">禁用</Radio>
                        <Radio label="2">正常</Radio>
                        <Radio label="1">正常</Radio>
                        <Radio label="3">逻辑删除</Radio>
                    </RadioGroup>
                </FormItem>
            </div>
            <p class="form-content-order"><span>2</span>资源配置</p>
            <div class="ykt-form-content">
                <FormItem class="ykt-form-item item-width-1" label="公众号数量：" prop="publicCodeNUm">
                    <span v-if="initType === 'show'">{{formValidate.publicCodeNUm}}</span>
                    <Input number v-else class="size" v-model="formValidate.publicCodeNUm" placeholder="请填写公众号数量"></Input>
                    <span class="item-unit">个</span>
                </FormItem>
                <FormItem class="ykt-form-item item-width-1" label="坐席数量：" prop="seats">
                    <span v-if="initType === 'show'">{{formValidate.seats}}</span>
                    <Input number v-else class="size" v-model="formValidate.seats" placeholder="请填写坐席数量"></Input>
                    <span class="item-unit">个</span>
                </FormItem>
            </div>
            <div class="ykt-form-content">
                <FormItem class="ykt-form-item item-width-1" label="员工数量：" prop="employees">
                    <span v-if="initType === 'show'">{{formValidate.employees}}</span>
                    <Input number v-else class="size" v-model="formValidate.employees" placeholder="请填写员工数量"></Input>
                    <span class="item-unit">个</span>
                </FormItem>
                <FormItem class="ykt-form-item item-width-1" label="聊天记录保存时间：" prop="saveTime">
                    <span v-if="initType === 'show'">
                        <span
                            v-for="(item, index) in saveTimeList" :key="index"
                            v-if="item.val == formValidate.saveTime"
                        >{{item.title}}</span>
                    </span>
                    <Select v-else class="size" v-model="formValidate.saveTime">
                        <Option v-for="(item, index) in saveTimeList" :key="index"
                            :value="item.val">{{item.title}}</Option>
                    </Select>
                </FormItem>
                <FormItem class="ykt-form-item item-width-1" label="使用期限：" prop="usePeriod">
                    <span v-if="initType === 'show'">
                        <span
                            v-for="(item, index) in periodList" :key="index"
                            v-if="item.val == formValidate.usePeriod"
                        >{{item.title}}</span>
                    </span>
                    <Select v-else class="size" v-model="formValidate.usePeriod">
                        <Option v-for="(item, index) in periodList" :key="index"
                            :value="item.val">{{item.title}}</Option>
                    </Select>
                </FormItem>
            </div>
            <p class="form-content-order"><span>3</span>基础功能</p>
            <div class="ykt-form-content">
                <FormItem class="ykt-form-item item-width-1" label="强制聊天：" prop="forceChatNum">
                    <span v-if="initType === 'show'">{{formValidate.forceChatNum}}</span>
                    <Input number v-else class="size" v-model="formValidate.forceChatNum" placeholder="请填写次数"></Input>
                    <span class="item-unit">次/天</span>
                </FormItem>
                <FormItem class="ykt-form-item item-width-1" label="渠道二维码：" prop="qrcodeMethod">
                    <span v-if="initType === 'show'">{{formValidate.qrcodeMethod}}</span>
                    <Input number v-else class="size" v-model="formValidate.qrcodeMethod" placeholder="请填写数量"></Input>
                    <span class="item-unit">个</span>
                </FormItem>
                <div v-if="initType === 'show'" class="ykt-form-item item-width">
                    <Checkbox class="select-all" :indeterminate="checkedAllActions" disabled>全选</Checkbox>
                    <CheckboxGroup v-model="formValidate.actions">
                        <Checkbox class="checkbox-item" v-for="(item, index) in actions" :key="index"
                            :label="item.val" disabled>{{item.title}}</Checkbox>
                    </CheckboxGroup>
                </div>
                <div v-else class="ykt-form-item item-width">
                    <Checkbox class="select-all" :indeterminate="checkedAllActions"
                    @click.prevent.native="checkAll('actions', actions, 'checkedAllActions')">全选</Checkbox>
                    <CheckboxGroup v-model="formValidate.actions">
                        <Checkbox class="checkbox-item" v-for="(item, index) in actions" :key="index"
                            :label="item.val">{{item.title}}</Checkbox>
                    </CheckboxGroup>
                </div>
            </div>
            <!-- <p class="form-content-order"><span>4</span>高级功能</p>
            <div class="ykt-form-content">
                <div v-if="initType === 'show'" class="ykt-form-item item-width">
                    <Checkbox class="select-all" :indeterminate="checkedAllSuperMethod"
                     disabled>全选</Checkbox>
                    <CheckboxGroup v-model="formValidate.superMethod">
                        <Checkbox class="checkbox-item" v-for="(item, index) in superMethod" :key="index"
                            :label="item.val" disabled>{{item.title}}</Checkbox>
                    </CheckboxGroup>
                </div>
                <div v-else class="ykt-form-item item-width">
                    <Checkbox class="select-all" :indeterminate="checkedAllSuperMethod"
                     @click.prevent.native="checkAll('superMethod', superMethod, 'checkedAllSuperMethod')">全选</Checkbox>
                    <CheckboxGroup v-model="formValidate.superMethod">
                        <Checkbox class="checkbox-item" v-for="(item, index) in superMethod" :key="index"
                            :label="item.val" >{{item.title}}</Checkbox>
                    </CheckboxGroup>
                </div>
            </div> -->
            <div class="btns">
                <Button v-if="initType === 'show'" type="primary" @click.prevent="toModify">修改</Button>
                <Button v-else type="primary" @click.prevent="handleSubmit" >保存</Button>
                <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">返回</Button>
            </div>
        </Form>
    </div>
</div>
</template>

<script>
/* eslint-disable */
  export default {
    name: "createPackage",
    props: {
        title: {
            type: String,
            default: () => { return '新建套餐' }
        },
        type: {
            type: String,
            default: () => { return 'create' }
        },
        api: {
            type: String,
            default: () => { return '' }
        },
        pageDate: {
            type: Object,
            default: () => { return {} }
        }
    },
    data() {
        const self = this;
        const validatePrice = function(rule, value, callback) {
                    if (!value) {
                        callback('请填写版本价')
                    } else if (!/^[0-9\.]+$/.test(value)) {
                        callback('必须为数字值')
                    } else if (/^0[^\.]/.test(value) || /\..{3}/.test(value) || /\..*\./.test(value)) {
                        callback('数值格式不正确')
                    } else {
                        callback()
                    }
                };
        const validateNum = function(rule, value, callback) {
            if (!/^[0-9]+$/.test(value)) {
                callback('必须为整数')
            } else {
                callback()
            }
        };
        return {
            refName: '',
            urls: {
                roles: self.Path.queryAuthRoleByBusiType,
                validDay: self.Path.queryTItemValueByPager,
                saveTime: self.Path.queryTItemValueByPager
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请填写版本名', trigger: 'blur' }
                    ],
                price: [
                    { required: true, type: 'number', validator: validatePrice, trigger: 'change' }
                    ],
                discountedPrice: [
                    { required: true, type: 'number', validator: validatePrice, trigger: 'change' }
                    ],
                status: [
                    { required: true, message: '请选择套餐状态', trigger: 'change' }
                    ],
                publicCodeNUm: [
                    { required: true, type: 'number', min: 1, message: '请填写公众号数量', trigger: 'blur' },
                    { required: true, type: 'number', validator: validateNum, trigger: 'change' }],
                seats: [
                    { required: true, type: 'number', min: 1, message: '请填写坐席数量', trigger: 'blur' },
                    { required: true, type: 'number', validator: validateNum, trigger: 'change' }],
                employees: [
                    { required: true, type: 'number', min: 1, message: '请填写员工数量', trigger: 'blur' },
                    { required: true, type: 'number', validator: validateNum, trigger: 'change' }
                    ],
                saveTime: [
                    { required: true, message: '请选择聊天记录保存时间', trigger: 'change' }
                    ],
                usePeriod: [
                    { required: true, message: '请选择使用期限', trigger: 'change' }
                    ],
                forceChatNum: [
                    { required: true, type: 'number', min: 1, message: '请填写强制聊天', trigger: 'blur' },
                    { required: true, type: 'number', validator: validateNum, trigger: 'change' }
                    ],
                qrcodeMethod: [
                    { required: true, type: 'number', min: 1, message: '请填写渠道二维码', trigger: 'blur' },
                    { required: true, type: 'number', validator: validateNum, trigger: 'change' }
                ]
            },
            actions: [],
            checkedAllActions: false,
            superMethod: [],
            checkedAllSuperMethod: false,
            initTitle: this.title,
            initType: this.type,
            initApi: this.api,
            formValidate: {},
            transformRules: {
                id: 'id',
                name: 'name',
                startTime: 'startTime',
                endTime: 'endTime',
                status: 'status',
                price: 'price',
                discountsPrice: 'discountedPrice',
                officialAccountsNum: 'publicCodeNUm',
                seatNum: 'seats',
                employeeNum: 'employees',
                chatSaveTime: 'saveTime',
                validDay: 'usePeriod',
                forcedToChatNum: 'forceChatNum',
                channelQrCodeNum: 'qrcodeMethod',
                roleIds: 'actions'
            },
            saveTimeList: [],
            periodList: []
        }
    },
    filters: {
        status(value) {
            let data = value;
            let text = '';
            if (data === "0") text = '禁用'
            if (data === "1") text = '正常'
            if (data === "2") text = '停售'
            if (data === "3") text = '逻辑删除'
            return text
        }
    },
    beforeCreate() {
        this.refName = "formValidate" + Date.now()
    },
    created() {
        this.getRolesList();
        this.getValidDay()
        this.getSaveTime()
    },
    activated() {
        this.initTitle = this.title
        this.initType = this.type
        this.initApi = this.api
        let data = this.transformData(this.pageDate)
        data.actions = data.actions || []
        data.saveTime = String(data.saveTime)
        data.usePeriod = String(data.usePeriod)
        this.$set(this, 'formValidate', data)
    },
    methods: {
        handleSubmit () {
            let self = this
            self.$refs[self.refName].validate((valid) => {
                if (valid) {
                    let param = self.transformData(self.formValidate, true)
                    self.$post(self.initApi, param).then(res => {
                        self.$Message.success('Success!');
                        self.$router.push({name: 'package'})
                    })
                } else {
                    self.$Message.error('Fail!');
                }
            })
        },
        toModify() {
            this.initTitle = '修改套餐'
            this.initType = 'modify'
        },
        handleReset (name, fn) {
            this.initTitle = ''
            this.initType = ''
            this.$router.push({name: 'package'})
            this.$refs[this.refName].resetFields();
            typeof fn === "function" && fn()
        },
        parentHandleSubmit() {
            this.handleSubmit('formValidate', (valid) => {
                return this.$emit('modalOk', valid, this.formValidate)
            })
        },
        checkAll(param, list, type) {
            let checkedLength = Array.isArray(this.formValidate[param]) ? this.formValidate[param].length : 0;
            let checkedList = []
            list.forEach(item => checkedList.push(item.val))
            if (checkedList.length === checkedLength) {
                this.$set(this.formValidate, param, [])
                this.$set(this, type, false)
            } else {
                this.$set(this.formValidate, param, checkedList)
                this.$set(this, type, true)
            }
        },
        transformData(item, reverse, rules) {
            let _rules = rules || this.transformRules
            let data = this._transformData(item, _rules, reverse, 'null')
            if (reverse) {
                data.status = parseInt(data.status)
                data.chatSaveTime = parseInt(data.chatSaveTime)
                data.validDay = parseInt(data.validDay)
                data.startTime = this.dateTimeFormat(Date.now())
                data.endTime = this.dateTimeFormat(Date.now() + data.validDay * 24 * 3600 * 1000)
                delete data.validDay
            } else {
                data.status = data.status ? data.status.toString() : '1'
            }
            return data
        },
        getRolesList() {
            let param = {
                limit: 9999,
                offset: 0
            }
            this.$post(this.urls.roles, param).then(res => {
                this.actions = this._transformData(res.data.records, {roleId: 'val', roleName: 'title'})
            })
        },
        getValidDay() {
            let param = {
                limit: 9999,
                offset: 0,
                itemKey: 'ValidDay'
            }
            this.$post(this.urls.validDay, param).then(res => {
                this.periodList = this._transformData(res.data.records, {roleId: 'val', roleName: 'title'})
            })
        },
        getSaveTime() {
            let param = {
                limit: 9999,
                offset: 0,
                itemKey: 'ChatSaveTime'
            }
            this.$post(this.urls.saveTime, param).then(res => {
                this.saveTimeList = this._transformData(res.data.records, {roleId: 'val', roleName: 'title'})
            })
        }
    }
  }
</script>

<style lang="stylus">
.page-template-content
    .form-content-order span
        margin-left: -25px
        margin-right: 11px
        color #AEAEAE
        font-size: 24px
        font-weight 700
        font-style italic
        font-family 'Arial Negreta cursiva', 'Arial Normal', 'Arial'
        text-rendering optimizeLegibility
    .ivu-form .ivu-form-item-label
        font-size: 14px
    .btns
        text-align center
        button
            margin 0 10px
            width 120px
            height 40px
            font-size: 14px
    .ykt-form-content
        margin 30px 0
        &:after
            display block
            content ''
            height 0
            clear both
        .ykt-form-item
            padding-left 50px
            float: left
            min-width: 360px
        .item-width
            width 100%
        .item-width-1
            width 33.33%
        .size
            width 120px
    .checkbox-item, .select-all
        width 13%
        min-width 120px
        font-size 14px
        height 50px
        line-height 30px
</style>

<template>
    <div class="customer-save">
        <h1>{{title}}</h1>
        <Form class="form-page" :ref="refName" :model="formValidate" :rules="ruleValidate" :label-width="200">
            <FormItem label="客户ID" prop="customId">
                <InputNumber v-model="formValidate.customId"></InputNumber>
            </FormItem>
            <FormItem label="客户名称" prop="name">
                <Input v-model="formValidate.name"></Input>
            </FormItem>
            <FormItem label="简称" prop="abbreviation">
                <Input v-model="formValidate.abbreviation"></Input>
            </FormItem>
            <FormItem label="客户维护人id" prop="mgrId">
                <Input v-model="formValidate.mgrId"></Input>
            </FormItem>
            <FormItem label="客户介绍人" prop="introducer">
                <Input v-model="formValidate.introducer"></Input>
            </FormItem>
            <FormItem label="联系电话" prop="telephone">
                <Input v-model="formValidate.telephone"></Input>
            </FormItem>
            <FormItem label="邮箱" prop="email">
                <Input v-model="formValidate.email"></Input>
            </FormItem>
            <FormItem label="网址" prop="website">
                <Input v-model="formValidate.website"></Input>
            </FormItem>
            <FormItem label="是否为子公司" prop="isSon">
                <RadioGroup v-model="formValidate.isSon">
                    <Radio label="Y">是</Radio>
                    <Radio label="N">否</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="父公司id" prop="parentId">
                <Input v-model="formValidate.parentId"></Input>
            </FormItem>
            <FormItem label="纳税人识别码" prop="taxpayerCode">
                <Input v-model="formValidate.taxpayerCode"></Input>
            </FormItem>
            <FormItem label="信用控制" prop="control">
                <Input v-model="formValidate.control"></Input>
            </FormItem>
            <FormItem label="客户类型" prop="type">
                <Input v-model="formValidate.type"></Input>
            </FormItem>
            <FormItem label="客户等级" prop="level">
                <Input v-model="formValidate.level"></Input>
            </FormItem>
            <FormItem label="客户状态" prop="customerStatus">
                <Input v-model="formValidate.customerStatus"></Input>
            </FormItem>
            <FormItem label="客户所属行业" prop="industry">
                <Input v-model="formValidate.industry"></Input>
            </FormItem>
            <FormItem label="客户备注" prop="remark" class="customer-save-textarea">
                <Input type="textarea" v-model="formValidate.remark" ></Input>
            </FormItem>
            <FormItem label="状态" prop="status">
                <Input v-model="formValidate.status"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
  export default {
    name: "validateForm",
    props: {
        id: {
            type: Number,
            default: null
        },
        api: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: 'ykt'
        }
    },
    data() {
        var self = this;
        var validatePass = function(rule, value, callback) {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                callback();
            }
        };
        var validatePassCheck = function(rule, value, callback) {
            if (value === '') {
                return callback(new Error('请再次输入密码'));
            } else if (value !== self.formValidate.password) {
                return callback(new Error('两次密码不一致'));
            } else {
                callback();
            }
        };
      return {
        refName:'',
        ruleValidate: {
            // name: [
            //     { required: true, message: 'The name cannot be empty', trigger: 'blur' }
            // ],
            oldPassword: [
                { required: true, validator: validatePass, trigger: 'blur' }
            ],
            password: [
                { required: true, validator: validatePass, trigger: 'blur' }
            ],
            confirmPassword: [
                { required: true, validator: validatePassCheck, trigger: 'blur' }
            ],
            mail: [
                { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
            ],
            city: [
                { required: true, message: 'Please select the city', trigger: 'change' }
            ],
            gender: [
                { required: true, message: 'Please select gender', trigger: 'change' }
            ],
            interest: [
                { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
            ],
            date: [
                { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
            ],
            time: [
                { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
            ],
            desc: [
                { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
            ],
            sensitiveName: [
                { required: true, type: 'string', message: '敏感词不能为空', trigger: 'change' }
            ],
            sensitiveLevel: [
                { required: true, type: 'string', message: '选择敏感级别', trigger: 'change' }
            ],
            sensitiveUse: [
                { required: true, type: 'array', min: 1, message: '选择敏感词用途', trigger: 'change' }
            ]
        },
        formValidate: {
            customId: null,
            name: '',
            abbreviation: '',
            mgrId: '',
            introducer: '',
            telephone: '',
            email: '',
            website: '',
            isSon: '',
            parentId: '',
            taxpayerCode: '',
            control: '',
            type: '',
            level: '',
            customerStatus: '',
            industry: '',
            remark: '',
            status: ''
        }
      }
    },
    beforeCreate() {
        this.refName = "saveCustomer" + Date.now();
    },
    created() {
        console.log(this.id);
    },
    methods: {
        handleSubmit (name, fnValid) {
            this.$refs[this.refName].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                    this.submitNewData(this.formValidate)
                } else {
                    this.$Message.error('Fail!');
                }
                typeof fnValid === "function" && fnValid(valid)
            })
        },
        handleReset (name, fn) {
            this.$refs[this.refName].resetFields();
            typeof fn === "function" && fn()
        },
        parentHandleSubmit () {
            this.handleSubmit('formValidate', (valid) => {
                return this.$emit('modalOk', valid, this.formValidate)
            })
        },
        parentHandleReset () {
            this.handleReset('formValidate', () => {
                return this.$emit('modalCancel', 'resetOk')
            })
        },
        submitNewData (val) {
            // 添加新条目-2-确认提交
            if (this.api) {
                this.$post(this.api, val).then(res => {
                    this.$router.push({
                        name: 'customers',
                        params: {
                            ok : 'true'
                        }
                    })
                })
            } else {
                this.$Message.error('err api');
            }
        }
    }
  }
</script>

<style lang="stylus" scoped>
  .form-page
      width 700px
      margin 10px auto 0
      .ivu-form-item
          height 40px
          margin-bottom 5px
          &.customer-save-textarea
              height auto
</style>

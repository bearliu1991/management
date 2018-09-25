<template>
    <Form :ref="refName" :model="formValidate" :rules="ruleValidate" :label-width="labelWidth">
        <slot></slot>
    </Form>
</template>

<script>
  export default {
    name: "validateForm",
    props: {
        formValidate: {
            type: Object,
            default: function () {
                return {}
            }
        },
        labelWidth: {
            type: Number,
            default: 100
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
            name: [
                { required: true, message: 'The name cannot be empty', trigger: 'blur' }
            ],
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
            ],
            limitName: [
                { required: true, type: 'string', min: 1, message: '不能为空，请输入', trigger: 'blur' }
            ],
            busiCode: [
                { required: true, type: 'number', min: 1, message: '不能为空，请输入', trigger: 'blur' }
            ],
            busiCodeDefine: [
                { required: true, type: 'string', min: 1, message: '不能为空，请输入', trigger: 'blur' }
            ],
            objectType: [
                { required: true, type: 'string', min: 1, message: '不能为空，请输入', trigger: 'blur' }
            ],
            cheatType: [
                { required: true, type: 'string', trigger: 'change' }
            ],
            cheatCycleType: [
                { required: true, type: 'string', trigger: 'change' }
            ],
            limitNum: [
                { required: true, type: 'number', min: 1, message: '不能为空，请输入', trigger: 'blur' }
            ],
            limitParentSn: [
                { required: true, type: 'number', min: 1, message: '不能为空，请输入', trigger: 'blur' }
            ]
        }
      }
    },
    beforeCreate() {
        this.refName = "formValidate" + Date.now()
    },
    methods: {
        handleSubmit (name, fnValid) {
            this.$refs[this.refName].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
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
        parentHandleSubmit() {
            this.handleSubmit('formValidate', (valid) => {
                return this.$emit('modalOk', valid, this.formValidate)
            })
        },
        parentHandleReset() {
            this.handleReset('formValidate', () => {
                return this.$emit('modalCancel', 'resetOk')
            })
        }
    }
  }
</script>

<style lang="stylus" scoped>
</style>

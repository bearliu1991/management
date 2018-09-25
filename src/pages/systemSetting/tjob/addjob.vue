<template>
    <div class="customer-save">
        <h1>{{title}}</h1>
        <Form class="form-page" :ref="refName" :model="formValidate" :rules="ruleValidate" :label-width="200">
            <FormItem label="名称" prop="jobName">
                <Input v-model="formValidate.jobName"></Input>
            </FormItem>
            <FormItem label="类型" prop="jobType">
                <Input v-model="formValidate.jobType"></Input>
            </FormItem>
            <FormItem label="类bean名称" prop="jobBean">
                <Input v-model="formValidate.jobBean"></Input>
            </FormItem>
            <FormItem label="任务池类型" prop="jobPool">
                <RadioGroup v-model="formValidate.jobPool">
                    <Radio label="none">不使用线程池</Radio>
                    <Radio label="custom">自定义线程池</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="触发类型" prop="triggerType">
                <RadioGroup v-model="formValidate.triggerType">
                    <Radio label="simple">简单模式</Radio>
                    <Radio label="cron">cron表达式模式</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="重复次数" prop="repeatCount">
                <InputNumber v-model="formValidate.repeatCount"></InputNumber>
            </FormItem>
            <FormItem label="重复间隔" prop="repeatInterval">
                <InputNumber v-model="formValidate.repeatInterval"></InputNumber>
            </FormItem>
            <FormItem label="cron表达式" prop="cronExpression">
                <Input v-model="formValidate.cronExpression"></Input>
            </FormItem>
            <FormItem label="状态" prop="status">
                <RadioGroup v-model="formValidate.status">
                    <Radio label="ACTIVE">启用</Radio>
                    <Radio label="INACTIVE">停用</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="执行优先级" prop="priority">
                <InputNumber v-model="formValidate.priority"></InputNumber>
            </FormItem>
            <FormItem label="延迟执行时间" prop="delay">
                <InputNumber v-model="formValidate.delay"></InputNumber>
            </FormItem>
            <FormItem label="线程最小数量" prop="minPoolSize">
                <InputNumber v-model="formValidate.minPoolSize"></InputNumber>
            </FormItem>
            <FormItem label="线程最大数量" prop="maxPoolSize">
                <InputNumber v-model="formValidate.maxPoolSize"></InputNumber>
            </FormItem>
            <FormItem label="心跳时间" prop="keepAliveTime">
                <InputNumber v-model="formValidate.keepAliveTime"></InputNumber>
            </FormItem>
            <FormItem label="缓存容量" prop="cacheQueueCapacity">
                <InputNumber v-model="formValidate.cacheQueueCapacity"></InputNumber>
            </FormItem>
            <FormItem label="服务器的IP" prop="serverIp">
                <Input v-model="formValidate.serverIp" ></Input>
            </FormItem>
            <FormItem label="备份" prop="serverIpBak">
                <Input v-model="formValidate.serverIpBak"></Input>
            </FormItem>
            <FormItem label="描述" prop="description" class="customer-save-textarea">
                <Input type="textarea" v-model="formValidate.description" ></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
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
        },
        data: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
      return {
        refName:'',
        ruleValidate: {
            jobName: [
                { required: true, type: 'string', min: 1, message: '名称不能为空', trigger: 'blur' }
            ],
            description: [
                { required: true, type: 'string', min: 1, message: '描述不能为空', trigger: 'blur' }
            ],
            jobType: [
                { required: true, type: 'string', min: 1, message: '类型不能为空', trigger: 'blur' }
            ]
        },
        dataInit: {
            jobName: '',
            description: '',
            jobType: '',
            jobBean: '',
            jobPool: 'none',
            triggerType: 'simple',
            repeatCount: null,
            repeatInterval: null,
            cronExpression: '',
            status: '',
            priority: null,
            delay: null,
            minPoolSize: 3,
            maxPoolSize: 10,
            keepAliveTime: 30,
            cacheQueueCapacity: 0,
            serverIp: '',
            serverIpBak: ''
        }
      }
    },
    beforeCreate() {
        this.refName = "addJob" + Date.now();
    },
    computed: {
        formValidate() {
            if (Object.keys(this.data).length) {
                return this.mergeObj(this.dataInit, this.data)
                // this.dataInit = this._transformData(this.data, {
                //     jobName: "jobName",
                //     description: "description",
                //     jobType: "jobType",
                //     jobBean: "jobBean",
                //     jobPool: "jobPool",
                //     triggerType: "triggerType",
                //     repeatCount: "repeatCount",
                //     repeatInterval: "repeatInterval",
                //     cronExpression: "cronExpression",
                //     status: "status",
                //     priority: "priority",
                //     delay: "delay",
                //     minPoolSize: "minPoolSize",
                //     maxPoolSize: "maxPoolSize",
                //     keepAliveTime: "keepAliveTime",
                //     cacheQueueCapacity: "cacheQueueCapacity",
                //     serverIp: "serverIp",
                //     serverIpBak: "serverIpBak"
                // })
            } else {
                return this.dataInit
            }
        }
    },
    created() {
        console.log(this.id);
    },
    methods: {
        handleSubmit (name, fnValid) {
            this.$refs[this.refName].validate((valid) => {
                if (valid) {
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
            console.log(val)
            if (this.api) {
                this.$post(this.api, val).then(res => {
                    this.$router.push({
                        name: 'job',
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
          margin-bottom 20px
          &.customer-save-textarea
              height auto
</style>

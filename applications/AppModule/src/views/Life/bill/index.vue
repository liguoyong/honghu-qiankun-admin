<template>
    <div class="lifePay-container layout-wrapper">
        <el-form :inline="true" :model="ruleForm" ref="noteFormRef" @submit.prevent class="filter-container">
            <el-form-item label="交易分类" prop="payType">
                <el-select v-model="ruleForm.payType" clearable placeholder="请选择分类">
                    <el-option v-for="item in payTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="收/支" prop="consume">
                <el-select v-model="ruleForm.consume" clearable placeholder="请选择分类">
                    <el-option v-for="item in consumeOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <div class="block">
                    <el-date-picker v-model="dateRange" type="daterange" unlink-panels range-separator="至"
                        start-placeholder="开始时间" end-placeholder="结束时间" :shortcuts="shortcuts" :size="size"
                        value-format="YYYY-MM-DD HH:mm:ss" />
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button @click="resetForm(noteFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- <div>
            <el-upload class="upload-demo" action="" :on-change="handleChange" :before-upload="beforeUpload">
                <el-button type="primary">点击上传</el-button>
            </el-upload>
        </div> -->
        <div class="btns-container">
            <el-upload class="upload-demo" action="" :on-change="handleChange" :before-upload="beforeUpload">
                <el-button type="primary" @click="handelCreateNote">
                    <el-icon color="#fff" style="margin-right: 8px;">
                        <Plus />
                    </el-icon>导入微信账单
                </el-button>
            </el-upload>
            <el-upload class="upload-demo" action="" :on-change="handleALiChange" :before-upload="beforeUpload">
                <el-button type="primary" @click="handelCreateNote">
                    <el-icon color="#fff" style="margin-right: 8px;">
                        <Plus />
                    </el-icon>导入支付宝账单
                </el-button>
            </el-upload>
            <el-button type="primary" style="margin-left: 8px;" @click="handelClickBillAnalysis">账单数据分析</el-button>

        </div>
        <!-- 交易时间	交易分类	交易对方	对方账号	商品说明	收/支	金额	收/付款方式	交易状态	交易订单号	商家订单号	备注 -->
        <el-table ref="multipleTableRef" :data="tableData" stripe style="width: 100%" @row-dblclick="handelClickViewDetail"
            :tooltip-options="tooltipOptions" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="transactionNumber" label="订单编号" />
            <el-table-column prop="payTime" label="交易时间" />
            <el-table-column prop="payType" label="交易分类" />
            <el-table-column prop="payUser" label="交易对方" />
            <el-table-column prop="payAccount" label="对方账号" />
            <el-table-column prop="goods" label="商品说明" show-overflow-tooltip />
            <el-table-column prop="consume" label="收/支" />
            <el-table-column prop="amount" label="金额" />
            <el-table-column prop="payWay" label="收/付款方式" />
            <el-table-column prop="status" label="当前状态" />
            <!-- <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="handleClickEdit(scope.row.id)">编辑</el-button>
                    <el-button link type="danger" size="small" @click="handleClickDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column> -->
            <template #empty>
                <data-empty></data-empty>
            </template>
        </el-table>
        <div class="common-pagination">
            <com-pagination :current-page="pageParams.page" :page-size="pageParams.size" :total="pageParams.total"
                @size-change="handleSizeChange" :pageSizes="[10, 20, 50, 100, 1000]"
                @current-change="handleCurrentChange" />
        </div>
        <editPayDialog :dialog="PayDialog" @close="closeDialog" />
        <editPayDrawer :drawer="drawer" />
    </div>
</template>
<script lang="ts" setup>
interface bill {
    payTime: string
    payType: string
    payUser: string
    payAccount: string
    goods: string
    consume: string
    amount: string
    payWay: string
    status: string
    transactionNumber: string
    commercialOrder: string,
    remark: string
}
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import editPayDialog from '../components/editPayDialog.vue'
import editPayDrawer from '../components/editPayDrawer.vue'
import * as XLSX from 'xlsx'
import { tooltipOptions } from '@/utils/common'
import { getBillsList } from '@/api/bills'
import { objectPick } from '@vueuse/shared'
const tableData = ref([])
const noteFormRef = ref<FormInstance>()
const dateRange: any = ref(null)
const multipleTableRef = ref()
const multipleSelection = ref<bill[]>([])

const drawer = reactive({
    show: false,
    title: '查看详情',
    data: {}
})

const ruleForm = reactive({
    payType: '',
    consume: ''
})

const pageParams = reactive({
    page: 1,
    size: 10,
    total: 0
})

const PayDialog = reactive({
    show: false,
    data: []
})
const payTypeOptions = reactive([{
    value: '投资理财',
    label: '投资理财'
}, {
    value: '交通出行',
    label: '交通出行'
}, {
    value: '餐饮美食',
    label: '餐饮美食'
}, {
    value: '转账红包',
    label: '转账红包'
}, {
    value: '日用百货',
    label: '日用百货'
}, {
    value: '爱车养车',
    label: '爱车养车'
}, {
    value: '文化休闲',
    label: '文化休闲'
}, {
    value: '信用借还',
    label: '信用借还'
}, {
    value: '服饰装扮',
    label: '服饰装扮'
}])

const consumeOptions = reactive([{
    value: '不计收支',
    label: '不计收支'
}, {
    value: '支出',
    label: '支出'
}, {
    value: '收入',
    label: '收入'
}])

const handelClickViewDetail = async () => {

}

const handleSelectionChange = (val: bill[]) => {
    multipleSelection.value = val
    console.log(multipleSelection, multipleSelection.value, ' multipleSelection.value');
}

const getList = async () => {
    const [startTime = '', endTime = ''] = dateRange.value || []
    const response = await getBillsList({ ...pageParams, ...ruleForm, startTime, endTime })
    if (response.code == 200) {
        const { list = [], total } = response.data
        tableData.value = list
        const types = list.map((it: { payType: any }) => it.payType)
        const consume = list.map((it: { consume: any }) => it.consume)
        console.log(Array.from(new Set(types)), Array.from(new Set(consume)));

        pageParams.total = total
    }
}
getList()

const handleSizeChange = (val: number) => {
    pageParams.size = val
    getList()
}

const handleCurrentChange = (val: number) => {
    pageParams.page = val
    getList()
}

const onSearch = () => {
    pageParams.page = 1
    getList()
}

const resetForm = (formEl: FormInstance | undefined) => {
    Object.assign(pageParams, {
        page: 1,
        size: 10,
        total: 0
    })
    dateRange.value = null
    Object.assign(ruleForm, {
        payType: '',
        consume: ''
    })
    getList()
}

const handelCreateNote = () => {
}

// 账单分析
const handelClickBillAnalysis = () => {
    if (!multipleSelection.value.length) {
        ElMessage.info('请选择账单')
        return
    }
    drawer.show = true
    drawer.data = multipleSelection.value
}

const beforeUpload = (file: { type: any }) => {
    const fileType = file.type
    const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
    const isValidType = validTypes.includes(fileType)
    if (!isValidType) {
        ElMessage.error('只能上传 CSV 或 XLSX 文件')
        return false
    }
}

const handleChange = (file: { raw: Blob }) => {
    const reader = new FileReader()

    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array', codepage: 65001 })

        // 处理 workbook 中的数据
        // ...

        // 示例：打印第一个工作表中的数据
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 })
        const formattedData = jsonData.map((row: any) => {
            // 转换第一列的时间数据（假设第一列是时间数据）
            const rowFirst = row[0] || ''
            if (typeof rowFirst === 'number') {
                const dateValue = XLSX.SSF.parse_date_code(row[0])
                const formattedDate = dateValue ? dateValue.y + '/' + dateValue.m + '/' + dateValue.d + ' ' + dateValue.H + ':' + dateValue.M + ':' + dateValue.S : ''
                // 返回转换后的数据
                return [formattedDate, ...row.slice(1)]
            } else {
                return row
            }
        })
        const index = formattedData.findIndex((item: string[]) => item[0] === '----------------------微信支付账单明细列表--------------------')
        const endIndex = formattedData.length
        const list = formattedData.slice(index + 2, endIndex)
        tableData.value = list.map((item: [any, any, any, any, any, any, any, any, any, any, any]) => {
            // ['交易时间', '交易类型', '交易对方', '商品', '收/支', '金额(元)', '支付方式', '当前状态', '交易单号', '商户单号', '备注']
            const [
                payTime,
                payType,
                payUser,
                goods,
                consume,
                amount,
                payWay,
                status,
                transactionNumber,
                commercialOrder,
                remark
            ] = item
            return {
                payTime,
                payType,
                payUser,
                goods,
                consume,
                amount,
                payWay,
                status,
                transactionNumber,
                commercialOrder,
                remark
            }
        })
        console.log(formattedData, index, tableData, 'formattedData');
    }

    reader.readAsArrayBuffer(file.raw)
}

const handleALiChange = (file: { raw: Blob }) => {
    const reader = new FileReader()

    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array', codepage: 65001 })

        // 处理 workbook 中的数据

        // 示例：打印第一个工作表中的数据
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 })

        const formattedData = jsonData.map((row: any) => {
            // 转换第一列的时间数据（假设第一列是时间数据）
            const rowFirst = row[0] || ''
            if (typeof rowFirst === 'number') {
                const dateValue = XLSX.SSF.parse_date_code(row[0])
                const formattedDate = dateValue ? dateValue.y + '/' + dateValue.m + '/' + dateValue.d + ' ' + dateValue.H + ':' + dateValue.M + ':' + dateValue.S : ''
                // 返回转换后的数据
                return [formattedDate, ...row.slice(1)]
            } else {
                return row
            }
        })
        const endIndex = formattedData.length
        const list = formattedData.slice(1, endIndex)
        PayDialog.show = true
        PayDialog.data = list.map((item: [any, any, any, any, any, any, any, any, any, any, any, any]) => {
            // ['交易时间', '交易类型', '交易对方', '商品', '收/支', '金额(元)', '支付方式', '当前状态', '交易单号', '商户单号', '备注']
            const [
                payTime,
                payType,
                payUser,
                payAccount,
                goods,
                consume,
                amount,
                payWay,
                status,
                transactionNumber,
                commercialOrder,
                remark
            ] = item
            return {
                payTime,
                payType,
                payUser,
                payAccount,
                goods,
                consume, amount,
                payWay,
                status,
                transactionNumber,
                commercialOrder,
                remark
            }
        })
        console.log(formattedData, tableData, 'formattedData');
    }

    reader.readAsArrayBuffer(file.raw)
}

const closeDialog = () => {
    pageParams.page = 1
    getList()
}

const size = ref<'default' | 'large' | 'small'>('default')

const shortcuts = [
    {
        text: '近一周',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
        },
    },
    {
        text: '近一月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
        },
    },
    {
        text: '近三月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
        },
    },
]

</script>
<style lang="scss" scoped>
.upload-demo {
    display: inline-block;
    vertical-align: top;

    &+.upload-demo {
        margin-left: 12px
    }
}
</style>

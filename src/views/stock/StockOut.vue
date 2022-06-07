<template>
    <div class="container">
        <div class="order">
            <div class="order__name">
                <div>
                    销售出库
                </div>
                <el-button size="mini" type="primary" @click="submit">出库</el-button>
            </div>
            <el-form :model="postForm">
                <div class="order__container">
                    <el-row>
                        <el-col :span="24">
                            <el-row>
                                <el-col :span="10">
                                    <el-form-item label="出库日期:">
                                        <el-date-picker class="info-content" v-model="postForm.deliveryDate"
                                            type="datetime" format="YYYY-MM-DD" value-format="YYYY-MM-DD hh:mm:ss"
                                            placeholder="选择日期" />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="客户:">
                                        <el-select class="info-content" v-model="postForm.customerId" filterable
                                            placeholder="请输入关键词" remote>
                                            <el-option v-for="item in supplierList" :key="item.id" :label="item.name"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6">
                                    <el-form-item label="销售人员:">
                                        <el-select class="info-content" v-model="postForm.ownerId" filterable searchable
                                            placeholder="请选择">
                                            <el-option v-for="item in staffList" :key="item.id" :label="item.name"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
        </div>

        <div class="goods-list">
            <el-table :data="list" border show-summary :summary-method="getSummaries" class="table"
                header-cell-class-name="table-header">
                <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
                <el-table-column prop="unit" label="商品单位" align="center"></el-table-column>
                <el-table-column prop="goodsNum" label="数量" width="160" align="center">
                    <template #default="scope">
                        <el-input-number v-model="scope.row.goodsNum" :min="1"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column prop="goodsPrice" label="单价" align="center" width="160">
                    <template #default="scope">
                        <el-input-number v-model="scope.row.goodsPrice" :precision="2" :step="0.1" :min="0" />
                    </template>
                </el-table-column>
                <el-table-column prop="amount" label="金额" align="center"></el-table-column>
                <el-table-column prop="warehouse" label="仓库">
                    <template #default="scope">
                        <el-select v-model.number="scope.row.warehouseId" placeholder="" class="handle-select mr10">
                            <el-option v-for="item in warehouseList" :key="item.id" :label="item.name"
                                :value="item.id" />
                        </el-select>
                    </template>

                </el-table-column>
                <el-table-column prop="msg" label="备注" align="center">
                    <template #default="scope">
                        <el-input type="text" v-model="scope.row.msg"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120" align="center">
                    <template #default="scope">
                        <el-button @click.native.prevent="deleteRow(scope.$index, list)" type="text" size="small">
                            移除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="goods-list__operate">
                <el-tag @click="addGoods">添加商品</el-tag>
            </div>
            <el-dialog v-model="addVisible" top="5vh" width="1050px" title="选择商品">
                <el-table :data="tableData" border stripe class="table" ref="multipleTable"
                    header-cell-class-name="table-header" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="50" />
                    <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                    <el-table-column prop="name" label="商品名称"></el-table-column>
                    <el-table-column prop="unit" label="商品单位"></el-table-column>
                    <el-table-column prop="category" label="商品分类"></el-table-column>
                    <el-table-column prop="createdDate" label="创建时间"></el-table-column>
                </el-table>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="addVisible = false">取 消</el-button>
                        <el-button type="primary" @click="saveChoose">确 定</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { reactive, ref, watch } from 'vue';
import { ElMessage, ElMessageBox } from "element-plus";
import { getAllCustomer, getAllUser, getAllWarehouse, getGoods, addStockOut } from "../../api/index";

export default {
    setup() {
        // 获取可选择的数据
        let supplierList = ref([])
        getAllCustomer().then((res) => {
            supplierList.value = res
        })
        let staffList = ref([])
        getAllUser().then(res => {
            staffList.value = res
        })
        let warehouseList = ref([])
        getAllWarehouse().then((res) => {
            warehouseList.value = res
        })

        const list = ref([])

        // 选择商品
        const addVisible = ref(false)
        const query = reactive({
            pageNum: 1,
            pageSize: 0,
            categoryId: -1,
            name: ""
        });
        const tableData = ref([]);
        const multipleSelection = ref([])
        const handleSelectionChange = (val) => {
            multipleSelection.value = val
        }
        const getData = () => {
            getGoods(query).then((res) => {
                tableData.value = res.data.list;

            });
        };

        const addGoods = () => {
            addVisible.value = true;
            // 获取表格数据
            query.pageNum = 1;
            getData();
        }
        const saveChoose = () => {
            list.value = multipleSelection.value
            list.value.forEach(item => {
                item.goodsNum = 1;
                item.goodsPrice = 1.0
                item.goodsId = item.id
            })
            addVisible.value = false;
        }


        // 计算金额
        const totalAmount = ref()
        const getSummaries = (param) => {
            const { columns, data } = param
            const sums = ref([])
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums.value[index] = '合计'
                    return
                }
                else if (index == 4) {
                    const values = data.map((item) => Number(item[column.property]))
                    if (!values.every((value) => Number.isNaN(value))) {
                        totalAmount.value = Math.round(values.reduce((prev, curr) => {
                            const value = Number(curr)
                            if (!Number.isNaN(value)) {
                                return prev + curr
                            } else {
                                return prev
                            }
                        }, 0) * 1000) / 1000
                        sums[index] = `${totalAmount.value}`
                    } else {
                        sums[index] = 'N/A'
                    }
                }

            })
            return sums
        }
        watch(list, (val, oldVal) => {
            val.forEach((item) => {
                let sum = Number(item.goodsPrice) * Number(item.goodsNum);
                if (!isNaN(sum)) {
                    // item.amount = _.floor(sum, 2);
                    item.amount = Math.round(sum * 100) / 100
                } else {
                    item.amount = "";
                }
            });
        }, { deep: true })
        const deleteRow = (index) => {
            list.value.splice(index, 1)
        }
        const postForm = reactive({
            deliveryDate: "",
            customerId: "",
            ownerId: "",

        })
        const submit = () => {
            ElMessageBox.confirm("确认入库？", "提示", {
                type: "primary",
            }).then(() => {
                postForm.amount = totalAmount.value;
                postForm.goodsList = list.value
                console.log(postForm);
                addStockOut(postForm).then(res => {
                    ElMessage.info("成功")
                })
            }
            ).catch(() => { });
        }
        return {
            supplierList,
            staffList,
            warehouseList,
            list,
            addVisible,
            tableData,
            multipleSelection,
            handleSelectionChange,
            addGoods,
            saveChoose,
            getSummaries,
            deleteRow,
            submit,
            postForm
        }
    }
}


</script>

<style scoped>
.container {
    padding: 10px;
}

.order {
    padding: 2px 5px;
}

.order__name {
    width: 100%;
    margin-bottom: 10px;
    font-size: 18px;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
}

.order__container {
    padding: 10px 10px;
    background: #fff;
    padding-bottom: 0px;
}

.info-content {
    width: 180px;
}

.goods-list__operate {
    margin-top: 8px;
}

.pagination {
    margin-bottom: 0;
}

.el-dialog__body {
    padding-bottom: 0px !important;
}

.dialog-footer {
    margin-top: 0px;
}
</style>
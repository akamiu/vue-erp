<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="query.warehouseId" placeholder="仓库" class="handle-select mr10"
                    @change="handleSearch">
                    <el-option key="-1" label="全部" :value="-1" />
                    <el-option v-for="item in warehouse" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <div class="row2">
                <el-button type="primary" @click="handleAdd">新增
                    <i class="el-icon-circle-plus-outline"></i>
                </el-button>
                <el-button type="danger" @click="deleteBatch">批量删除
                    <i class="el-icon-remove-outline"></i>
                </el-button>
            </div>
            <el-table :data="tableData" border stripe class="table" ref="multipleTable"
                header-cell-class-name="table-header" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" />
                <el-table-column prop="warehouseId" v-if="false"></el-table-column>
                <el-table-column prop="goodsId" v-if="false"></el-table-column>
                <el-table-column prop="warehouse" label="仓库" align="center"></el-table-column>
                <el-table-column prop="goodsName" label="商品名称" align="center"></el-table-column>
                <el-table-column prop="unit" label="商品单位" align="center"></el-table-column>
                <el-table-column prop="category" label="商品分类" align="center"></el-table-column>
                <el-table-column prop="num" label="数量" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red"
                            @click="handleDelete(scope.row.warehouseId, scope.row.goodsId)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background layout="total, prev, pager, next" :current-page="query.pageNum"
                    :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" v-model="editVisible" width="30%">
            <el-form label-width="70px">
                <el-form-item label="数量">
                    <el-input v-model.number="form.num"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </template>
        </el-dialog>


        <!-- 添加库存弹出框 -->
        <el-dialog title="编辑" v-model="addVisible" width="30%">
            <el-form label-width="70px">
                <el-form-item label="仓库">
                    <el-select v-model.number="addForm.warehouseId" placeholder="" class="handle-select mr10">
                        <el-option v-for="item in warehouse" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="商品">
                    <el-select v-model.number="addForm.goodsId" placeholder="" filterable class="handle-select mr10"
                        @visible-change="getRemainGoods">
                        <el-option v-for="item in remainGoods" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="数量">
                    <el-input v-model.number="addForm.num"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveAdd">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { getStock, updateStock, addStock, deleteStock, deleteBatchStock, getAllWarehouse, getGoodsNotInWarehouse } from "../../api/index";

export default {
    name: "Stock",
    setup() {
        const query = reactive({
            pageNum: 1,
            pageSize: 5,
            warehouseId: -1,
        });
        const tableData = ref([]);
        const pageTotal = ref(0);
        // 获取表格数据
        const getData = () => {
            getStock(query).then((res) => {
                tableData.value = res.data.list;
                pageTotal.value = res.data.total || 50;
            });
        };
        getData();
        // 获取所有仓库
        const warehouse = ref([]);
        getAllWarehouse().then((res) => {
            warehouse.value = res;
        })


        // 查询操作
        const handleSearch = () => {
            query.pageNum = 1;
            getData();
        };
        // 分页导航
        const handlePageChange = (val) => {
            query.pageNum = val;
            getData();
        };


        // 删除操作
        const handleDelete = (id1, id2) => {
            // 二次确认删除
            ElMessageBox.confirm("确定要删除吗？", "提示", {
                type: "warning",
            }).then(() => {
                deleteStock(id1, id2).then((res) => {
                    if (res) {
                        ElMessage.success("删除成功");
                        getData()
                    } else {
                        ElMessage.error("删除失败")
                    }
                })
            }).catch(() => { });
        };

        // 编辑数量
        const editVisible = ref(false);
        let form = reactive({
            num: ""
        });
        const handleEdit = (index, row) => {
            Object.keys(row).forEach((item) => {
                form[item] = row[item];
            });
            editVisible.value = true;
        };
        const saveEdit = () => {
            editVisible.value = false;
            updateStock(form).then(res => {
                if (res) {
                    ElMessage({
                        message: '成功',
                        type: 'success',
                    })
                } else {
                    ElMessage({
                        message: '失败',
                        type: 'error',
                    })
                }
                getData()
            })
        };

        // 添加商品
        const addVisible = ref(false)
        let addForm = reactive({
            warehouseId: "",
            goodsId: "",
            num: ""
        })
        // 添加商品
        const handleAdd = () => {
            Object.keys(addForm).forEach((item) => {
                addForm[item] = "";
            });
            addVisible.value = true;
        }
        const saveAdd = () => {
            addVisible.value = false;
            addStock(addForm).then(res => {
                if (res) {
                    ElMessage({
                        message: '成功',
                        type: 'success',
                    })
                } else {
                    ElMessage({
                        message: '失败',
                        type: 'error',
                    })
                }
                getData()
            })
        };
        //获取不在仓库的商品商品
        const remainGoods = ref([])
        const getRemainGoods = () => {
            if (addForm.warehouseId === "")
                return
            let remainGoodsQuery = { warehouseId: addForm.warehouseId }
            getGoodsNotInWarehouse(remainGoodsQuery).then(res => {
                remainGoods.value = res;
            })
        }

        // 批量删除
        const multipleSelection = ref([])
        const handleSelectionChange = (val) => {
            multipleSelection.value = val
        }
        const deleteBatch = () => {
            let ids = multipleSelection.value.map(v => "(" + v.warehouseId + "," + v.goodsId + ")")
            ElMessageBox.confirm("确定要批量删除这些数据吗？", "提示", {
                type: "warning",
            }).then(() => {
                deleteBatchStock(ids).then((res) => {
                    if (res) {
                        ElMessage({
                            message: '成功',
                            type: 'success',
                        })
                        getData()
                    } else {
                        ElMessage({
                            message: '失败',
                            type: 'error',
                        })
                    }
                })
            }).catch(() => { });
        }
        return {
            query,
            tableData,
            pageTotal,
            editVisible,
            form,
            addVisible,
            addForm,
            saveAdd,
            warehouse,
            handleSearch,
            handlePageChange,
            handleDelete,
            handleEdit,
            saveEdit,
            handleAdd,
            handleSelectionChange,
            deleteBatch,
            getRemainGoods,
            remainGoods
        };
    },
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 8px;
}

.row2 {
    margin-bottom: 8px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}

.table {
    width: 100%;
    font-size: 14px;
}

.red {
    color: #ff0000;
}

.mr10 {
    margin-right: 10px;
}

.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>

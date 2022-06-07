<template>
    <div>

        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.name" placeholder="名称" suffix-icon="el-icon-search" class="handle-input mr10">
                </el-input>
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
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="类别名称"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row.id)">删除
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
                <el-form-item label="类别名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { getCategory, updateCategory, deleteCategory, deleteBatchCategory } from "../../api/index";

export default {
    name: "GoodsCategory",
    setup() {
        const query = reactive({
            pageNum: 1,
            pageSize: 5,
        });
        const tableData = ref([]);
        const pageTotal = ref(0);
        // 获取表格数据
        const getData = () => {
            getCategory(query).then((res) => {
                tableData.value = res.data.list;
                pageTotal.value = res.data.total || 50;
            });
        };
        getData();
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
        const handleDelete = (id) => {
            // 二次确认删除
            ElMessageBox.confirm("确定要删除吗？", "提示", {
                type: "warning",
            }).then(() => {
                deleteCategory(id).then((res) => {
                    if (res) {
                        ElMessage.success("删除成功");
                        getData()
                    } else {
                        ElMessage.error("删除失败")
                    }
                })
            }).catch(() => { });
        };

        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        let form = reactive({
            name: ""
        });
        const handleEdit = (index, row) => {
            Object.keys(row).forEach((item) => {
                form[item] = row[item];
            });
            editVisible.value = true;
        };
        const saveEdit = () => {
            editVisible.value = false;
            console.log(form);
            updateCategory(form).then(res => {
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
        const handleAdd = () => {
            Object.keys(form).forEach((item) => {
                form[item] = "";
            });
            editVisible.value = true;
        }

        // 批量删除
        const multipleSelection = ref([])
        const handleSelectionChange = (val) => {
            multipleSelection.value = val
        }
        const deleteBatch = () => {

            let ids = multipleSelection.value.map(v => v.id)
            ElMessageBox.confirm("确定要批量删除这些数据吗？", "提示", {
                type: "warning",
            }).then(() => {
                deleteBatchCategory(ids).then((res) => {
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
            handleSearch,
            handlePageChange,
            handleDelete,
            handleEdit,
            saveEdit,
            handleAdd,
            handleSelectionChange,
            deleteBatch
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

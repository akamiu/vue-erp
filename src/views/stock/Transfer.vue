<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-tag size="large">转出仓库：</el-tag>&nbsp;
                <el-select v-model.number="query.warehouseId" placeholder="" class="handle-select mr10"
                    @change="handleSearch">
                    <el-option v-for="item in warehouse" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
                <el-tag size="large" type="success" style="margin-left: 40px;">转入仓库：</el-tag>&nbsp;
                <el-select v-model.number="postForm.toId" placeholder="" class="handle-select mr10">
                    <template v-for="item in warehouse" :key="item.id">
                        <el-option v-if="item.id != query.warehouseId" :label="item.name" :value="item.id" />
                    </template>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="handleTransfer">转仓</el-button>
            </div>
            <el-table :data="tableData" border stripe class="table" header-cell-class-name="table-header"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" />
                <el-table-column prop="warehouseId" v-if="false"></el-table-column>
                <el-table-column prop="goodsId" v-if="false"></el-table-column>
                <el-table-column prop="warehouse" label="仓库" align="center"></el-table-column>
                <el-table-column prop="goodsName" label="商品名称" align="center"></el-table-column>
                <el-table-column prop="unit" label="商品单位" align="center"></el-table-column>
                <el-table-column prop="num" label="库存数量" align="center"></el-table-column>
                <el-table-column prop="category" label="商品分类" align="center"></el-table-column>
                <el-table-column label="转移数量" width="160" align="center">
                    <template #default="scope">
                        <el-input-number v-model="scope.row.goodsNum" :min="1" :max="scope.row.num"></el-input-number>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { getStock, getAllWarehouse, addTransfer } from "../../api/index";

const query = reactive({
    pageNum: 1,
    pageSize: 0,
    warehouseId: 1,
});
const tableData = ref([]);
// 获取表格数据
const getData = () => {
    getStock(query).then((res) => {
        tableData.value = res.data.list;
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
// 批量
const multipleSelection = ref([])
const handleSelectionChange = (val) => {
    multipleSelection.value = val
}
const postForm = reactive({
    fromId: 1,
    toId: 2,
    goodsList: []
})
const handleTransfer = () => {
    ElMessageBox.confirm("确认入库？", "提示", {
        type: "primary",
    }).then(() => {
        postForm.fromId = query.warehouseId;
        postForm.goodsList = multipleSelection.value;
        console.log(postForm);
        addTransfer(postForm).then(res => {
            ElMessage.success("成功")
            getData()
        })
    }
    ).catch(() => { });
}
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

<template>
    <div class="container">
        <div class="handle-box">

            <el-row>
                <el-col :span="10">
                    <span style="font-size: 14px">选择日期：</span>
                    <el-date-picker v-model="postForm" type="datetimerange" range-separator="To"
                        value-format="YYYY-MM-DD HH:mm:ss" start-placeholder="Start date" end-placeholder="End date" />

                </el-col>

                <el-col :span="4">
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                </el-col>
            </el-row>

        </div>
        <div class="goods-list">
            <el-table :data="tableData" border class="table" header-cell-class-name="table-header">
                <el-table-column prop="id" label="ID" align="center"></el-table-column>
                <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
                <el-table-column prop="outSum" label="销售数量" align="center"></el-table-column>
                <el-table-column prop="inSum" label="进货数量" align="center"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import { ElMessage, ElMessageBox } from "element-plus";
import { getStatistics } from "../../api/index";
const tableData = ref([]);

const postForm = ref(["2022-06-01 00:00:00",
    "2022-06-10 00:00:00"])


const getData = () => {
    console.log(postForm.value);
    getStatistics(postForm.value).then(res => {
        tableData.value = res;
    })
};
const handleSearch = () => {
    getData();
}




</script>

<style scoped>
.container {
    padding: 10px;
}

.info-content {
    width: 180px;
}


.handle-box {
    margin-bottom: 8px;
    margin-top: 20px;
}

.mr10 {
    margin-right: 10px;
}
</style>
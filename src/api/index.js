// import { method } from 'lodash';
import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};
// 商品管理
export const getGoods = query => {
    return request({
        url: 'http://localhost:9999/goods/page',
        method: 'get',
        params: query
    })
}
export const getAllGoods = () => {
    return request({
        url: 'http://localhost:9999/goods',
        method: 'get'
    })
}
// 添加和更新
export const updateGoods = query => {
    return request({
        url: 'http://localhost:9999/goods',
        method: 'post',
        data: query
    })
}
// 删除商品
export const deleteGoods = id => {
    return request({
        url: `http://localhost:9999/goods/${id}`,
        method: 'delete',
    })
}
export const deleteBatchGoods = ids => {
    return request({
        url: `http://localhost:9999/goods/del`,
        method: 'post',
        data: ids
    })
}
//-------------------------------------------------------------
// 类别管理
export const getCategory = query => {
    return request({
        url: 'http://localhost:9999/category/page',
        method: 'get',
        params: query
    })
}
export const getAllCategory = () => {
    return request({
        url: 'http://localhost:9999/category',
        method: 'get'
    })
}
// 添加和更新
export const updateCategory = query => {
    return request({
        url: 'http://localhost:9999/category',
        method: 'post',
        data: query
    })
}
// 删除类型
export const deleteCategory = id => {
    return request({
        url: `http://localhost:9999/category/${id}`,
        method: 'delete',
    })
}
export const deleteBatchCategory = ids => {
    return request({
        url: `http://localhost:9999/category/del`,
        method: 'post',
        data: ids
    })
}
// ------------------------------------------------------------
// 用户管理
export const getUser = query => {
    return request({
        url: 'http://localhost:9999/user/page',
        method: 'get',
        params: query
    })
}
export const getAllUser = () => {
    return request({
        url: 'http://localhost:9999/user',
        method: 'get'
    })
}
// 添加和更新
export const updateUser = query => {
    return request({
        url: 'http://localhost:9999/user',
        method: 'post',
        data: query
    })
}
// 删除
export const deleteUser = id => {
    return request({
        url: `http://localhost:9999/user/${id}`,
        method: 'delete',
    })
}
export const deleteBatchUser = ids => {
    return request({
        url: `http://localhost:9999/user/del`,
        method: 'post',
        data: ids
    })
}
// ------------------------------------------------------------
// 仓库管理
export const getWarehouse = query => {
    return request({
        url: 'http://localhost:9999/warehouse/page',
        method: 'get',
        params: query
    })
}
export const getAllWarehouse = () => {
    return request({
        url: 'http://localhost:9999/warehouse',
        method: 'get'
    })
}
// 添加和更新
export const updateWarehouse = query => {
    return request({
        url: 'http://localhost:9999/warehouse',
        method: 'post',
        data: query
    })
}
// 删除仓库
export const deleteWarehouse = id => {
    return request({
        url: `http://localhost:9999/warehouse/${id}`,
        method: 'delete',
    })
}
export const deleteBatchWarehouse = ids => {
    return request({
        url: `http://localhost:9999/warehouse/del`,
        method: 'post',
        data: ids
    })
}

// ------------------------------------------------------------
// 供应商管理
export const getSupplier = query => {
    return request({
        url: 'http://localhost:9999/supplier/page',
        method: 'get',
        params: query
    })
}
export const getAllSupplier = () => {
    return request({
        url: 'http://localhost:9999/supplier',
        method: 'get',
    })
}
// 添加和更新
export const updateSupplier = query => {
    return request({
        url: 'http://localhost:9999/supplier',
        method: 'post',
        data: query
    })
}
// 删除供应商
export const deleteSupplier = id => {
    return request({
        url: `http://localhost:9999/supplier/${id}`,
        method: 'delete',
    })
}
export const deleteBatchSupplier = ids => {
    return request({
        url: `http://localhost:9999/supplier/del`,
        method: 'post',
        data: ids
    })
}


// ------------------------------------------------------------
// 客户管理
export const getCustomer = query => {
    return request({
        url: 'http://localhost:9999/customer/page',
        method: 'get',
        params: query
    })
}
export const getAllCustomer = () => {
    return request({
        url: 'http://localhost:9999/customer',
        method: 'get',
    })
}
// 添加和更新
export const updateCustomer = query => {
    return request({
        url: 'http://localhost:9999/customer',
        method: 'post',
        data: query
    })
}
// 删除
export const deleteCustomer = id => {
    return request({
        url: `http://localhost:9999/customer/${id}`,
        method: 'delete',
    })
}
export const deleteBatchCustomer = ids => {
    return request({
        url: `http://localhost:9999/customer/del`,
        method: 'post',
        data: ids
    })
}


// ------------------------------------------------------------
// 商品库存
export const getStock = query => {
    return request({
        url: 'http://localhost:9999/stock/page',
        method: 'get',
        params: query
    })
}
export const getGoodsNotInWarehouse = query => {
    return request({
        url: 'http://localhost:9999/stock/not',
        method: 'get',
        params: query
    })
}
// 添加和更新
export const updateStock = query => {
    return request({
        url: 'http://localhost:9999/stock/update',
        method: 'post',
        data: query
    })
}
export const addStock = query => {
    return request({
        url: 'http://localhost:9999/stock/add',
        method: 'post',
        data: query
    })
}
// 删除
export const deleteStock = (warehouseId, goodsId) => {
    return request({
        url: `http://localhost:9999/stock/${warehouseId}/${goodsId}`,
        method: 'delete',
    })
}

export const deleteBatchStock = ids => {
    return request({
        url: `http://localhost:9999/stock/del`,
        method: 'post',
        data: ids
    })
}


// ------------------------------------------------------------
// 添加入库
export const addStockIn = query => {
    return request({
        url: 'http://localhost:9999/stockin',
        method: 'post',
        data: query
    })
}
export const addStockOut = query => {
    return request({
        url: 'http://localhost:9999/stockout',
        method: 'post',
        data: query
    })
}
export const addTransfer = query => {
    return request({
        url: 'http://localhost:9999/transfer',
        method: 'post',
        data: query
    })
}
export const getStatistics = query => {
    return request({
        url: 'http://localhost:9999/statistics',
        method: 'post',
        data: query
    })
}




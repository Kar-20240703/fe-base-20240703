<script setup lang="ts">
import { useHook } from "@/views/base/menu/hook";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import AddFill from "@iconify-icons/ri/add-circle-line";
import {
  baseMenuDeleteByIdSet,
  BaseMenuDO
} from "@/api/http/base/BaseMenuController";
import { ExecConfirm, ToastSuccess } from "@/utils/ToastUtil";
import { watch } from "vue";

const { dataList, openDialog, onSearch, loading } = useHook();

function editClick(row: BaseMenuDO) {
  openDialog("修改菜单", row);
}

function addClick(row: BaseMenuDO) {
  openDialog("新增菜单", row);
}

function deleteClick(row: BaseMenuDO) {
  ExecConfirm(
    async () => {
      await baseMenuDeleteByIdSet({ idSet: [row.id] }).then(res => {
        ToastSuccess(res.msg);
        onSearch();
      });
    },
    undefined,
    `确定删除【${row.name}】吗？`
  );
}

watch(
  dataList,
  (newVal, oldVal) => {
    console.log("newVal", newVal);
  },
  { deep: true }
);
</script>

<template>
  <div :style="{ display: 'flex', flexDirection: 'column' }">
    <el-card>
      <el-button
        type="primary"
        :icon="useRenderIcon(AddFill)"
        @click="openDialog('新增菜单')"
      >
        新增菜单
      </el-button>
    </el-card>
    <el-table v-loading="loading" :data="dataList" border row-key="id">
      <el-table-column prop="name" label="菜单名称" />
      <el-table-column prop="path" label="路由路径" />
      <el-table-column #default="scope" prop="component" label="组件路径">
        {{ scope.row.component || scope.row.path }}
      </el-table-column>
      <el-table-column prop="orderNo" label="排序" />
      <el-table-column prop="showFlag" label="隐藏" />
      <el-table-column #default="scope" label="操作">
        <el-button
          link
          type="primary"
          :icon="useRenderIcon(EditPen)"
          @click="editClick(scope)"
        >
          修改
        </el-button>
        <el-button
          link
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="addClick({ pid: scope.row.id })"
        >
          新增
        </el-button>
        <el-button
          link
          type="primary"
          :icon="useRenderIcon(Delete)"
          @click="deleteClick(scope.row)"
        >
          删除
        </el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

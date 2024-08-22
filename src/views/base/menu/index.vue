<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  baseMenuDeleteByIdSet,
  BaseMenuDO,
  baseMenuInfoById,
  baseMenuInsertOrUpdate,
  BaseMenuPageDTO,
  baseMenuTree
} from "@/api/http/base/BaseMenuController";
import formEdit from "@/views/base/menu/formEdit.vue";
import { ExecConfirm, ToastSuccess } from "@/utils/ToastUtil";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Refresh from "@iconify-icons/ep/refresh";
import AddFill from "@iconify-icons/ri/add-circle-line";
import EditPen from "@iconify-icons/ep/edit-pen";
import Delete from "@iconify-icons/ep/delete";

defineOptions({
  name: "BaseMenu"
});

const search = ref<BaseMenuPageDTO>({});
const searchRef = ref();
const loading = ref<boolean>(false);
const dataList = ref<BaseMenuDO[]>([]);
const formRef = ref();
const higherMenuOptions = ref<BaseMenuDO[]>([]);
const title = ref<string>("");

onMounted(() => {
  onSearch();
});

function onSearch() {
  loading.value = true;
  baseMenuTree(search.value)
    .then(res => {
      dataList.value = res.data;
      if (Object.keys(search.value).length === 0) {
        higherMenuOptions.value = res.data;
      }
    })
    .finally(() => {
      loading.value = false;
    });
}

function resetSearch() {
  searchRef.value.resetFields();
  onSearch();
}

function editClick(row: BaseMenuDO) {
  title.value = "修改菜单";
  formRef.value.editOpen(baseMenuInfoById({ id: row.id }));
}

function addClick(row: BaseMenuDO) {
  title.value = "新增菜单";
  formRef.value.addOpen(row);
}

function confirmFun() {
  return baseMenuInsertOrUpdate(formRef.value.getForm().value);
}

function confirmAfterFun(res) {
  ToastSuccess(res.msg);
  onSearch();
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
</script>

<template>
  <div class="flex flex-col">
    <form-edit
      ref="formRef"
      :higher-menu-options="higherMenuOptions"
      :title="title"
      :confirm-fun="confirmFun"
      :confirm-after-fun="confirmAfterFun"
    />
    <el-form ref="searchRef" :inline="true" :model="search">
      <el-form-item label="菜单名称" prop="name">
        <el-input
          v-model="search.name"
          placeholder="请输入菜单名称"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon('ri:search-line')"
          :loading="loading"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetSearch()">
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <div class="bg-white">
      <el-button
        type="primary"
        :icon="useRenderIcon(AddFill)"
        @click="addClick({})"
      >
        新增菜单
      </el-button>
    </div>

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

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
import ExpandIcon from "@/assets/table-bar/expand.svg?component";
import {
  ICON_CLASS,
  RendTippyProps,
  ToggleRowExpansionAll
} from "@/components/RePureTableBar/src/bar";

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

const tableRef = ref();
const isExpandAll = ref<boolean>(true);

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

function onExpand() {
  isExpandAll.value = !isExpandAll.value;
  ToggleRowExpansionAll(dataList.value, isExpandAll.value, tableRef.value);
}
</script>

<template>
  <div class="flex flex-col">
    <div class="search-form bg-bg_color px-8 pt-[12px] mb-3">
      <el-form ref="searchRef" :inline="true" :model="search">
        <el-form-item label="菜单名称：" prop="name">
          <el-input
            v-model="search.name"
            placeholder="请输入菜单名称"
            clearable
            class="!w-[180px]"
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
    </div>

    <div class="flex flex-col px-5 py-3 bg-bg_color">
      <div class="pb-3 flex justify-between">
        <div>
          <ExpandIcon
            v-tippy="RendTippyProps(isExpandAll ? '折叠' : '展开')"
            :class="['w-[16px]', ICON_CLASS]"
            :style="{
              transform: isExpandAll ? 'none' : 'rotate(-90deg)'
            }"
            @click="onExpand"
          />
        </div>

        <div>
          <el-button
            type="primary"
            :icon="useRenderIcon(AddFill)"
            @click="addClick({})"
          >
            新增菜单
          </el-button>
        </div>
      </div>

      <el-table
        ref="tableRef"
        v-loading="loading"
        :data="dataList"
        row-key="id"
        :header-cell-style="{
          background: 'var(--el-fill-color-light)',
          color: 'var(--el-text-color-primary)'
        }"
        :default-expand-all="isExpandAll"
        show-overflow-tooltip
      >
        <el-table-column type="selection" />
        <el-table-column #default="scope" prop="name" label="菜单名称">
          <span class="flex items-center">
            <component
              :is="useRenderIcon(scope.row.icon)"
              v-if="scope.row.icon"
              class="w-3 h-3 mr-1"
            />
            {{ scope.row.name }}
          </span>
        </el-table-column>
        <el-table-column prop="path" label="路由路径" />
        <el-table-column prop="orderNo" label="排序" width="100" />
        <el-table-column
          #default="scope"
          prop="showFlag"
          label="隐藏"
          width="100"
        >
          {{ scope.row.showFlag ? "否" : "是" }}
        </el-table-column>
        <el-table-column prop="uuid" label="唯一标识" />
        <el-table-column #default="scope" label="操作">
          <el-button
            link
            type="primary"
            :icon="useRenderIcon(EditPen)"
            @click="editClick(scope.row)"
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

    <form-edit
      ref="formRef"
      :higher-menu-options="higherMenuOptions"
      :title="title"
      :confirm-fun="confirmFun"
      :confirm-after-fun="confirmAfterFun"
    />
  </div>
</template>

<style scoped lang="scss">
.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}

:deep(td.el-table_1_column_2.el-table__cell > div) {
  display: flex;
  align-items: center;
}
</style>

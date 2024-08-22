<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { BaseMenuInsertOrUpdateDTO } from "@/api/http/base/BaseMenuController";
import { IEditFormProps } from "@/views/base/menu/types";
import { cloneDeep } from "@pureadmin/utils";
import { R } from "@/model/vo/R";

const initForm: BaseMenuInsertOrUpdateDTO = {};

const form = ref<BaseMenuInsertOrUpdateDTO>(cloneDeep(initForm));
const formRef = ref();
const confirmLoading = ref<boolean>(false);
const dialogLoading = ref<boolean>(false);
const visible = ref<boolean>(false);

function getRef() {
  return formRef.value;
}

function getForm() {
  return form;
}

function getVisible() {
  return visible;
}

function getDialogLoading() {
  return dialogLoading;
}

function getConfirmLoading() {
  return confirmLoading;
}

function addOpen(formTemp?: BaseMenuInsertOrUpdateDTO) {
  form.value = cloneDeep(initForm);
  if (formTemp) {
    form.value = formTemp;
  }
  visible.value = true;
}

function editOpen(fun: Promise<R<any>>) {
  form.value = cloneDeep(initForm);
  dialogLoading.value = true;
  visible.value = true;
  fun.then(res => {
    form.value = res.data;
    dialogLoading.value = false;
  });
}

defineExpose({
  getRef,
  getForm,
  getVisible,
  getDialogLoading,
  getConfirmLoading,
  addOpen,
  editOpen
});

function confirmClick() {
  if (!props.confirmFun) {
    visible.value = false;
    return;
  }
  confirmLoading.value = true;
  props.confirmFun
    .then(() => {
      confirmLoading.value = false;
      visible.value = false;
    })
    .catch(() => {
      confirmLoading.value = false;
    });
}

const props = defineProps<IEditFormProps>();
</script>

<template>
  <el-dialog
    v-model="visible"
    v-loading="dialogLoading"
    :title="props.title"
    draggable
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form ref="formRef" :model="form">
      <el-row :gutter="30">
        <re-col>
          <el-form-item label="上级菜单" prop="pid">
            <el-cascader
              v-model="form.pid"
              class="w-full"
              :options="props.higherMenuOptions as any"
              :props="{
                value: 'id',
                label: 'name',
                emitPath: false,
                checkStrictly: true
              }"
              clearable
              filterable
              placeholder="请选择上级菜单"
            >
              <template #default="{ node, data }">
                <span>{{ data.name }}</span>
                <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
              </template>
            </el-cascader>
          </el-form-item>
        </re-col>

        <re-col :value="12" :xs="24" :sm="24">
          <el-form-item label="菜单名称" prop="name">
            <el-input
              v-model="form.name"
              clearable
              placeholder="请输入菜单名称"
            />
          </el-form-item>
        </re-col>
      </el-row>
    </el-form>

    <template #footer>
      <div>
        <el-button @click="visible = false">取消</el-button>
        <el-button
          v-loading="confirmLoading"
          type="primary"
          @click="confirmClick"
        >
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

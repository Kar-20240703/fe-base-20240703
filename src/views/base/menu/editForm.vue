<script setup lang="ts">
import { useHook } from "@/views/base/menu/hook";
import { ref } from "vue";
import ReCol from "@/components/ReCol";

const { form } = useHook();
const formRef = ref();

function getRef() {
  return formRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form ref="formRef" :model="form">
    <el-row :gutter="30">
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
</template>

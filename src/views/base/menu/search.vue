<script setup lang="ts">
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { ref } from "vue";
import Refresh from "@iconify-icons/ep/refresh";
import { useHook } from "@/views/base/menu/hook";

const searchRef = ref();

const { loading, onSearch, resetSearch, search } = useHook();
</script>

<template>
  <el-form ref="searchRef" :inline="true" :model="search">
    <el-form-item label="菜单名称" prop="name">
      <el-input v-model="search.name" placeholder="请输入菜单名称" clearable />
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
      <el-button :icon="useRenderIcon(Refresh)" @click="resetSearch(searchRef)">
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

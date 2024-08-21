<script setup lang="ts">
import search from "@/views/base/menu/search.vue";
import dataTable from "@/views/base/menu/dataTable.vue";

defineOptions({
  name: "BaseMenu"
});
</script>

<template>
  <div :style="{ display: 'flex', flexDirection: 'column' }">
    <search />
    <dataTable />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { Delete } from '@element-plus/icons-vue';

  const props = defineProps({
    guest: Object,
    index: Number,
  });

  const localGuest = ref({ ...props.guest });
</script>

<template>
  <el-descriptions
      :title="guest.firstName + ' ' + guest.lastName"
      :column="3"
      border
  >
    <template #extra>
      <el-button type="danger" :icon="Delete" circle @click="$emit('remove', index)" />
    </template>
    <el-descriptions-item label="Document Number">{{ guest.documentNumber }}</el-descriptions-item>
    <el-descriptions-item label="Document Class">{{ guest.documentType }}</el-descriptions-item>
    <el-descriptions-item label="Gender">
      <template v-if="guest.gender">{{ guest.gender }}</template>
      <el-select v-else
          v-model="localGuest.gender"
          placeholder="---"
          size="small"
          style="width: 50px"
          @change="$emit('change', localGuest, index)"
      >
        <el-option
            v-for="item in ['M', 'F']"
            :key="item"
            :label="item"
            :value="item"
        />
      </el-select>
    </el-descriptions-item>
    <el-descriptions-item label="Date of Birth">{{ guest.dateOfBirth }}</el-descriptions-item>
    <el-descriptions-item label="Nationality">{{ guest.nationality }}</el-descriptions-item>
  </el-descriptions>
</template>

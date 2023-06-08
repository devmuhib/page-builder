<template>
  <Column v-if="component.name === 'column'" :component="component"></Column>
  <Button v-if="component.name === 'button'" :component="component"></Button>
  <Input v-if="component.name === 'input'" :component="component"></Input>
</template>

<script setup>
import Column from "./Column/index.vue";
import Button from "./Button/index.vue";
import Input from "./Input/index.vue";

const props = defineProps({
  component: Object,
});
</script>

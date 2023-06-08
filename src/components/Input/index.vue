<template>
  <input
    :id="component.id"
    :style="styles"
    class="mj-input"
    type="text"
    placeholder="Search input"
  />
</template>

<script setup>
import { computed, onBeforeMount } from "vue";
import { generateCSS } from "../Column/support";

const props = defineProps({
  component: Object,
});

const options = {
  background: {
    color: "black",
    image: {
      url: "",
      position: "",
      size: "",
      repeat: "repeat",
    },
  },
  color: "white",
  padding: {
    unit: "",
    top: "",
    left: "",
    right: "",
    bottom: "",
  },
  border: {
    size: {
      unit: "",
      value: "",
    },
    style: "",
    width: "",
  },
};

onBeforeMount(() => {
  props.component.options = options;
});

// a computed ref
const styles = computed(() => {
  console.log(generateCSS(props.component.options));
  return generateCSS(props.component.options);
});
</script>

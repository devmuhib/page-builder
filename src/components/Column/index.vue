<template>
  <div class="mj-section" :style="styles">
    <div
      class="mj-column"
      v-for="(component, index) in component.components"
      :key="index"
      @drop="handleDrop($event, component)"
      @dragover="handleDragOver($event)"
    >
      <div class="drop-area" :id="index">
        <div class="drop-indicator drop-indicator-top">Place a Component</div>
        <ProcessWidget
          v-for="(subcomponent, index) in component.components"
          :component="subcomponent"
          :key="index"
        ></ProcessWidget>
        <div class="drop-indicator drop-indicator-bottom">
          Place a Component
        </div>
      </div>

      <!-- <div v-if="!component.needComponent">
        <button class="remove" @click="remove(component, i)">-</button>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, ref } from "vue";
import { generateCSS, validateWidget } from "./support.js";
import ProcessWidget from "./../ProcessWidget.vue";
const ActiveDrugAreaId = ref(null);
const placePosition = ref(null);
import {
  getPosition,
  removePlacableIndicator,
} from "../../helpers/getPosition";

const props = defineProps({
  component: Object,
});

const options = {
  background: {
    color: "red",
    image: {
      url: "",
      position: "",
      size: "",
      repeat: "repeat",
    },
  },
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
  return generateCSS(props.component.options);
});

const remove = (component, i) => {
  props.component.components[i] = {
    needComponent: true,
  };
};

const handleDragOver = (event) => {
  event.preventDefault();
  const section = event.target.closest(".drop-area");

  if (!section) return;

  if (section && ActiveDrugAreaId.value !== section.id) {
    removePlacableIndicator();
    section.classList.add("active-drag-area");
    ActiveDrugAreaId.value = section.id;
  }

  const position = getPosition(event, section);

  if (position !== placePosition.value) {
    if (position === "after") {
      section.classList.remove("only-top-place-area");
      section.classList.add("only-bottom-place-area");
    }

    if (position === "before") {
      section.classList.remove("only-bottom-place-area");
      section.classList.add("only-top-place-area");
    }
    placePosition.value = position;
  }
};

const handleDrop = (event, component) => {
  event.preventDefault();

  if (window.elementId) {
    const widget = JSON.parse(event.dataTransfer.getData("component"));
    if (validateWidget(widget.name)) {
      if (placePosition.value === "before") {
        component.components.value?.splice(ActiveDrugAreaId.value, 0, widget);
      } else {
        component.components.value?.splice(
          ActiveDrugAreaId.value + 1,
          0,
          widget
        );
      }
      component.components.push(widget);
    }
  }

  ActiveDrugAreaId.value = null;
  placePosition.value = null;
  removePlacableIndicator();
};
</script>

<style>
.mj-section {
  display: flex;
  gap: 10px;
}

.mj-column {
  background-color: gray;
  padding: 30px;
  min-width: 100px;
}

.remove {
  background-color: red;
}
</style>

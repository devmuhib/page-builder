<template>
  <div class="w-full grid grid-cols-12 gap-4 px-7">
    <header
      class="col-span-full bg-gray-100 fixed h-[60px] px-5 top-0 left-0 w-screen z-10"
    >
      <div class="flex items-center justify-center w-full h-full">
        <h2 class="text-[22px] font-semibold">Builder</h2>
      </div>
    </header>
    <aside
      class="col-span-5 bg-white fixed top-0 left-0 h-screen w-[15%] py-16 px-5 shadow-lg"
    >
      <div class="grid grid-cols-3 gap-3">
        <div
          class="border border-solid border-gray-200 py-4 px-5 text-[14px] flex items-center justify-center cursor-pointer"
          v-for="component in draggableComponents"
          :key="component.id"
          :draggable="true"
          @dragstart="handleDragStart(component)"
        >
          {{ component.name.charAt(0).toUpperCase() + component.name.slice(1) }}
        </div>
      </div>
    </aside>
    <!-- @drop="handleDrop"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave" -->
    <main
      class="col-span-7 h-screen overflow-y-auto mt-20 pb-10 widget-container"
    >
      <!-- <div class="drop-area"> -->
      <!-- <div class="drop-indicator drop-indicator-top">Place a Component</div> -->
      <ProcessWidget
        v-for="(component, index) in components"
        :component="component"
        :key="index"
      ></ProcessWidget>
      <!-- <div class="drop-indicator drop-indicator-bottom">
          Place a Component
        </div> -->
      <!-- </div> -->
    </main>
    <aside
      class="col-span-5 bg-white fixed top-0 right-0 h-screen w-[15%] p-16 shadow-lg"
    >
      Element Styles
    </aside>
    <footer class="col-span-full bg-gray-200 fixed bottom-0 left-0 w-screen">
      <!-- Your footer content here -->
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import ProcessWidget from "./components/ProcessWidget.vue";

const draggableComponents = [
  {
    id: uuidv4(),
    isActive: false,
    name: "button",
  },
  {
    id: uuidv4(),
    isActive: false,
    name: "column",
    components: [
      { needComponent: true },
      { needComponent: true },
      { needComponent: true },
    ],
  },
  {
    id: uuidv4(),
    isActive: false,
    name: "input",
  },
];

const components = ref([
  {
    id: "049e7d2b-f643-453f-b92b-41e73f6fa52d",
    isActive: false,
    name: "column",
    components: [
      {
        components: [],
      },
      {
        components: [],
      },
      {
        components: [],
      },
    ],
    options: {
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
    },
  },
]);

const draggedElementId = ref(null);

const getAttributes = (config) => {
  const attributes = {};

  if (config.borderWidth) {
    attributes[
      "border-width"
    ] = `${config.borderWidth.value}${config.borderWidth.unit}`;
  }

  if (config.align) {
    attributes.align = config.align;
  }

  if (config.borderStyle) {
    attributes["border-style"] = config.borderStyle;
  }

  if (config.padding) {
    attributes["padding-top"] = `${config.padding.top}${config.padding.unit}`;
    attributes[
      "padding-bottom"
    ] = `${config.padding.bottom}${config.padding.unit}`;
    attributes["padding-left"] = `${config.padding.left}${config.padding.unit}`;
    attributes[
      "padding-right"
    ] = `${config.padding.right}${config.padding.unit}`;
  }

  if (config.fontFamily) {
    attributes["font-family"] = `${config.fontFamily}`;
  }

  if (config.textAlign) {
    attributes["text-align"] = `${config.textAlign}`;
  }

  return attributes;
};

const handleDrop = (event) => {
  event.preventDefault();

  if (draggedElementId.value) {
    const component = JSON.parse(event.dataTransfer.getData("component"));

    components.value.push(component);
  }
};

const handleDragStart = (component) => {
  event.dataTransfer.setData("component", JSON.stringify(component));
  draggedElementId.value = component.id;

  window.elementId = component.id;
};

const handleDragOver = (event) => {
  event.preventDefault();
};

const handleDragLeave = (event) => {
  event.preventDefault();
};
</script>

<style scoped>
header {
  grid-column: 1 / span 12;
}

aside {
  grid-column: 1 / span 5;
}

main {
  grid-column: 3 / span 8;
}

footer {
  grid-column: 1 / span 12;
}
</style>

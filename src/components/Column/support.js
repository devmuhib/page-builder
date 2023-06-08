export const generateCSS = (options) => {
  let css = "";

  if (options.background.color) {
    css += `background-color: ${options.background.color};\n`;
  }

  if (options.color) {
    css += `color: ${options.color};\n`;
  }

  if (options.background.image.url) {
    css += `background-image: url(${options.background.image.url});\n`;
    if (options.background.image.position) {
      css += `background-position: ${options.background.image.position};\n`;
    }

    if (options.background.image.size) {
      css += `background-size: ${options.background.image.size};\n`;
    }

    if (options.background.image.repeat) {
      css += `background-repeat: ${
        options.background.image.repeat ? "repeat" : "no-repeat"
      };\n`;
    }
  }

  if (options.padding.unit && options.padding.top) {
    css += `padding-top: ${options.padding.top}${options.padding.unit};\n`;
  }

  if (options.padding.unit && options.padding.left) {
    css += `padding-left: ${options.padding.left}${options.padding.unit};\n`;
  }

  if (options.padding.unit && options.padding.right) {
    css += `padding-right: ${options.padding.right}${options.padding.unit};\n`;
  }

  if (options.padding.unit && options.padding.bottom) {
    css += `padding-bottom: ${options.padding.bottom}${options.padding.unit};\n`;
  }

  if (
    options.border.size.unit &&
    options.border.size.value &&
    options.border.style &&
    options.border.width
  ) {
    css += `border: ${options.border.size.value}${options.border.size.unit} ${options.border.style} ${options.border.width};\n`;
  }

  return css;
};

export const validateWidget = (name) => {
  let excludes = ["column"];
  if (excludes.includes(name)) {
    throw new Error("Widget not allowed");
  }

  return true;
};

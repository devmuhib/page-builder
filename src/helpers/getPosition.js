export const getPosition = (event, element) => {
  const rect = element.getBoundingClientRect();
  const fromTop = event.clientY - rect.top;
  return rect.height / 2 > fromTop ? "before" : "after";
};

export const removePlacableIndicator = () => {
  const sections = document.querySelectorAll(".drop-area");
  sections.forEach((el) => {
    el.classList.remove("active-drag-area");
    el.classList.remove("only-top-place-area");
    el.classList.remove("only-bottom-place-area");
  });
};

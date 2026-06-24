/**
 * UI Utilities
 *
 * Вся разметка постов (включая empty-state) теперь статическая, в index.html —
 * её будет рендерить бекэнд. Поэтому здесь больше нет функций, которые
 * строят HTML через innerHTML ("зеркало" верстки) — только переключение
 * состояний уже существующих элементов.
 */
var UIUtils = {
  showLoadingState: function (button) {
    button.classList.add("loading");
    button.disabled = true;
  },

  hideLoadingState: function (button) {
    button.classList.remove("loading");
    button.disabled = false;
  },

  toggleElement: function (element, show) {
    if (!element) return;
    if (show === undefined) show = true;
    if (show) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  },

  setActive: function (element) {
    element.classList.add("active");
  },

  removeActive: function (element) {
    element.classList.remove("active");
  },

  removeActiveAll: function (elements) {
    for (var i = 0; i < elements.length; i++) {
      this.removeActive(elements[i]);
    }
  },
};

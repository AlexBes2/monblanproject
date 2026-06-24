/**
 * UI Utilities
 *
 * All post markup (including the empty-state block) is rendered statically
 * in index.html — the backend will own that HTML in production.
 * Therefore these helpers only toggle state on already-existing elements;
 * they never build or destroy DOM nodes.
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

  /**
   * Show or hide an element via the "hidden" class.
   * @param {Element} element
   * @param {boolean} [show=true]
   */
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

  /** Remove the "active" class from every element in the given NodeList/Array. */
  removeActiveAll: function (elements) {
    for (var i = 0; i < elements.length; i++) {
      this.removeActive(elements[i]);
    }
  },
};

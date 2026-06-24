/**
 * Application constants and configuration.
 * All magic numbers, CSS selectors, and class names live here
 * so they are easy to update in one place.
 */
var CONSTANTS = {
  // ------------------------------------
  // Pagination
  // ------------------------------------
  POSTS_PER_PAGE: 9,
  // On wide screens the grid shows 4 columns → show 8 cards (2 full rows)
  POSTS_PER_PAGE_GRID_WIDE: 8,
  BREAKPOINT_WIDE: 1024,

  // ------------------------------------
  // View modes
  // ------------------------------------
  VIEW_MODES: {
    GRID: "grid",
    LIST: "list",
  },

  // ------------------------------------
  // localStorage keys
  // ------------------------------------
  STORAGE_KEYS: {
    VIEW_MODE: "app-view-mode",
    SELECTED_FROM_DATE: "app-selected-from-date",
    SELECTED_TO_DATE: "app-selected-to-date",
  },

  // ------------------------------------
  // DOM selectors
  // ------------------------------------
  SELECTORS: {
    POSTS_CONTAINER: "#posts-container",
    LOAD_MORE_BTN: "#load-more-btn",
    DATE_INPUT: "#date-filter",
    DATE_TO_INPUT: "#date-filter-to",
    CLEAR_FILTER_BTN: "#clear-filter",
    CLEAR_TO_FILTER_BTN: "#clear-filter-to",
    VIEW_GRID_BTN: ".view-btn--grid",
    VIEW_LIST_BTN: ".view-btn--list",
    EMPTY_STATE: ".empty-state",
  },

  // ------------------------------------
  // CSS class names (kept as constants to avoid typo bugs)
  // ------------------------------------
  CLASSES: {
    ACTIVE: "active",
    LOADING: "loading",
    HIDDEN: "hidden",
    LIST_VIEW: "list-view",
  },
};

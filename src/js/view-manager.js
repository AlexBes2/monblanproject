/**
 * View Manager
 * Handles switching between grid and list layouts,
 * and persists the chosen mode in localStorage.
 */
var ViewManager = function () {
  this.viewGridBtn = document.querySelector(CONSTANTS.SELECTORS.VIEW_GRID_BTN);
  this.viewListBtn = document.querySelector(CONSTANTS.SELECTORS.VIEW_LIST_BTN);
  this.postsContainer = document.querySelector(CONSTANTS.SELECTORS.POSTS_CONTAINER);
  this.currentView = CONSTANTS.VIEW_MODES.GRID;
  /** Optional callback invoked after every view-mode switch. */
  this.onViewChange = null;
};

ViewManager.prototype.init = function () {
  this.restoreViewMode();
  this.attachEventListeners();
};

ViewManager.prototype.attachEventListeners = function () {
  var self = this;
  if (this.viewGridBtn) {
    this.viewGridBtn.addEventListener("click", function () {
      self.switchToGridView();
    });
  }
  if (this.viewListBtn) {
    this.viewListBtn.addEventListener("click", function () {
      self.switchToListView();
    });
  }
};

ViewManager.prototype.switchToGridView = function () {
  this.currentView = CONSTANTS.VIEW_MODES.GRID;
  this.postsContainer.classList.remove(CONSTANTS.CLASSES.LIST_VIEW);

  UIUtils.removeActiveAll([this.viewListBtn]);
  UIUtils.setActive(this.viewGridBtn);

  localStorage.setItem(CONSTANTS.STORAGE_KEYS.VIEW_MODE, CONSTANTS.VIEW_MODES.GRID);

  if (this.onViewChange) this.onViewChange();
};

ViewManager.prototype.switchToListView = function () {
  this.currentView = CONSTANTS.VIEW_MODES.LIST;
  this.postsContainer.classList.add(CONSTANTS.CLASSES.LIST_VIEW);

  UIUtils.removeActiveAll([this.viewGridBtn]);
  UIUtils.setActive(this.viewListBtn);

  localStorage.setItem(CONSTANTS.STORAGE_KEYS.VIEW_MODE, CONSTANTS.VIEW_MODES.LIST);

  if (this.onViewChange) this.onViewChange();
};

/** Read the saved view mode from localStorage and apply it on page load. */
ViewManager.prototype.restoreViewMode = function () {
  var savedMode = localStorage.getItem(CONSTANTS.STORAGE_KEYS.VIEW_MODE);

  if (savedMode === CONSTANTS.VIEW_MODES.LIST) {
    this.currentView = CONSTANTS.VIEW_MODES.LIST;
    this.postsContainer.classList.add(CONSTANTS.CLASSES.LIST_VIEW);
    UIUtils.removeActiveAll([this.viewGridBtn]);
    UIUtils.setActive(this.viewListBtn);
  } else {
    this.currentView = CONSTANTS.VIEW_MODES.GRID;
    this.postsContainer.classList.remove(CONSTANTS.CLASSES.LIST_VIEW);
    UIUtils.removeActiveAll([this.viewListBtn]);
    UIUtils.setActive(this.viewGridBtn);
  }
};

ViewManager.prototype.getCurrentView = function () {
  return this.currentView;
};

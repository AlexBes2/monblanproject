/**
 * Main Application
 * Wires together PostsManager, CalendarManager, and ViewManager.
 */
var Application = function () {
  this.postsManager = new PostsManager();
  this.calendarManager = new CalendarManager(this.postsManager);
  this.viewManager = new ViewManager();
};

Application.prototype.init = function () {
  var self = this;

  // Re-render posts whenever the view mode changes (grid/list affects posts-per-page)
  this.viewManager.onViewChange = function () {
    self.postsManager.resetAndRender();
  };

  this.viewManager.init();
  this.postsManager.init();
  this.calendarManager.init();
};

// Initialize the app once the DOM is fully parsed
document.addEventListener("DOMContentLoaded", function () {
  var app = new Application();
  app.init();
});

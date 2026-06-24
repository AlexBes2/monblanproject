/**
 * Main Application
 */
var Application = function () {
  this.postsManager = new PostsManager();
  this.calendarManager = new CalendarManager(this.postsManager);
  this.viewManager = new ViewManager();
};

Application.prototype.init = function () {
  console.log("🚀 Initializing application...");

  var self = this;
  this.viewManager.onViewChange = function () {
    self.postsManager.resetAndRender();
  };

  this.viewManager.init();
  this.postsManager.init();
  this.calendarManager.init();

  console.log("✅ Application initialized successfully");
};

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  var app = new Application();
  app.init();
});

/**
 * Posts Manager
 *
 * Карточки постов и empty-state уже отрисованы статически в index.html
 * (бекэнд будет рендерить эту разметку сам). Поэтому здесь JS больше не
 * создаёт/удаляет DOM-узлы — он только показывает/скрывает то, что уже
 * есть на странице: "load more" открывает следующую порцию, фильтр по
 * дате прячет всё, что не подходит.
 */
var PostsManager = function () {
  this.allPosts = CONSTANTS.MOCK_POSTS.slice();
  this.filteredPosts = this.allPosts.slice();
  this.displayedPosts = [];
  this.currentPage = 0;
  this.selectedDate = null;
  this.containerEl = document.querySelector(
    CONSTANTS.SELECTORS.POSTS_CONTAINER,
  );
  this.loadMoreBtn = document.querySelector(CONSTANTS.SELECTORS.LOAD_MORE_BTN);
  this.emptyStateEl = document.querySelector(CONSTANTS.SELECTORS.EMPTY_STATE);
};

PostsManager.prototype.init = function () {
  this.renderPostsForCurrentPage();
  this.attachEventListeners();
};

PostsManager.prototype.attachEventListeners = function () {
  var self = this;
  if (this.loadMoreBtn) {
    this.loadMoreBtn.addEventListener("click", function () {
      self.loadMore();
    });
  }
};

PostsManager.prototype.filterByDate = function (date) {
  this.selectedDate = date;
  this.currentPage = 0;
  this.displayedPosts = [];

  if (!date) {
    this.filteredPosts = this.allPosts.slice();
  } else {
    this.filteredPosts = this.allPosts.filter(function (post) {
      return post.date === date;
    });
  }

  this.renderPostsForCurrentPage();
  this.updateLoadMoreButton();
};

PostsManager.prototype.filterByDateRange = function (fromDate, toDate) {
  this.selectedDate = fromDate || toDate || null;
  this.currentPage = 0;
  this.displayedPosts = [];

  if (!fromDate && !toDate) {
    this.filteredPosts = this.allPosts.slice();
  } else {
    this.filteredPosts = this.allPosts.filter(function (post) {
      var isAfterFrom = !fromDate || post.date >= fromDate;
      var isBeforeTo = !toDate || post.date <= toDate;
      return isAfterFrom && isBeforeTo;
    });
  }

  this.renderPostsForCurrentPage();
  this.updateLoadMoreButton();
};

PostsManager.prototype.clearFilter = function () {
  this.filterByDate(null);
};

PostsManager.prototype.resetAndRender = function () {
  this.currentPage = 0;
  this.displayedPosts = [];
  this.renderPostsForCurrentPage();
};

PostsManager.prototype.getPostsPerPage = function () {
  var isWide = window.innerWidth > CONSTANTS.BREAKPOINT_WIDE;
  var isGrid = !this.containerEl.classList.contains(CONSTANTS.CLASSES.LIST_VIEW);
  if (isWide && isGrid) {
    return CONSTANTS.POSTS_PER_PAGE_GRID_WIDE;
  }
  return CONSTANTS.POSTS_PER_PAGE;
};

PostsManager.prototype.renderPostsForCurrentPage = function () {
  var perPage = this.getPostsPerPage();
  var startIndex = this.currentPage * perPage;
  var endIndex = startIndex + perPage;
  var postsToAdd = this.filteredPosts.slice(startIndex, endIndex);

  if (postsToAdd.length > 0) {
    this.displayedPosts = this.displayedPosts.concat(postsToAdd);
    this.render();
  } else if (this.currentPage === 0) {
    this.renderEmptyState();
  }

  this.updateLoadMoreButton();
};

// Показывает карточки из displayedPosts и скрывает все остальные
// (в том числе те, что не попали в текущий фильтр вообще).
PostsManager.prototype.render = function () {
  UIUtils.toggleElement(this.emptyStateEl, false);

  var visibleIds = {};
  this.displayedPosts.forEach(function (post) {
    visibleIds[post.id] = true;
  });

  var allCards = this.containerEl.querySelectorAll("[data-post-id]");
  for (var i = 0; i < allCards.length; i++) {
    var id = Number(allCards[i].getAttribute("data-post-id"));
    UIUtils.toggleElement(allCards[i], !!visibleIds[id]);
  }
};

PostsManager.prototype.renderEmptyState = function () {
  var allCards = this.containerEl.querySelectorAll("[data-post-id]");
  for (var i = 0; i < allCards.length; i++) {
    UIUtils.toggleElement(allCards[i], false);
  }
  UIUtils.toggleElement(this.emptyStateEl, true);
};

PostsManager.prototype.loadMore = function () {
  var self = this;
  UIUtils.showLoadingState(this.loadMoreBtn);

  setTimeout(function () {
    self.currentPage++;
    self.renderPostsForCurrentPage();
    UIUtils.hideLoadingState(self.loadMoreBtn);
  }, 500);
};

PostsManager.prototype.updateLoadMoreButton = function () {
  var totalDisplayed = this.displayedPosts.length;
  var totalAvailable = this.filteredPosts.length;
  var hasMore = totalDisplayed < totalAvailable;

  UIUtils.toggleElement(this.loadMoreBtn, hasMore);
};

PostsManager.prototype.getFilteredPostsCount = function () {
  return this.filteredPosts.length;
};

PostsManager.prototype.getDisplayedPostsCount = function () {
  return this.displayedPosts.length;
};

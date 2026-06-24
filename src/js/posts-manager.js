/**
 * Posts Manager
 *
 * Post cards are rendered statically in index.html (the backend owns that
 * markup in production). This module never creates or removes DOM nodes —
 * it only shows/hides cards that already exist on the page:
 *   - "Load more" reveals the next batch of cards.
 *   - The date-range filter hides cards that do not match the selection.
 *
 * Card metadata (id, date) is read from data attributes on each .post-card
 * element, so no separate JS data array is needed.
 */
var PostsManager = function () {
  this.containerEl = document.querySelector(CONSTANTS.SELECTORS.POSTS_CONTAINER);
  this.loadMoreBtn = document.querySelector(CONSTANTS.SELECTORS.LOAD_MORE_BTN);
  this.emptyStateEl = document.querySelector(CONSTANTS.SELECTORS.EMPTY_STATE);

  // allCards: every [data-post-id] element, in DOM order
  this.allCards = [];
  // filteredCards: subset matching the active date filter
  this.filteredCards = [];
  // how many cards from filteredCards are currently visible
  this.visibleCount = 0;
};

PostsManager.prototype.init = function () {
  // Read card metadata directly from the DOM — no JS data array needed
  this.allCards = Array.prototype.slice.call(
    this.containerEl.querySelectorAll("[data-post-id]")
  );
  this.filteredCards = this.allCards.slice();

  this.renderPage();
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

/**
 * Filter cards by a date range (ISO strings or null).
 * Passing two nulls clears the filter and shows all cards.
 */
PostsManager.prototype.filterByDateRange = function (fromDate, toDate) {
  this.visibleCount = 0;

  if (!fromDate && !toDate) {
    this.filteredCards = this.allCards.slice();
  } else {
    this.filteredCards = this.allCards.filter(function (card) {
      var date = card.getAttribute("data-date");
      var isAfterFrom = !fromDate || date >= fromDate;
      var isBeforeTo = !toDate || date <= toDate;
      return isAfterFrom && isBeforeTo;
    });
  }

  this.renderPage();
  this.updateLoadMoreButton();
};

/** Remove the active date filter and show all cards. */
PostsManager.prototype.clearFilter = function () {
  this.filterByDateRange(null, null);
};

/** Reset pagination and re-render the first page (called on view-mode switch). */
PostsManager.prototype.resetAndRender = function () {
  this.visibleCount = 0;
  this.renderPage();
};

/**
 * Return how many cards fit on one page.
 * On wide screens the grid shows 4 columns, so we use a multiple of 4
 * to avoid a visually incomplete last row.
 */
PostsManager.prototype.getPostsPerPage = function () {
  var isWide = window.innerWidth > CONSTANTS.BREAKPOINT_WIDE;
  var isGrid = !this.containerEl.classList.contains(CONSTANTS.CLASSES.LIST_VIEW);
  if (isWide && isGrid) {
    return CONSTANTS.POSTS_PER_PAGE_GRID_WIDE;
  }
  return CONSTANTS.POSTS_PER_PAGE;
};

/**
 * Show cards up to visibleCount; hide everything else.
 * Falls back to empty-state when filteredCards is empty.
 */
PostsManager.prototype.renderPage = function () {
  var perPage = this.getPostsPerPage();
  this.visibleCount = this.visibleCount || perPage;

  if (this.filteredCards.length === 0) {
    this.renderEmptyState();
    return;
  }

  UIUtils.toggleElement(this.emptyStateEl, false);

  // Build a fast lookup of cards that should be visible
  var visibleSet = {};
  for (var i = 0; i < this.visibleCount && i < this.filteredCards.length; i++) {
    visibleSet[this.filteredCards[i].getAttribute("data-post-id")] = true;
  }

  this.allCards.forEach(function (card) {
    var id = card.getAttribute("data-post-id");
    UIUtils.toggleElement(card, !!visibleSet[id]);
  });

  this.updateLoadMoreButton();
};

/** Hide all cards and show the empty-state placeholder. */
PostsManager.prototype.renderEmptyState = function () {
  this.allCards.forEach(function (card) {
    UIUtils.toggleElement(card, false);
  });
  UIUtils.toggleElement(this.emptyStateEl, true);
  UIUtils.toggleElement(this.loadMoreBtn, false);
};

/** Simulate a network request delay, then reveal the next page of cards. */
PostsManager.prototype.loadMore = function () {
  var self = this;
  UIUtils.showLoadingState(this.loadMoreBtn);

  setTimeout(function () {
    self.visibleCount += self.getPostsPerPage();
    self.renderPage();
    UIUtils.hideLoadingState(self.loadMoreBtn);
  }, 500);
};

/** Show the "Load more" button only when there are more cards to display. */
PostsManager.prototype.updateLoadMoreButton = function () {
  var hasMore = this.visibleCount < this.filteredCards.length;
  UIUtils.toggleElement(this.loadMoreBtn, hasMore);
};

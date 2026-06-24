/**
 * Calendar Manager
 * Wraps two Flatpickr instances ("from" and "to") and connects them
 * to PostsManager so selecting a date range filters the post grid.
 */
var CalendarManager = function (postsManager) {
  this.postsManager = postsManager;
  this.fromInput = document.querySelector(CONSTANTS.SELECTORS.DATE_INPUT);
  this.toInput = document.querySelector(CONSTANTS.SELECTORS.DATE_TO_INPUT);
  this.clearFromBtn = document.querySelector(CONSTANTS.SELECTORS.CLEAR_FILTER_BTN);
  this.clearToBtn = document.querySelector(CONSTANTS.SELECTORS.CLEAR_TO_FILTER_BTN);
  this.fromCalendar = null;
  this.toCalendar = null;
};

CalendarManager.prototype.init = function () {
  this.initFlatpickr();
  this.attachEventListeners();
  this.restoreSelectedDate();
};

CalendarManager.prototype.initFlatpickr = function () {
  var self = this;

  // Shared options applied to both "from" and "to" pickers
  var calendarOptions = {
    mode: "single",
    dateFormat: "d_m_Y",
    disableMobile: true,
    locale: Object.assign({}, flatpickr.l10ns.default, {
      weekdays: {
        shorthand: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        longhand: flatpickr.l10ns.default.weekdays.longhand,
      },
    }),
    onChange: function () {
      self.onDateChange();
    },
    onClose: function () {
      self.updateClearButtonStates();
    },
    prevArrow: `
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.2609 3.5L11.0834 4.3225L8.41171 7L11.0834 9.6775L10.2609 10.5L6.76087 7L10.2609 3.5Z" fill="black"/>
<path d="M6.41676 3.5L7.23926 4.3225L4.56759 7L7.23926 9.6775L6.41676 10.5L2.91676 7L6.41676 3.5Z" fill="black"/>
</svg>
  `,
    nextArrow: `
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.73913 3.5L2.91663 4.3225L5.58829 7L2.91663 9.6775L3.73913 10.5L7.23913 7L3.73913 3.5Z" fill="black"/>
<path d="M7.58324 3.5L6.76074 4.3225L9.43241 7L6.76074 9.6775L7.58324 10.5L11.0832 7L7.58324 3.5Z" fill="black"/>
</svg>
  `,
  };

  this.fromCalendar = flatpickr(this.fromInput, calendarOptions);
  this.toCalendar = flatpickr(
    this.toInput,
    Object.assign({}, calendarOptions, {
      onChange: function () {
        self.onDateChange();
      },
    })
  );
};

/** Called whenever either date picker value changes. */
CalendarManager.prototype.onDateChange = function () {
  this.syncDateConstraints();

  var fromDate = this.getCalendarDate(this.fromCalendar);
  var toDate = this.getCalendarDate(this.toCalendar);

  // Persist selection across page reloads
  if (fromDate) {
    localStorage.setItem(CONSTANTS.STORAGE_KEYS.SELECTED_FROM_DATE, fromDate);
  } else {
    localStorage.removeItem(CONSTANTS.STORAGE_KEYS.SELECTED_FROM_DATE);
  }

  if (toDate) {
    localStorage.setItem(CONSTANTS.STORAGE_KEYS.SELECTED_TO_DATE, toDate);
  } else {
    localStorage.removeItem(CONSTANTS.STORAGE_KEYS.SELECTED_TO_DATE);
  }

  this.postsManager.filterByDateRange(fromDate, toDate);
  this.updateClearButtonStates();
};

/**
 * Keep the "to" calendar in sync with the "from" value so the user
 * cannot pick an end date that precedes the start date:
 *   1. Sets the minimum selectable date in the "to" picker.
 *   2. Clears the "to" value if it has already become invalid.
 */
CalendarManager.prototype.syncDateConstraints = function () {
  var fromSelected = this.fromCalendar.selectedDates[0] || null;
  var toSelected = this.toCalendar.selectedDates[0] || null;

  this.toCalendar.set("minDate", fromSelected || null);

  if (fromSelected && toSelected && toSelected < fromSelected) {
    this.toCalendar.clear();
    localStorage.removeItem(CONSTANTS.STORAGE_KEYS.SELECTED_TO_DATE);
  }
};

/** Format a Date object as an ISO 8601 string (YYYY-MM-DD). */
CalendarManager.prototype.formatDateToISO = function (date) {
  var year = date.getFullYear();
  var month = String(date.getMonth() + 1).padStart(2, "0");
  var day = String(date.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
};

CalendarManager.prototype.attachEventListeners = function () {
  var self = this;
  if (this.clearFromBtn) {
    this.clearFromBtn.addEventListener("click", function () {
      self.clearFromFilter();
    });
  }
  if (this.clearToBtn) {
    this.clearToBtn.addEventListener("click", function () {
      self.clearToFilter();
    });
  }
};

/** Clear both date pickers and remove the filter. */
CalendarManager.prototype.clearFilter = function () {
  this.fromCalendar.clear();
  this.toCalendar.clear();
  this.syncDateConstraints();
  this.postsManager.clearFilter();
  localStorage.removeItem(CONSTANTS.STORAGE_KEYS.SELECTED_FROM_DATE);
  localStorage.removeItem(CONSTANTS.STORAGE_KEYS.SELECTED_TO_DATE);
  this.updateClearButtonStates();
};

/** Clear only the "from" date and re-apply the range filter. */
CalendarManager.prototype.clearFromFilter = function () {
  this.fromCalendar.clear();
  localStorage.removeItem(CONSTANTS.STORAGE_KEYS.SELECTED_FROM_DATE);
  this.onDateChange();
};

/** Clear only the "to" date and re-apply the range filter. */
CalendarManager.prototype.clearToFilter = function () {
  this.toCalendar.clear();
  localStorage.removeItem(CONSTANTS.STORAGE_KEYS.SELECTED_TO_DATE);
  this.onDateChange();
};

/**
 * Restore previously saved dates from localStorage on page load,
 * then apply the range filter so the view matches the saved state.
 */
CalendarManager.prototype.restoreSelectedDate = function () {
  var savedFromDate = localStorage.getItem(CONSTANTS.STORAGE_KEYS.SELECTED_FROM_DATE);
  var savedToDate = localStorage.getItem(CONSTANTS.STORAGE_KEYS.SELECTED_TO_DATE);

  if (savedFromDate) {
    this.fromCalendar.setDate(new Date(savedFromDate), false);
  }
  if (savedToDate) {
    this.toCalendar.setDate(new Date(savedToDate), false);
  }

  this.syncDateConstraints();

  if (savedFromDate || savedToDate) {
    this.postsManager.filterByDateRange(
      this.getCalendarDate(this.fromCalendar),
      this.getCalendarDate(this.toCalendar)
    );
  }

  this.updateClearButtonStates();
};

/**
 * Disable a clear button when its associated input is empty
 * so the user gets a visual hint that there is nothing to clear.
 */
CalendarManager.prototype.updateClearButtonStates = function () {
  if (this.clearFromBtn) {
    this.clearFromBtn.disabled = this.fromInput.value.trim() === "";
  }
  if (this.clearToBtn) {
    this.clearToBtn.disabled = this.toInput.value.trim() === "";
  }
};

/** Return the ISO date string currently selected in the "from" picker, or null. */
CalendarManager.prototype.getSelectedDate = function () {
  return this.getCalendarDate(this.fromCalendar);
};

/** Return the ISO date string for the given Flatpickr instance, or null. */
CalendarManager.prototype.getCalendarDate = function (calendar) {
  if (calendar && calendar.selectedDates.length > 0) {
    return this.formatDateToISO(calendar.selectedDates[0]);
  }
  return null;
};

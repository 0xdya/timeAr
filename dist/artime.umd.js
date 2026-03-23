(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ArTime = {}));
})(this, (function (exports) { 'use strict';

  const intervals = {
    year: 31536000, month: 2592000, day: 86400,
    hour: 3600, minute: 60, second: 1
  };

  const arabicUnits = {
    year:   ["سنة",   "سنتين",   "سنوات",  "سنة"],
    month:  ["شهر",   "شهرين",   "أشهر",   "شهراً"],
    day:    ["يوم",   "يومين",   "أيام",   "يوماً"],
    hour:   ["ساعة",  "ساعتين",  "ساعات",  "ساعة"],
    minute: ["دقيقة", "دقيقتين", "دقائق",  "دقيقة"],
    second: ["ثانية", "ثانيتين", "ثوانٍ",  "ثانية"]
  };

  const format = (dateString) => {
    const seconds = Math.floor((Date.now() - new Date(dateString)) / 1000);
    if (seconds < 5) return "الآن";
    for (const [unit, value] of Object.entries(intervals)) {
      const count = Math.floor(seconds / value);
      if (count >= 1) {
        if (count === 1) return `منذ ${arabicUnits[unit][0]}`;
        if (count === 2) return `منذ ${arabicUnits[unit][1]}`;
        if (count <= 10) return `منذ ${count} ${arabicUnits[unit][2]}`;
        return `منذ ${count} ${arabicUnits[unit][3]}`;
      }
    }
    return "منذ مدة";
  };

  const init = (selector = ".artime") => {
    if (typeof document === 'undefined') return;
    const update = () => {
      document.querySelectorAll(selector).forEach(el => {
        if (!el.dataset.date) el.dataset.date = el.textContent.trim();
        el.textContent = format(el.dataset.date);
      });
    };
    update();
    setInterval(update, 60000);
  };

  var artime = { format, init };

  exports.default = artime;
  exports.format = format;
  exports.init = init;

  Object.defineProperty(exports, '__esModule', { value: true });

}));

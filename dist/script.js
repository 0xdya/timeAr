const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
};

const arabicUnits = {
    year: ["سنة", "سنتين", "سنوات", "سنة"],
    month: ["شهر", "شهرين", "أشهر", "شهراً"],
    week: ["أسبوع", "أسبوعين", "أسابيع", "أسبوعاً"],
    day: ["يوم", "يومين", "أيام", "يوماً"],
    hour: ["ساعة", "ساعتين", "ساعات", "ساعة"],
    minute: ["دقيقة", "دقيقتين", "دقائق", "دقيقة"],
    second: ["ثانية", "ثانيتين", "ثوانٍ", "ثانية"]
};

const parseArabicNumbers = (str) => 
    str.replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d));

function isValidTime(h, m, s) {
    return h >= 0 && h <= 23 && m >= 0 && m <= 59 && s >= 0 && s <= 59;
}

function isValidDateParts(d, m, y) {
    const date = new Date(y, m - 1, d);
    return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
}

function parseDate(input) {
    if (input instanceof Date) return input;
    
    input = parseArabicNumbers(String(input).trim());

    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(input)) {
        const d = new Date(input);
        if (isNaN(d)) throw new Error("Invalid ISO date");
        return d;
    }

    const customRegex = /^(\d{1,2})-(\d{1,2})-(\d{4})\s+(\d{2}):(\d{2}):(\d{2})$/;
    const match = input.match(customRegex);
    if (match) {
        const [_, day, month, year, h, m, s] = match.map(Number);
        if (!isValidDateParts(day, month, year) || !isValidTime(h, m, s)) {
            throw new Error("Invalid date parts");
        }
        return new Date(year, month - 1, day, h, m, s);
    }

    const fallback = new Date(input);
    if (isNaN(fallback)) throw new Error("Unsupported format");
    return fallback;
}

function arFormat(dateInput) {
    const now = new Date();
    const customDate = parseDate(dateInput);

    const diffSeconds = Math.floor(Math.abs(now - customDate) / 1000);
    
    if (diffSeconds < 60) return "الآن";

    const prefix = customDate > now ? "بعد" : "منذ";

    for (const [unit, value] of Object.entries(intervals)) {
        const count = Math.floor(diffSeconds / value);

        if (count >= 1) {
            if (count === 1) return `${prefix} ${arabicUnits[unit][0]}`;
            if (count === 2) return `${prefix} ${arabicUnits[unit][1]}`;
            if (count >= 3 && count <= 10) return `${prefix} ${count} ${arabicUnits[unit][2]}`;
            return `${prefix} ${count} ${arabicUnits[unit][3]}`;
        }
    }
    return "منذ مدة";
}

let elementsCache = [];

function init() {
    if (typeof document === "undefined") return;

    elementsCache = Array.from(document.querySelectorAll("[data-date], .time-ar"));

    const update = () => {
        elementsCache.forEach(el => {
            const dateStr = el.getAttribute("data-date") || el.getAttribute("data-original-text") || el.textContent.trim();
            
            if (!el.getAttribute("data-original-text")) {
                el.setAttribute("data-original-text", dateStr);
            }

            try {
                el.textContent = arFormat(dateStr);
            } catch (e) {
                el.textContent = "تاريخ غير صالح";
            }
        });
    };

    update();
    setInterval(update, 30000);
}

window.timeAr = { format: arFormat, init };
timeAr.init();

// التشغيل 
  timeAr.init();
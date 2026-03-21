import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);


type Unit = "year" | "month" | "day" | "hour" | "minute" | "second";

const intervals: Record<Unit, number> = {
  year: 31536000,
  month: 2592000,
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1
};

const arabicUnits: Record<Unit, [string, string, string, string]> = {
  year:   ["سنة", "سنتين", "سنوات", "سنة"],
  month:  ["شهر", "شهرين", "أشهر", "شهراً"],
  day:    ["يوم", "يومين", "أيام", "يوماً"],
  hour:   ["ساعة", "ساعتين", "ساعات", "ساعة"],
  minute: ["دقيقة", "دقيقتين", "دقائق", "دقيقة"],
  second: ["ثانية", "ثانيتين", "ثوانٍ", "ثانية"]
};

export const arFormat = (dateString: string | Date, dataFormat: string ): string => {

    const custom_date = dayjs(dateString, dataFormat);

    if (!custom_date.isValid()) {
        throw new Error(`Invalid Date: The provided date "${dateString}" does not match the format "${dataFormat}".`);
    }

    const date = new Date(custom_date.toDate());
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (seconds < 5) return "الآن";

    for (const unit of Object.keys(intervals) as Unit[]) {
    const value = intervals[unit];
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
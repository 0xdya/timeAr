import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { getTimezone as _getTimezone } from './setTime';

dayjs.extend(utc);
dayjs.extend(timezone);
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

export const arFormat = (dateInput: string | Date, dataFormat: string): string => {
  const tz = _getTimezone();
  const now = dayjs().tz(tz);

  let custom_date: Dayjs;

  if (dateInput instanceof Date) {
    custom_date = dayjs(dateInput).tz(tz);
  } else {
    const isTimeOnly = /^\d{1,2}:\d{2}(:\d{2})?$/.test(dateInput);

    if (isTimeOnly) {
      const today = now.format("YYYY-MM-DD");

      const parsedDate = dayjs(
        `${today} ${dateInput}`,
        `YYYY-MM-DD ${dataFormat}`,
        true
      );
      
      custom_date = parsedDate.tz(tz, true); 
    } else {
      const parsedDate = dayjs(dateInput, dataFormat, true);
      custom_date = parsedDate.tz(tz, true);
    }
  }

  if (!custom_date.isValid()) {
    throw new Error(`Invalid Date: The provided date "${dateInput}" does not match the format "${dataFormat}".`);
  }

  const seconds = Math.abs(custom_date.diff(now, "second"));

  if (seconds < 5) return "الآن";

  const prefix = custom_date.isAfter(now) ? "بعد" : "منذ";

  for (const unit of Object.keys(intervals) as Unit[]) {
    const value = intervals[unit];
    const count = Math.floor(seconds / value);

    if (count >= 1) {
      if (count === 1) return `${prefix} ${arabicUnits[unit][0]}`;
      if (count === 2) return `${prefix} ${arabicUnits[unit][1]}`;
      if (count <= 10) return `${prefix} ${count} ${arabicUnits[unit][2]}`;
      return `${prefix} ${count} ${arabicUnits[unit][3]}`;
    }
  }

  return `${prefix} مدة`;
};
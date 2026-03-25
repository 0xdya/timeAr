/**
 * جميع تنسيقات الوقت المتاحة في timeAr
 */
export interface Format {
  /** التاريخ بصيغة قصيرة (مثال: 2026-03-21) */
  shortDate: "DD-MM-YYYY";

  /** التاريخ بصيغة طويلة (مثال: March 21, 2026) */
  longDate: "MMMM D, YYYY";

  /** الوقت بالساعات والدقائق (مثال: 14:30) */
  shortTime: "HH:mm";

  /** الوقت بالثواني (مثال: 14:30:15) */
  longTime: "HH:mm:ss";

  /** التاريخ والوقت كاملاً (مثال: 2026-03-21 14:30:15) */
  fullDateTime: "DD-MM-YYYY HH:mm:ss";

  /** الشهر واليوم فقط (مثال: March 21) */
  monthDay: "MMMM D";

  /** الشهر والسنة (مثال: March 2026) */
  monthYear: "MMMM YYYY";

  /** التاريخ بالتنسيق المعتاد (مثال: 21/03/2026) */
  dayMonthYear: "DD/MM/YYYY";

  /** صيغة ISO 8601 العالمية (مثال: 2026-03-21T14:30:15Z) */
  iso8601: "YYYY-MM-DDTHH:mm:ssZ[Z]";

  /** الوقت بنظام 12 ساعة (مثال: 02:30 PM) */
  time12h: "hh:mm A";

  /** الوقت بنظام 12 ساعة مع الثواني (مثال: 02:30:15 PM) */
  time12hSeconds: "hh:mm:ss A";
}

export const format: Format = {
  shortDate: "DD-MM-YYYY",
  longDate: "MMMM D, YYYY",
  shortTime: "HH:mm",
  longTime: "HH:mm:ss",
  fullDateTime: "DD-MM-YYYY HH:mm:ss",
  monthDay: "MMMM D",
  monthYear: "MMMM YYYY",
  dayMonthYear: "DD/MM/YYYY",
  iso8601: "YYYY-MM-DDTHH:mm:ssZ[Z]",
  time12h: "hh:mm A",
  time12hSeconds: "hh:mm:ss A",
};
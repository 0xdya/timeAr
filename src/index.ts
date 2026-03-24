import { arFormat as _arFormat } from "./utils/timeArTranslate";
import { format as _format, Format } from "./utils/dateTypes";

/**
 * timeAr توفر أدوات للتعامل مع الوقت والتواريخ باللغة العربية.
 *
 * @returns واجهة تحتوي على:
 * - `format`: جميع تنسيقات الوقت المتاحة.
 * - `getTimeAr`: دالة لتحويل التاريخ/الوقت إلى نص عربي بالتنسيق المطلوب.
 *
 * @example
 * ```ts
 * import timeAr from "time-ar";
 * const time = timeAr().getTimeAr(new Date(), timeAr().format.shortDate);
 * ```
 */
const timeAr = () => {
  const format: Format = _format;

  return {
    /** جميع التنسيقات المتاحة (مثل shortDate, fullDateTime) */
    format,

    /**
     * تحويل التاريخ/الوقت إلى نص عربي بالتنسيق المطلوب
     *
     * @param time التاريخ المراد تنسيقه (Date أو string)
     * @param timeFormat التنسيق المطلوب (يفضل استخدام `timeAr().format`)
     * @returns نص التاريخ/الوقت المنسق بالعربية
     */
    getTimeAr: (time: Date | string, timeFormat: keyof Format): string =>
      _arFormat(time, timeFormat)
  };
};

export default timeAr;

module.exports = timeAr;
module.exports.default = timeAr;
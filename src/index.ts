import { arFormat as _arFormat } from "./utils/arTimeTranslate";
import { format as _format, Format } from "./utils/dateTypes";

/**
 * arTime توفر أدوات للتعامل مع الوقت والتواريخ باللغة العربية.
 *
 * @returns واجهة تحتوي على:
 * - `format`: جميع تنسيقات الوقت المتاحة.
 * - `getArTime`: دالة لتحويل التاريخ/الوقت إلى نص عربي بالتنسيق المطلوب.
 *
 * @example
 * ```ts
 * import arTime from "ar-time";
 * const now = arTime().getArTime(new Date(), arTime().format.shortDate);
 * ```
 */
const arTime = () => {
  const format: Format = _format;

  return {
    /** جميع التنسيقات المتاحة (مثل shortDate, fullDateTime) */
    format,

    /**
     * تحويل التاريخ/الوقت إلى نص عربي بالتنسيق المطلوب
     *
     * @param time التاريخ المراد تنسيقه (Date أو string)
     * @param timeFormat التنسيق المطلوب (يفضل استخدام `arTime().format`)
     * @returns نص التاريخ/الوقت المنسق بالعربية
     */
    getArTime: (time: Date | string, timeFormat: keyof Format): string =>
      _arFormat(time, timeFormat)
  };
};

export default arTime;

module.exports = arTime;
module.exports.default = arTime;
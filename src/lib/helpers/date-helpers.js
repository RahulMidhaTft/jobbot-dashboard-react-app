function localizeIso8601(date) {
  const offset = new Date().getTimezoneOffset();
  const isGMTPlus = offset < 0;
  const finalDate = new Date(date).setMinutes(
    new Date(date).getMinutes() + (isGMTPlus ? Math.abs(offset) : -offset)
  );
  return finalDate;
}

function unLocalizeIso8601(date) {
  const offset = new Date().getTimezoneOffset();
  const isGMTPlus = offset < 0;
  const finalDate = new Date(date).setMinutes(
    new Date(date).getMinutes() + (isGMTPlus ? offset : Math.abs(offset))
  );
  return finalDate;
}

/*
 * All methods till the "end" comment add the local timezone offset to the result iso string because of the method localiseIso8601.
 * To avoid incorrect date calculation use the unLocalizeIso8601 method which compensates the offset back
 * */

export function getNow() {
  return new Date(localizeIso8601(Date.now())).toISOString();
}
export function getFirstDayOfThisMonth() {
  const date = new Date().setDate(1);
  return new Date(localizeIso8601(date)).toISOString();
}
export function getFirstDateOfPreviousMonth() {
  const date = new Date(new Date().setDate(1)).setMonth(
    new Date().getMonth() - 1
  );
  return new Date(localizeIso8601(date)).toISOString();
}
export function getLastDateOfPreviousMonth() {
  return new Date(localizeIso8601(new Date().setDate(0))).toISOString();
}
export function getFirstDayOfPrevMonths(monthCount) {
  const date = new Date(new Date().setDate(1)).setMonth(
    new Date().getMonth() - monthCount
  );
  return new Date(localizeIso8601(date)).toISOString();
}
export function getLastDateOfThisMonth() {
  const now = new Date(),
    y = now.getFullYear(),
    m = now.getMonth(),
    h = now.getHours(),
    min = now.getMinutes(),
    s = now.getSeconds(),
    ms = now.getMilliseconds();
  const date = new Date(y, m + 1, 0, h, min, s, ms);
  return new Date(localizeIso8601(+date)).toISOString();
}
/*
 * end
 * */

export function getDaysUntilEndOfMonth() {
  return (
    new Date(unLocalizeIso8601(+new Date(getLastDateOfThisMonth()))).getDate() -
    new Date(unLocalizeIso8601(+new Date(getNow()))).getDate()
  );
}

export function generateDateStringsBetweenDates() {
  return new Array(getDaysUntilEndOfMonth())
    .fill(null)
    .map((_, i) =>
      new Date(
        localizeIso8601(new Date().setDate(i + 1 + new Date().getDate()))
      ).toISOString()
    );
}

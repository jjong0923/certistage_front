/** YYYYMMDD → YYYY-MM-DD */
export const parseDateString = (dateStr: string): string => {
  if (!dateStr || dateStr.length !== 8) return "";
  return `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`;
};

/** Date → "11.15(수)" 형태 */
export const formatDateWithDay = (dateStr: string): string => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekDay = weekDays[date.getDay()];

  return `${month}.${day}(${weekDay})`;
};

/** "11.15(수)" → 정렬용 숫자 1115 */
export const getDateWeight = (dateStr: string): number => {
  const match = dateStr.match(/(\d+)\.(\d+)/);
  if (!match) return 0;

  const month = Number(match[1]);
  const day = Number(match[2]);

  return month * 100 + day;
};

/** DailyExams[] → 현재 달만 필터링 */
export const filterByMonth = (dataList: { date: string }[], current: Date) => {
  const currentMonth = current.getMonth() + 1;

  return dataList.filter((item) => {
    const itemMonth = parseInt(item.date.split(".")[0], 10);
    return itemMonth === currentMonth;
  });
};

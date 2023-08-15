export const useDateKit = () => {
  // генерация трех ближайших дней (сегодня, завтра, послезавтра)
  const generateDate = () => {
    const actualDate = new Date().toLocaleDateString().split('.').reverse().join('-');;

    const dayOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    let currentDate = null;
    let key = null;
    const dates = new Map();
    for (let i = 0; i < 3; i++) {
      let charsDay = "";
      const date = new Date();
      date.setDate(date.getDate() + i);
      if (i === 0) {
        charsDay = "сегодня";
      }
      if (i === 1) {
        charsDay = "завтра";
      }
      if (charsDay) {
        key = charsDay;
      } else {
        key = dayOfWeek[date.getDay()];
      }
      const month = new Intl.DateTimeFormat("ru", { month: "long" }).format(
        date
      );
      currentDate = date.toLocaleDateString().split('.').reverse().join('-');
      dates.set(key, {
        numbersDate: currentDate.split('.').reverse().join('-'),
        charsMonth: month,
        day: date.getDate(),
      });
    }
    return { dates, actualDate };
  };
// проверка на будний день
  const checkIsWeekDay = (day) => {
    const dayOfWeek = new Date(day).getDay();

    return dayOfWeek === 0 || dayOfWeek === 6 ? 0 : 1;
  }
// вывод даты в формате 24 МАЯ 2023 Г.
  const formattedDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }

    return new Date(date).toLocaleDateString("ru-RU", options)
  }

  return { generateDate, checkIsWeekDay, formattedDate };
};

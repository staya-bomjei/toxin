function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function choiceCountable(number, countable1, countable2, countable3) {
  if (number === 1) {
    return `${capitalize(countable1)} назад`;
  }

  if (number > 10 && number < 20) {
    return `${number} ${countable3} назад`;
  }

  switch (number % 10) {
    case 1:
      return `${number} ${countable1} назад`;
    case 2:
    case 3:
    case 4:
      return `${number} ${countable2} назад`;
    default:
      return `${number} ${countable3} назад`;
  }
}

function timeAgo(dateString) {
  const date = (dateString) ? new Date(dateString) : new Date();
  const now = new Date();
  const seconds = Math.trunc((Number(now) - Number(date)) / 1000);
  if (seconds < 60) {
    return choiceCountable(seconds, 'секунду', 'секунды', 'секунд');
  }

  const minutes = Math.trunc(seconds / 60);
  if (minutes < 60) {
    return choiceCountable(minutes, 'минуту', 'минуты', 'минут');
  }

  const hours = Math.trunc(minutes / 60);
  if (hours < 24) {
    return choiceCountable(hours, 'час', 'часа', 'часов');
  }

  const days = Math.trunc(hours / 24);
  if (days < 7) {
    return choiceCountable(days, 'день', 'дня', 'дней');
  }

  const weeks = Math.trunc(days / 7);
  if (weeks < 4) {
    return choiceCountable(weeks, 'неделю', 'недели', 'недель');
  }

  const months = Math.trunc(weeks / 4);
  if (months < 12) {
    return choiceCountable(months, 'месяц', 'месяца', 'месяцев');
  }

  const years = Math.trunc(months / 12);
  return choiceCountable(years, 'год', 'года', 'лет');
}

module.exports = {
  timeAgo,
};

function choiceCountable(counter, countables) {
  if (counter === 1) {
    return countables[0];
  }

  if (counter > 10 && counter < 20) {
    return countables[2];
  }

  switch (counter % 10) {
    case 1:
      return countables[0];
    case 2:
    case 3:
    case 4:
      return countables[1];
    default:
      return countables[2];
  }
}

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function buildSentence(counter, countables) {
  const countable = choiceCountable(counter, countables);

  if (counter === 1) return capitalize(countable);

  return `${counter} ${countable} назад`;
}

function timeAgo(dateString) {
  const date = (dateString) ? new Date(dateString) : new Date();
  const now = new Date();

  const seconds = Math.trunc((Number(now) - Number(date)) / 1000);
  if (seconds < 60) return buildSentence(seconds, ['секунду', 'секунды', 'секунд']);

  const minutes = Math.trunc(seconds / 60);
  if (minutes < 60) return buildSentence(minutes, ['минуту', 'минуты', 'минут']);

  const hours = Math.trunc(minutes / 60);
  if (hours < 24) return buildSentence(hours, ['час', 'часа', 'часов']);

  const days = Math.trunc(hours / 24);
  if (days < 7) return buildSentence(days, ['день', 'дня', 'дней']);

  const weeks = Math.trunc(days / 7);
  if (weeks < 4) return buildSentence(weeks, ['неделю', 'недели', 'недель']);

  const months = Math.trunc(weeks / 4);
  if (months < 12) return buildSentence(months, ['месяц', 'месяца', 'месяцев']);

  const years = Math.trunc(months / 12);
  return buildSentence(years, ['год', 'года', 'лет']);
}

module.exports = {
  choiceCountable,
  timeAgo,
};

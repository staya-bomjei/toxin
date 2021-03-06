function choiceCountable(counter, countables) {
  const isTeenCounter = counter > 10 && counter < 20;

  if (isTeenCounter) {
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

  if (counter === 1) return `${capitalize(countable)} назад`;

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

function makeCurrency(number, postfix = '', locale = 'ru') {
  return `${number.toLocaleString(locale)}${postfix}`;
}

function toFixed(number, fixedNumbers) {
  return Number(number.toFixed(fixedNumbers));
}

function calcNearestStepValue(value, step, base, fixedNumbers = 12) {
  if (step < 0) {
    throw new Error('Step can\'t be less than zero');
  }

  const basedValue = value - base;
  if (basedValue % step === 0) return value;

  let minCorrectValue = Math.trunc(basedValue / step) * step + base;
  minCorrectValue = toFixed(minCorrectValue, fixedNumbers);
  const minDifference = value - minCorrectValue;
  let maxCorrectValue = (Math.trunc(basedValue / step) + 1) * step + base;
  maxCorrectValue = toFixed(maxCorrectValue, fixedNumbers);
  const maxDifference = maxCorrectValue - value;

  return (minDifference < maxDifference) ? minCorrectValue : maxCorrectValue;
}

export {
  choiceCountable,
  timeAgo,
  makeCurrency,
  calcNearestStepValue,
};

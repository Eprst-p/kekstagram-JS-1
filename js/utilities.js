function getRandomPositiveNumber (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b))); // находим минимальное значение из модулей a и b, округляем вверх
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b))); // находим максимальное значение из модулей a и b, округляем вниз
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;  //рандомное число от a до b включительно
}

//Реализация рандомайзера взята с MDN Web Docs. Не является криптологически стойким.

function checkCommentLength (commentLength, maxCommentLength) {
  return (commentLength <= maxCommentLength);
}

const isEscapeKey = (evt) => evt.key === 'Escape';


export {getRandomPositiveNumber, checkCommentLength, isEscapeKey};

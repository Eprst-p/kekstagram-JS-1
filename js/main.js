function getRandomPositiveNumber (min, max) {
  if (min<0 || max<0) {return alert("Введите диапазон положительных чисел")};
  if (max <= min) {return alert("Максимальное значение диапазона должно быть больше минимального как минимум на единицу")};
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomPositiveNumber(10,25);

//Реализация рандомайзера взята с MDN Web Docs. Не является криптологически стойким.

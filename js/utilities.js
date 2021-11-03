/* eslint-disable no-use-before-define */
function getRandomPositiveNumber (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b))); // находим минимальное значение из модулей a и b, округляем вверх
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b))); // находим максимальное значение из модулей a и b, округляем вниз
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;  //рандомное число от a до b включительно
}

//Реализация рандомайзера взята с MDN Web Docs. Не является криптологически стойким.

//проверка длины коммента
function checkCommentLength (commentLength, maxCommentLength) {
  return (commentLength <= maxCommentLength);
}

//проверка на кнопку Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

//скролинг окна
const addBodyModalOpen = () => document.querySelector('body').classList.add('modal-open');
const removeBodyModalOpen = () => document.querySelector('body').classList.remove('modal-open');

//закрытие эелементов через крестик и Esc
const createCloseAndEscapeListeners = function (overlay, cancelButton, otherFunctionality) {
  const onCloseButtonClick = function () {
    overlay.classList.add('hidden');
    removeBodyModalOpen();
    document.removeEventListener('keydown', onEscKey); //чуть-шуть ругаица нащальника (задизейблено в линтере)
    cancelButton.removeEventListener('click', onCloseButtonClick);
    otherFunctionality();
  };
  cancelButton.addEventListener('click', onCloseButtonClick);

  const onEscKey = function (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      overlay.classList.add('hidden');
      removeBodyModalOpen();
      cancelButton.removeEventListener('click', onCloseButtonClick);
      document.removeEventListener('keydown', onEscKey);
      otherFunctionality();
    }
  };
  document.addEventListener('keydown', onEscKey);


};

export {getRandomPositiveNumber, checkCommentLength, addBodyModalOpen, removeBodyModalOpen, createCloseAndEscapeListeners, isEscapeKey};

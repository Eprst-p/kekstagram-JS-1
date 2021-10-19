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

const addBodyModalOpen = () => document.querySelector('body').classList.add('modal-open');
const removeBodyModalOpen = () => document.querySelector('body').classList.remove('modal-open');


const cancelAndEscape = function (overlay, cancelButton, otherFunctionality) {
  const onCloseButtonClick = function () {
    overlay.classList.add('hidden');
    removeBodyModalOpen();
    document.removeEventListener('keydown', onEscKey); //чуть-шуть ругаица нащальника (позже запретить)
    otherFunctionality();
  };
  cancelButton.addEventListener('click', onCloseButtonClick, {once: true});//может лучше сделать единообразное удаление обработчиков?

  const onEscKey = function (evtKey) {
    if (isEscapeKey) {
      evtKey.preventDefault();
      overlay.classList.add('hidden');
      removeBodyModalOpen();
      cancelButton.removeEventListener('click', onCloseButtonClick);
      otherFunctionality();
    }
  };
  document.addEventListener('keydown', onEscKey, {once: true});


};

export {getRandomPositiveNumber, checkCommentLength, isEscapeKey, addBodyModalOpen, removeBodyModalOpen, cancelAndEscape};

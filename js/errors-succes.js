import {createCloseAndEscapeListeners} from './utilities.js';

const sectionToAdd = document.querySelector('main');

//успешный успех
const successTemplate = document.querySelector('#success').content;
const successElement = successTemplate.querySelector('.success');
const successElementClone = successElement.cloneNode(true);
const successSideSpace = successElementClone.closest('.success');
const successDiv = successElementClone.querySelector('.success__inner');
const succesButton = successElementClone.querySelector('.success__button');

//ошибочка при отправке
const errorTemplate = document.querySelector('#error').content;
const errorElement = errorTemplate.querySelector('.error');
const errorElementClone = errorElement.cloneNode(true);
const errorSideSpace = errorElementClone.closest('.error');
const errorDiv = errorElementClone.querySelector('.error__inner');
const errorButton = errorElementClone.querySelector('.error__button');

//ошибочка при загрузке с сервера (ну почти сам придумал дизайн, да-да:))
const errorServerElementClone = errorElement.cloneNode(true);
const errorServerSideSpace = errorServerElementClone.closest('.error');
const errorServerDiv = errorServerElementClone.querySelector('.error__inner');
errorServerDiv.style.color = '#f3de7f';
errorServerDiv.style.backgroundColor = '#5f0d0d';
const errorServerButton = errorServerElementClone.querySelector('.error__button');
errorServerButton.textContent = 'Здесь ваши полномочия всё';
const errorServerTitle = errorServerElementClone.querySelector('.error__title');
errorServerTitle.textContent = 'Ошибка сервера';


//общяя функция вывода сообщения
const showMessage = (elementClone, elementSideSpace, elementDiv, elementButton) => {
  sectionToAdd.appendChild(elementClone);
  elementClone.classList.remove('hidden');
  const closeMessage = () => {
    elementClone.classList.add('hidden');
    elementSideSpace.removeEventListener('click', onSideSpaceClick); //та же фигня, незнаю, как перекомпоновать чтоб не ругался.
    elementDiv.removeEventListener('click', onDivClick);
  };

  createCloseAndEscapeListeners(elementClone, elementButton, closeMessage);

  const onSideSpaceClick = () => {
    closeMessage();
  };
  const onDivClick = (evt) => {
    evt.stopPropagation();
  };

  elementSideSpace.addEventListener('click', onSideSpaceClick);
  elementDiv.addEventListener('click', onDivClick);
};

//сообщение об успехе
const showSuccesMessage = () => {
  showMessage(successElementClone, successSideSpace, successDiv, succesButton);
};

//сообщение об ошибке
const showErrorMessage = () => {
  showMessage(errorElementClone, errorSideSpace, errorDiv, errorButton);
};

//ошибка сервера
const showServerErrorMessage = () => {
  showMessage(errorServerElementClone, errorServerSideSpace, errorServerDiv, errorServerButton);
};


export {showSuccesMessage, showErrorMessage, showServerErrorMessage};

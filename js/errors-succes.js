import {createCloseAndEscapeListeners} from './utilities.js';

//успешный успех
const sectionToAdd = document.querySelector('body');

const successTemplate = document.querySelector('#success').content;
const successElement = successTemplate.querySelector('.success');
const successElementClone = successElement.cloneNode(true);
const successSideSpace = successElementClone.closest('.success');
const successDiv = successElementClone.querySelector('.success__inner');
const coolButton = successElementClone.querySelector('.success__button');


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


//сообщение об успехе
const showSuccesMessage = () => {
  sectionToAdd.appendChild(successElementClone);
  successElementClone.classList.remove('hidden');
  const closeSuccessMessage = () => {
    successElementClone.classList.add('hidden');
    successSideSpace.removeEventListener('click', onSuccesSideSpaceClick); //та же фигня, незнаю, как перекомпоновать чтоб не ругался. Можно вынести в отдельный модуль, но это хуже читаемо
    successDiv.removeEventListener('click', onSuccesDivClick);
  };

  createCloseAndEscapeListeners(successElementClone, coolButton, closeSuccessMessage);

  const onSuccesSideSpaceClick = () => {
    closeSuccessMessage();
  };
  const onSuccesDivClick = (evt) => {
    evt.stopPropagation();
  };

  successSideSpace.addEventListener('click', onSuccesSideSpaceClick);
  successDiv.addEventListener('click', onSuccesDivClick);
};


//сообщение об ошибке
const showErrorMessage = () => {
  sectionToAdd.appendChild(errorElementClone);
  errorElementClone.classList.remove('hidden');
  const closeErrorMessage = () => {
    errorElementClone.classList.add('hidden');
    errorSideSpace.removeEventListener('click', onErrorSideSpaceClick); //аналогично
    errorDiv.removeEventListener('click', onErrorDivClick);
  };

  createCloseAndEscapeListeners(errorElementClone, errorButton, closeErrorMessage);

  const onErrorSideSpaceClick = () => {
    closeErrorMessage();
  };
  const onErrorDivClick = (evt) => {
    evt.stopPropagation();
  };

  errorSideSpace.addEventListener('click', onErrorSideSpaceClick);
  errorDiv.addEventListener('click', onErrorDivClick);
};

//ошибка сервера
const showServerErrorMessage = () => {
  sectionToAdd.appendChild(errorServerElementClone);
  errorServerElementClone.classList.remove('hidden');
  const closeErrorMessage = () => {
    errorServerElementClone.classList.add('hidden');
    errorServerSideSpace.removeEventListener('click', onErrorServerSideSpaceClick); //аналогично
    errorServerDiv.removeEventListener('click', onErrorServerDivClick);
  };

  createCloseAndEscapeListeners(errorServerElementClone, errorServerButton, closeErrorMessage);

  const onErrorServerSideSpaceClick = () => {
    closeErrorMessage();
  };
  const onErrorServerDivClick = (evt) => {
    evt.stopPropagation();
  };

  errorServerSideSpace.addEventListener('click', onErrorServerSideSpaceClick);
  errorServerDiv.addEventListener('click', onErrorServerDivClick);
};


export {showSuccesMessage, showErrorMessage, showServerErrorMessage};

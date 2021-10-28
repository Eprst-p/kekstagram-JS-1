import {createCloseAndEscapeListeners} from './utilities.js';

//успешный успех
const sectionToAdd = document.querySelector('body');

const successTemplate = document.querySelector('#success').content;
const successElement = successTemplate.querySelector('.success');
const successElementClone = successElement.cloneNode(true);
const successSideSpace = successElementClone.closest('.success');
const successDiv = successElementClone.querySelector('.success__inner');
const coolButton = successElementClone.querySelector('.success__button');


//ошибочка
const errorTemplate = document.querySelector('#error').content;
const errorElement = errorTemplate.querySelector('.error');
const errorElementClone = errorElement.cloneNode(true);
const errorSideSpace = errorElementClone.closest('.error');
const errorDiv = errorElementClone.querySelector('.error__inner');
const errorButton = errorElementClone.querySelector('.error__button');


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

export {showSuccesMessage, showErrorMessage};

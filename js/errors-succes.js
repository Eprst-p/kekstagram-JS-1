import {onOpenFormMisc, allowedExtensions, uploadOverlay, uploadCancelButton, closeFormFunctional} from './form.js';
import {createCloseAndEscapeListeners} from './utilities.js';

//успешный успех
const successTemplate = document.querySelector('#success').content;
const successElement = successTemplate.querySelector('.success');
const sectionToAdd = document.querySelector('main');
const succesElementClone = successElement.cloneNode(true);

//ошибочка
const errorTemplate = document.querySelector('#error').content;
const errorElement = errorTemplate.querySelector('.error');
const errorElementClone = errorElement.cloneNode(true);
const uploadFileError = errorElementClone.querySelector('#upload-file-error');


//сообщение об успехе
const showSuccesMessage = () => {
  const coolButton = succesElementClone.querySelector('.success__button');
  sectionToAdd.appendChild(succesElementClone);
  succesElementClone.classList.remove('hidden');

  const onCoolButtonClick = () => {
    succesElementClone.classList.add('hidden');
    coolButton.removeEventListener('click', onCoolButtonClick);
  };
  coolButton.addEventListener('click', onCoolButtonClick);
};


//сообщение об ошибке
const showErrorMessage = () => {
  //const errorButton = errorElementClone.querySelector('.error__button');
  sectionToAdd.appendChild(errorElementClone);
  errorElementClone.classList.remove('hidden');

  const onUploadFileChangeError = function () { //не работает кнопка, не пойму почему
    errorElementClone.classList.add('hidden');
    onOpenFormMisc();
    if (!allowedExtensions.includes(uploadFileError.value.toLowerCase().slice(-3))) {
      uploadFileError.setCustomValidity('Неверный формат');
      uploadFileError.reportValidity();
    } else {
      uploadFileError.setCustomValidity('');
      uploadFileError.reportValidity();
    }
    createCloseAndEscapeListeners(uploadOverlay, uploadCancelButton, closeFormFunctional);
  };
  uploadFileError.addEventListener('change', onUploadFileChangeError);

};

export {showSuccesMessage, showErrorMessage};

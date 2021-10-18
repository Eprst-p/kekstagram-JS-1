import {cancelAndEscape, addBodyModalOpen} from './utilities.js';

const loadPhoto = function () {
  const formElement = document.querySelector('.img-upload__form');
  const uploadFile = formElement.querySelector('#upload-file');
  const uploadOverlay = formElement.querySelector('.img-upload__overlay');
  const uploadCancelButton = formElement.querySelector('#upload-cancel');

  uploadFile.addEventListener('change', () => {
    uploadOverlay.classList.remove('hidden');
    addBodyModalOpen();

    const cancelInputValue = function () {
      uploadFile.value = '';
      //какие-то другие формы нужно тоже сбросить (пока хз какие)
    };
    cancelAndEscape(uploadOverlay, uploadCancelButton, cancelInputValue);

  });




  /*
  formElement.addEventListener('submit', () => {
    console.log('Form load');
  });
  */

};

export {loadPhoto};

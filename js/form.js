import {cancelAndEscape, addBodyModalOpen} from './utilities.js';

const loadPhoto = function () {
  const formElement = document.querySelector('.img-upload__form');
  const uploadFile = formElement.querySelector('#upload-file');
  const uploadOverlay = formElement.querySelector('.img-upload__overlay');
  const uploadCancelButton = formElement.querySelector('#upload-cancel');

  uploadFile.addEventListener('change', () => {
    uploadOverlay.classList.remove('hidden');
    addBodyModalOpen();

    cancelAndEscape(uploadOverlay, uploadCancelButton);

  });




  /*
  formElement.addEventListener('submit', () => {
    console.log('Form load');
  });
  */

};

export {loadPhoto};

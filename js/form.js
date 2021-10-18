import {cancelAndEscape, addBodyModalOpen} from './utilities.js';

const loadPhoto = function () {
  const formElement = document.querySelector('.img-upload__form');
  const uploadFile = formElement.querySelector('#upload-file');
  const uploadOverlay = formElement.querySelector('.img-upload__overlay');
  const uploadCancelButton = formElement.querySelector('#upload-cancel');

  //для редактирования изображения
  const scaleField = uploadOverlay.querySelector('.img-upload__scale');
  const scaleValueElement = scaleField.querySelector('.scale__control--value');
  const uploadImg = uploadOverlay.querySelector('.img-upload__preview img');


  const onScaleClick = function (evt) {
    const scaleValue = +scaleValueElement.value.slice(0,-1);
    if (evt.target.matches('.scale__control--smaller') && scaleValue > 25) {
      scaleValueElement.value = `${scaleValue - 25}%`;
      uploadImg.style.transform = `scale(${+scaleValueElement.value.slice(0,-1) / 100})`;
    }
    if (evt.target.matches('.scale__control--bigger') && scaleValue < 100) {
      scaleValueElement.value = `${scaleValue + 25}%`;
      uploadImg.style.transform = `scale(${+scaleValueElement.value.slice(0,-1) / 100})`;
    }

  };
  scaleField.addEventListener('click', onScaleClick);


  const onUploadFileChange = function () {
    uploadOverlay.classList.remove('hidden');
    addBodyModalOpen();

    const closeFormFunctional = function () {
      uploadFile.value = '';
      scaleValueElement.value = '100%';
      uploadImg.style.transform = 'scale(1.0)'; //сброс на дефолтный масштаб, иначе одно и то же изображение будет стартовать с предыдущим масштабом
      //+какие-то другие формы нужно тоже сбросить (пока хз какие)
    };
    cancelAndEscape(uploadOverlay, uploadCancelButton, closeFormFunctional);
  };
  uploadFile.addEventListener('change', onUploadFileChange);




  /*
  formElement.addEventListener('submit', () => {
    console.log('Form load');
  });
  */

};

export {loadPhoto};

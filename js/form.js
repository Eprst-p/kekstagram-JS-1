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
  const sliderElement = uploadOverlay.querySelector('.effect-level__slider');
  const effectValueElement = uploadOverlay.querySelector('.effect-level__value');
  const effectList = uploadOverlay.querySelector('.effects__list');
  const sliderField = uploadOverlay.querySelector('.img-upload__effect-level');


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


  const slider = noUiSlider.create(sliderElement, {
    start: 100,
    connect: [true, false],
    step: 1,
    range: {'min': 0,'max': 100},
  });


  let effect = 'none';
  let coefficient = 1;
  let unit = '';
  const onEffectChange = function (evt) {
    if (evt.target.closest('.effects__item')) {
      const targetSearchArea = evt.target.closest('.effects__item');
      const checkEffect = function(effectType) {
        return targetSearchArea.querySelector(effectType);
      };

      const setDefaultEffect = () => {
        sliderField.classList.remove('hidden');
        slider.set(100);
        uploadImg.style.filter = `${effect}(${slider.get(true)*coefficient}${unit})`;};

      if (checkEffect('#effect-none')) {
        sliderField.classList.add('hidden');
        uploadImg.style.filter = 'none';
      }
      if (checkEffect('#effect-chrome')) {
        effect = 'grayscale';
        coefficient = 0.01;
        unit = '';
        setDefaultEffect();
      }
      if (checkEffect('#effect-sepia')) {
        effect ='sepia';
        coefficient = 0.01;
        unit = '';
        setDefaultEffect();
      }
      if (checkEffect('#effect-marvin')) {
        effect ='invert';
        coefficient = 1;
        unit = '%';
        setDefaultEffect();
      }
      if (checkEffect('#effect-phobos')) {
        effect ='blur';
        coefficient = 0.33333333;
        unit = 'px';
        setDefaultEffect();
      }
      if (checkEffect('#effect-heat')) {
        effect ='brightness';
        coefficient = 0.33333333;
        unit = '';
        setDefaultEffect();
      }

    }
  };

  effectList.addEventListener('change', onEffectChange);



  sliderElement.noUiSlider.on('change', () => {   //не могу навесить addEventListener почему-то сюда ,вместо on.
    const sliderValue = slider.get(true);
    effectValueElement.value = sliderValue;
    uploadImg.style.filter = `${effect}(${sliderValue*coefficient}${unit})`;

  });





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

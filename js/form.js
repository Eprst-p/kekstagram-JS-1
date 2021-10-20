import {cancelAndEscape, addBodyModalOpen, isEscapeKey, checkCommentLength} from './utilities.js';


const loadPhoto = function () {
  //общее
  const formElement = document.querySelector('.img-upload__form');
  const uploadFile = formElement.querySelector('#upload-file');
  const uploadOverlay = formElement.querySelector('.img-upload__overlay');
  const uploadCancelButton = formElement.querySelector('#upload-cancel');

  //для редактирования изображения
  const scaleField = uploadOverlay.querySelector('.img-upload__scale');
  const scaleValueElement = scaleField.querySelector('input[name="scale"]');
  const uploadImg = uploadOverlay.querySelector('.img-upload__preview img');
  const sliderElement = uploadOverlay.querySelector('.effect-level__slider');
  const effectValueElement = uploadOverlay.querySelector('input[name="effect-level"]');
  const effectList = uploadOverlay.querySelector('.effects__list');
  const sliderField = uploadOverlay.querySelector('.img-upload__effect-level');

  //для хештегов м комментов
  const hashtagsInput = uploadOverlay.querySelector('input[name="hashtags"]');
  const hashtagPattern = /^#[A-za-zА-яа-яЁё0-9]{1,19}$/;
  const commentsTextArea = uploadOverlay.querySelector('.text__description');


  //блок комментов
  const onCommentsFieldInput = function () {
    if (!checkCommentLength(commentsTextArea.value.length, 5)) {
      commentsTextArea.setCustomValidity('Слишком длинный коментарий');
      commentsTextArea.reportValidity();
    }
  };
  commentsTextArea.addEventListener('input', onCommentsFieldInput);


  //блок хештегов
  const onHashtagFieldInput = function() {
    const hashtags = hashtagsInput.value.split(' ');
    for (let i = 0; i < hashtags.length; i++) { //с forEach такая тема не работает как надо
      const hashtag = hashtags[i];
      const otherHashtags = hashtags.slice(0, i).concat(hashtags.slice(i+1));
      const createValidityMessage = function (message) {
        hashtagsInput.setCustomValidity(message);
        hashtagsInput.reportValidity();
      };

      if (hashtag[0] !== '#') {
        createValidityMessage('Хештег должен начинаться с символа #');
        break;
      } else
      if (hashtag.length === 1) {
        createValidityMessage('Хештег должен содержать хотябы один символ');
        break;
      } else
      if (hashtag.length >= 20) {
        createValidityMessage('Слишком длинный хештег');
        break;
      } else
      if (!hashtagPattern.test(hashtag)) {
        createValidityMessage('Хештег содержит некошерный символ');
        break;
      } else
      if (otherHashtags.find((element) => element === hashtag)) {
        createValidityMessage('У вас одинаковые хештеги');
        break;
      } else
      if (hashtags.length > 5) {
        createValidityMessage('Хештегов не может быть больше 5');
        break;
      }
      else {
        createValidityMessage('');
      }
    }
  };
  hashtagsInput.addEventListener('input', onHashtagFieldInput);


  //блок масштаба
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


  //блок эффектов
  const slider = noUiSlider.create(sliderElement, { //не получается изменять опции в дальнейшем почему то
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


  //общий блок при открытии и отправке формы
  const allowedExtensions = ['png', 'jpg'];

  const onUploadFileChange = function () {
    uploadOverlay.classList.remove('hidden');
    addBodyModalOpen();
    if (!allowedExtensions.includes(uploadFile.value.slice(-3))) {
      uploadFile.setCustomValidity('Неверный формат');
      uploadFile.reportValidity();
    } else {
      uploadFile.setCustomValidity('');
      uploadFile.reportValidity();
    }

    const onFieldFocus = function (field) {
      field.addEventListener('keydown', (evt) => {
        if (isEscapeKey(evt)) {
          evt.stopPropagation();
        }
      });
    };
    hashtagsInput.addEventListener('focus', onFieldFocus(hashtagsInput));
    commentsTextArea.addEventListener('focus', onFieldFocus(commentsTextArea));

    const closeFormFunctional = function () {
      uploadFile.value = '';
      scaleValueElement.value = '100%';
      uploadImg.style.transform = 'scale(1.0)'; //сброс на дефолтный масштаб, иначе одно и то же изображение будет стартовать с предыдущим масштабом
      //+какие-то другие формы нужно тоже сбросить (пока хз какие)
      hashtagsInput.removeEventListener('focus', onFieldFocus(hashtagsInput));
      commentsTextArea.removeEventListener('focus', onFieldFocus(commentsTextArea));
    };
    cancelAndEscape(uploadOverlay, uploadCancelButton, closeFormFunctional);
  };
  uploadFile.addEventListener('change', onUploadFileChange);

};

export {loadPhoto};

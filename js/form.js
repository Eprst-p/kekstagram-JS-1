import {createCloseAndEscapeListeners, addBodyModalOpen, isEscapeKey, checkCommentLength, removeBodyModalOpen} from './utilities.js';
import {showSuccesMessage, showErrorMessage} from './errors-succes.js';
import {sendData} from './server-fetch.js';

//общее
const formElement = document.querySelector('.img-upload__form');
const uploadFile = formElement.querySelector('#upload-file');
const uploadOverlay = formElement.querySelector('.img-upload__overlay');
const uploadCancelButton = formElement.querySelector('#upload-cancel');
const ALLOWED_EXTENSIONS = ['png', 'jpg', 'jpeg'];

//для редактирования изображения
const uploadImg = uploadOverlay.querySelector('.img-upload__preview img');
const sliderElement = uploadOverlay.querySelector('.effect-level__slider');
const effectValueInput = uploadOverlay.querySelector('input[name="effect-level"]');
const effectList = uploadOverlay.querySelector('.effects__list');
const sliderField = uploadOverlay.querySelector('.img-upload__effect-level');
const scaleField = uploadOverlay.querySelector('.img-upload__scale');
const scaleValueInput = scaleField.querySelector('input[name="scale"]');
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;

//для хештегов и комментов
const hashtagsInput = uploadOverlay.querySelector('input[name="hashtags"]');
const hashtagPattern = /^#[A-za-zА-яа-яЁё0-9]{1,19}$/;
const commentsTextArea = uploadOverlay.querySelector('.text__description');
const MAX_COMMENT_LENGTH = 140;

//превью
const previewImg = formElement.querySelector('.img-upload__preview img');


//фокус на поле для комментов и хештегов
const onFieldFocus = (field) => {
  field.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });
};

//возвращение полей и эффектов на значения по умолчанию
const setFieldsToDeafault = () => {
  formElement.reset();
  sliderField.classList.add('hidden');
  uploadImg.style.filter = 'none';
  uploadImg.style.transform = 'scale(1.0)';
};

//функционал при закрытии окон
const closeFormFunctional = () => {
  setFieldsToDeafault();
  uploadFile.value = '';
  hashtagsInput.removeEventListener('focus', onFieldFocus(hashtagsInput));
  commentsTextArea.removeEventListener('focus', onFieldFocus(commentsTextArea));
};

//функционал для успеха/ошибки
const succesFormSubmit = () => {
  uploadOverlay.classList.add('hidden');
  removeBodyModalOpen();
  closeFormFunctional();
  showSuccesMessage();
  setFieldsToDeafault();
};

const errorFormSubmit = () => {
  uploadOverlay.classList.add('hidden');
  removeBodyModalOpen();
  closeFormFunctional();
  showErrorMessage();
};

//блок формы
const createForm = () => {

  //блок комментов
  const onCommentsFieldInput = () => {
    if (!checkCommentLength(commentsTextArea.value.length, MAX_COMMENT_LENGTH)) {
      commentsTextArea.setCustomValidity('Слишком длинный коментарий');
      commentsTextArea.reportValidity();
      commentsTextArea.style.border = '4px solid #aa0202';
    }
    if (checkCommentLength(commentsTextArea.value.length, MAX_COMMENT_LENGTH)) {
      commentsTextArea.setCustomValidity('');
      commentsTextArea.reportValidity();
      commentsTextArea.style.border = 'none';
    }
  };
  commentsTextArea.addEventListener('input', onCommentsFieldInput);
  commentsTextArea.addEventListener('focus', onFieldFocus(commentsTextArea));

  //блок хештегов
  const onHashtagFieldInput = () => {
    const hashtags = hashtagsInput.value.toLowerCase().split(' ');
    for (let i = 0; i < hashtags.length; i++) {
      const hashtag = hashtags[i];
      const otherHashtags = hashtags.slice(0, i).concat(hashtags.slice(i+1));
      const createValidityMessage = (message) => {
        hashtagsInput.setCustomValidity(message);
        hashtagsInput.reportValidity();
        hashtagsInput.style.border = '4px solid #aa0202';
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
        hashtagsInput.style.border = 'none';
      }
    }
  };
  hashtagsInput.addEventListener('input', onHashtagFieldInput);
  hashtagsInput.addEventListener('focus', onFieldFocus(hashtagsInput));

  //блок масштаба
  const onScaleClick = (evt) => {
    const scaleValue = +scaleValueInput.value.slice(0,-1);
    const scaleButtonMinus = evt.target.matches('.scale__control--smaller');
    const scaleButtonPlus = evt.target.matches('.scale__control--bigger');
    if (scaleButtonMinus && scaleValue > SCALE_MIN) {
      scaleValueInput.value = `${scaleValue - SCALE_STEP}%`;
      uploadImg.style.transform = `scale(${+scaleValueInput.value.slice(0,-1) / 100})`;
    }
    if (scaleButtonPlus && scaleValue < SCALE_MAX) {
      scaleValueInput.value = `${scaleValue + SCALE_STEP}%`;
      uploadImg.style.transform = `scale(${+scaleValueInput.value.slice(0,-1) / 100})`;
    }
  };
  scaleField.addEventListener('click', onScaleClick);

  //блок эффектов
  const slider = noUiSlider.create(sliderElement, {
    start: 100,
    connect: [true, false],
    step: 1,
    range: {'min': 0,'max': 100},
  });

  let effect = 'none';
  let unit = '';
  const onEffectChange = (evt) => {
    if (evt.target.closest('.effects__item')) {
      const targetSearchArea = evt.target.closest('.effects__item');
      const checkEffect = (effectType) => targetSearchArea.querySelector(effectType);

      const updateSliderOptions = (rangeMin, rangeMax, step) => {
        sliderElement.noUiSlider.updateOptions({
          range: {
            'min': rangeMin,
            'max': rangeMax,
          },
          step: step,
        });
        slider.set(rangeMax);
      };

      const setEffect = (effectName, unitSymbol) => {
        sliderField.classList.remove('hidden');
        effect = effectName;
        unit = unitSymbol;
        uploadImg.style.filter = `${effect}(${slider.get(true)}${unit})`;
      };

      if (checkEffect('#effect-none')) {
        sliderField.classList.add('hidden');
        uploadImg.style.filter = 'none';
      }
      if (checkEffect('#effect-chrome')) {
        updateSliderOptions(0, 1, 0.1);
        setEffect('grayscale', '');
      }
      if (checkEffect('#effect-sepia')) {
        updateSliderOptions(0, 1, 0.1);
        setEffect('sepia', '');
      }
      if (checkEffect('#effect-marvin')) {
        updateSliderOptions(0, 100, 1);
        setEffect('invert', '%');
      }
      if (checkEffect('#effect-phobos')) {
        updateSliderOptions(0, 3, 0.1);
        setEffect('blur', 'px');
      }
      if (checkEffect('#effect-heat')) {
        updateSliderOptions(1, 3, 0.1);
        setEffect('brightness', '');
      }
    }
  };

  effectList.addEventListener('change', onEffectChange);

  sliderElement.noUiSlider.on('update', () => {
    const sliderValue = slider.get(true);
    effectValueInput.value = sliderValue;
    uploadImg.style.filter = `${effect}(${sliderValue}${unit})`;
  });
};

//общий блок при открытии и отправке формы
//выбор файла
const onUploadFileChange = () => {
  uploadOverlay.classList.remove('hidden');
  sliderField.classList.add('hidden');
  addBodyModalOpen();
  const matchesExtensions = ALLOWED_EXTENSIONS.some((fileExtension)=>uploadFile.value.toLowerCase().endsWith(fileExtension));

  if (!matchesExtensions) {
    uploadFile.setCustomValidity('Неверный формат');
    uploadFile.reportValidity();
  } else {
    uploadFile.setCustomValidity('');
    uploadFile.reportValidity();
  }
  createCloseAndEscapeListeners(uploadOverlay, uploadCancelButton, closeFormFunctional);

  const userFile = uploadFile.files[0];
  if (matchesExtensions) {
    previewImg.src = URL.createObjectURL(userFile);
  }
};
uploadFile.addEventListener('change', onUploadFileChange);

//загрузка формы на серв
const loadForm = () => {
  const onFormSubmit = (evt) => {
    evt.preventDefault();

    sendData(
      () => succesFormSubmit(),
      () => errorFormSubmit(),
      new FormData(formElement),
    );
  };
  formElement.addEventListener('submit', onFormSubmit);
};

export {createForm, loadForm};

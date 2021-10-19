import {photoObjects} from './gen-objects.js';
import {fillMiniPictures} from './mini-pictures.js';
import {showBigPicture} from './big-picture.js';
import {loadPhoto, formElement} from './form.js';
import noUiSlider from '/node_modules/nouislider/dist/nouislider.mjs';


//тест слайдера - пока не робит, плюс повторно инициализируется
/*
const sliderElement = formElement.querySelector('.effect-level__slider');
noUiSlider.create(sliderElement, {
  start: [20, 80],
  connect: true,
  range: {'min': 0,'max': 100},
});
*/


console.log(photoObjects);

fillMiniPictures();
showBigPicture();
loadPhoto();


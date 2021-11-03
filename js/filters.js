import {allPhotos} from './server-fetch.js';
import {getRandomPositiveNumber} from './utilities.js';
import {fillWithPictures} from './mini-pictures.js';
import {createBigPictureContent} from './big-picture.js';
import {debounce} from './utils/debounce.js';

const imgFilters = document.querySelector('.img-filters');
const deafaultFilterButton = document.querySelector('button[id="filter-default"]');
const randomFilterButton = document.querySelector('button[id="filter-random"]');
const discussedFilterButton = document.querySelector('button[id="filter-discussed"]');
const RANDOM_AMOUNT = 10;


const createFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');
  const pictureContainer = document.querySelector('.pictures');

  //очистка
  const clearPictures = () => {
    const loadPictures = document.querySelectorAll('.picture');
    loadPictures.forEach((picture) => {
      pictureContainer.removeChild(picture);
    });
  };

  //подсветка кнопки
  const changeButtonActiveClass = (button) => {
    discussedFilterButton.classList.remove('img-filters__button--active');
    randomFilterButton.classList.remove('img-filters__button--active');
    deafaultFilterButton.classList.remove('img-filters__button--active');
    button.classList.add('img-filters__button--active');
  };

  //по умолчанию
  const onDefaultButtonClick = () => {
    clearPictures();
    changeButtonActiveClass(deafaultFilterButton);
    fillWithPictures(allPhotos);
    createBigPictureContent(allPhotos);
  };
  deafaultFilterButton.addEventListener('click', debounce(onDefaultButtonClick));

  //рандомные 10 пикчей
  const onRandomButtonClick = () => {
    clearPictures();
    changeButtonActiveClass(randomFilterButton);

    const randomPhotos = [];
    const usedIndexes = [];

    const generateUniqueIndex = () => {
      let uniqueIndex = getRandomPositiveNumber(0, allPhotos.length - 1);
      while (usedIndexes.includes(uniqueIndex)) {
        uniqueIndex = getRandomPositiveNumber(0, allPhotos.length - 1);
      }
      usedIndexes.push(uniqueIndex);
      return uniqueIndex;
    };

    for (let i = 0; i < RANDOM_AMOUNT; i++) {
      const index = generateUniqueIndex();
      const element = allPhotos[index];
      randomPhotos.push(element);
    }
    fillWithPictures(randomPhotos);
    createBigPictureContent(randomPhotos);
  };
  randomFilterButton.addEventListener('click', debounce(onRandomButtonClick));

  //обсуждаемые - количество комментов по убыванию
  const onDiscussedButtonClick = () => {
    clearPictures();
    changeButtonActiveClass(discussedFilterButton);

    const getCommentsAmount = (picture) => picture.comments.length;
    const comparePictureComments = (pictureA, pictureB) => {
      const amountA = getCommentsAmount(pictureA);
      const amountB = getCommentsAmount(pictureB);
      return amountB - amountA;
    };

    const disscussedPhotos = allPhotos.slice().sort(comparePictureComments);
    fillWithPictures(disscussedPhotos);
    createBigPictureContent(disscussedPhotos);
  };
  discussedFilterButton.addEventListener('click', debounce(onDiscussedButtonClick));
};

export {createFilters};

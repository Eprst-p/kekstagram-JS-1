import {allPhotos} from './server-fetch.js';
import {getRandomPositiveNumber} from './utilities.js';
import {fillMiniPictures} from './mini-pictures.js';
import {showBigPicture} from './big-picture.js';

const imgFilters = document.querySelector('.img-filters');
const deafaultFilterButton = document.querySelector('button[id="filter-default"]');
const randomFilterButton = document.querySelector('button[id="filter-random"]');
const discussedFilterButton = document.querySelector('button[id="filter-discussed"]');


const showFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');
  const pictureContainer = document.querySelector('.pictures');

  const clearPictures = () => {
    const loadPictures = document.querySelectorAll('.picture');
    loadPictures.forEach((picture) => {
      pictureContainer.removeChild(picture);
    });
  };

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
    fillMiniPictures(allPhotos);
    showBigPicture(allPhotos);
  };
  deafaultFilterButton.addEventListener('click', onDefaultButtonClick);

  //рандомные 10 пикчей
  const onRandomButtonClick = () => {
    clearPictures();
    changeButtonActiveClass(randomFilterButton);

    const RANDOM_AMOUNT = 10;
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
    fillMiniPictures(randomPhotos);
    showBigPicture(randomPhotos);
  };
  randomFilterButton.addEventListener('click', onRandomButtonClick);

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

    fillMiniPictures(disscussedPhotos);
    showBigPicture(disscussedPhotos);
  };
  discussedFilterButton.addEventListener('click', onDiscussedButtonClick);
};

export {showFilters};

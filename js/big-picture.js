import {photoObjects} from './gen-objects.js';

const showBigPicture = function () {
  const bigPicture = document.querySelector('.big-picture');
  const fullPictureContainer = document.querySelectorAll('.picture');

  const commentTemplate = document.querySelector('#comments_big_picture').content;
  const commentElement = commentTemplate.querySelector('.social__comment');
  const commentsContainer = bigPicture.querySelector('.social__comments');

  const addComments = function (index) {
    const commentFragment = document.createDocumentFragment();
    commentsContainer.innerHTML = ''; //очищаем старые комменты (иначе при клике они будут постоянно накапливаться)
    const currentComments = photoObjects[index].comments;
    currentComments.forEach((commentObject) =>{
      const currentComment = commentElement.cloneNode(true);
      currentComment.querySelector('img').src = commentObject.avatar;
      currentComment.querySelector('img').alt = commentObject.name;
      currentComment.querySelector('.social__text').textContent = commentObject.message;
      commentFragment.appendChild(currentComment);
    });
    commentsContainer.appendChild(commentFragment);
  };


  fullPictureContainer.forEach((picture, index) => {
    picture.addEventListener('click', () => {
      bigPicture.classList.remove('hidden');
      bigPicture.querySelector('.big-picture__img img').src = picture.querySelector('.picture__img').src;
      bigPicture.querySelector('.likes-count').textContent = picture.querySelector('.picture__likes').textContent;
      bigPicture.querySelector('.comments-count').textContent = picture.querySelector('.picture__comments').textContent;
      bigPicture.querySelector('.social__comment-count').classList.add('hidden');
      bigPicture.querySelector('.comments-loader').classList.add('hidden');
      bigPicture.querySelector('.social__caption').textContent = photoObjects[index].description;
      document.querySelector('body').classList.add('modal-open');

      bigPicture.querySelector('.big-picture__cancel').addEventListener('click', () => {
        bigPicture.classList.add('hidden');
        document.querySelector('body').classList.remove('modal-open');
      });
      document.addEventListener('keydown', (evt) => {
        if (evt.keyCode === 27) {     //почему то зачеркнуто keyCode
          bigPicture.classList.add('hidden');
          document.querySelector('body').classList.remove('modal-open');
        }
      });
      addComments(index);
    });
  });
};

export {showBigPicture};

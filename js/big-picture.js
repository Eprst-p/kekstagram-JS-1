import {photoObjects} from './gen-objects.js';

const showBigPicture = function () {
  const bigPicture = document.querySelector('.big-picture');
  const fullPictureContainer = document.querySelectorAll('.picture');
  const pictureContainer = document.querySelector('.pictures'); //второй раз объявляется такая переменная, может стоит ее взять из mini-pictures?

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

  const onPictureClick = function (evt) {
    if (evt.target.closest('.picture')) {
      const targetSearchArea = evt.target.closest('.picture');
      bigPicture.classList.remove('hidden');
      bigPicture.querySelector('.big-picture__img img').src = targetSearchArea.querySelector('.picture__img').src;
      bigPicture.querySelector('.likes-count').textContent = targetSearchArea.querySelector('.picture__likes').textContent;
      bigPicture.querySelector('.comments-count').textContent = targetSearchArea.querySelector('.picture__comments').textContent;
      bigPicture.querySelector('.comments-count').textContent = targetSearchArea.querySelector('.picture__comments').textContent;
      bigPicture.querySelector('.social__comment-count').classList.add('hidden');
      bigPicture.querySelector('.comments-loader').classList.add('hidden');
      bigPicture.querySelector('.social__caption').textContent = targetSearchArea.dataset.description;
      document.querySelector('body').classList.add('modal-open');

      const fullPictureContainerArray = Array.from(fullPictureContainer); //созадем массив из псевдомассива (иначе findIndex не работает)
      const targetIndex = fullPictureContainerArray.findIndex((element) => element.dataset.description === targetSearchArea.dataset.description);
      addComments(targetIndex);

      bigPicture.querySelector('.big-picture__cancel').addEventListener('click', () => {
        bigPicture.classList.add('hidden');
        document.querySelector('body').classList.remove('modal-open');
      });
      document.addEventListener('keydown', (evt) => {   //без этого evt не работает
        if (evt.keyCode === 27) {     //почему то зачеркнуто keyCode
          bigPicture.classList.add('hidden');
          document.querySelector('body').classList.remove('modal-open');
        }
      });
    }
  };

  pictureContainer.addEventListener('click', onPictureClick);

};

export {showBigPicture};

import {addBodyModalOpen, createCloseAndEscapeListeners} from './utilities.js';

const createBigPictureContent = (photoObjects) => {
  const bigPicture = document.querySelector('.big-picture');
  const miniPictures = document.querySelectorAll('.picture');
  const pictureContainer = document.querySelector('.pictures');
  const bigPictureCancelButton = bigPicture.querySelector('.big-picture__cancel');

  const commentTemplate = document.querySelector('#comments_big_picture').content;
  const commentElement = commentTemplate.querySelector('.social__comment');
  const commentsContainer = bigPicture.querySelector('.social__comments');
  const commentLoadButton = bigPicture.querySelector('.social__comments-loader');
  const commentsCount = bigPicture.querySelector('.social__comment-count');


  //добавляем комменты
  const addComments = (index) => {
    const commentFragment = document.createDocumentFragment();
    commentsContainer.innerHTML = '';
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

  //отображение комментов
  const showComments = () => {
    const comments = commentsContainer.querySelectorAll('.social__comment');
    comments.forEach((comment)=>{
      comment.classList.add('hidden');
    });
    let shownComments = 0;
    const showFiveComments = () => {
      let count = 0;
      for (let i=0; i<comments.length; i++) {
        const comment = comments[i];
        if (count === 5) {
          break;
        }
        if (comment.classList[1] === 'hidden') {
          comment.classList.remove('hidden');
          count++;
          shownComments++;
          commentsCount.textContent = `${shownComments} из ${comments.length}`;
        }
        if (i === comments.length - 1) {
          commentLoadButton.classList.add('hidden');
        }
      }
    };
    showFiveComments();

    const onLoadCommentsClick = () => {
      showFiveComments();
    };
    commentLoadButton.addEventListener('click', onLoadCommentsClick);

    //функционал закрытия окна
    const closeFunctional = () => {
      commentLoadButton.removeEventListener('click', onLoadCommentsClick);
    };
    createCloseAndEscapeListeners(bigPicture, bigPictureCancelButton, closeFunctional); //пока сюда переместил, т.к иначе не получается из-за областей видимости функций
  };

  //открытие большой картинки по клику
  const onPictureClick = (evt) => {
    if (evt.target.closest('.picture')) {
      const targetSearchArea = evt.target.closest('.picture');
      bigPicture.classList.remove('hidden');
      bigPicture.querySelector('.big-picture__img img').src = targetSearchArea.querySelector('.picture__img').src;
      bigPicture.querySelector('.likes-count').textContent = targetSearchArea.querySelector('.picture__likes').textContent;
      bigPicture.querySelector('.social__caption').textContent = targetSearchArea.dataset.description;
      addBodyModalOpen();
      commentLoadButton.classList.remove('hidden');

      const currentMiniPictures = Array.from(miniPictures); //созадем массив из псевдомассива (иначе findIndex не работает)
      const targetIndex = currentMiniPictures.findIndex((element) => element.dataset.uniqueId === targetSearchArea.dataset.uniqueId);
      addComments(targetIndex);
      showComments();
    }
  };
  pictureContainer.addEventListener('click', onPictureClick);
};

export {createBigPictureContent};

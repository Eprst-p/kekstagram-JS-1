//функция заполнения картинками
const fillWithPictures = function (photoObjects) {
  const pictureTemplate = document.querySelector('#picture').content;
  const pictureElement = pictureTemplate.querySelector('.picture');
  const pictureContainer = document.querySelector('.pictures');


  const picturesFragment = document.createDocumentFragment();

  photoObjects.forEach((currentObject, index) => {
    const currentPicture = pictureElement.cloneNode(true);
    currentPicture.querySelector('.picture__img').src = currentObject.url;
    currentPicture.querySelector('.picture__likes').textContent = currentObject.likes;
    currentPicture.querySelector('.picture__comments').textContent = currentObject.comments.length;
    currentPicture.setAttribute('data-description', photoObjects[index].description);
    currentPicture.setAttribute('data-unique-id', index);
    picturesFragment.appendChild(currentPicture);
  });

  pictureContainer.appendChild(picturesFragment);
};

export {fillWithPictures};

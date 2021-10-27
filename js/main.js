import {getData} from './server-fetch.js';
import {fillMiniPictures} from './mini-pictures.js';
import {showBigPicture} from './big-picture.js';
import {loadPhoto} from './form.js';


getData((photosFromServer) => {
  fillMiniPictures(photosFromServer);
  showBigPicture(photosFromServer);
});


loadPhoto();








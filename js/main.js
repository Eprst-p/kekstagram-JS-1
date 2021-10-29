import {showServerErrorMessage} from './errors-succes.js';
import {getData} from './server-fetch.js';
import {fillMiniPictures} from './mini-pictures.js';
import {showBigPicture} from './big-picture.js';
import {createForm, loadForm} from './form.js';


getData(
  (photosFromServer) => {
    fillMiniPictures(photosFromServer);
    showBigPicture(photosFromServer);
  },
  () => {
    showServerErrorMessage();
  },
);

createForm();
loadForm();

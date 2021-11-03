import {showServerErrorMessage} from './errors-succes.js';
import {getData, allPhotos} from './server-fetch.js';
import {fillMiniPictures} from './mini-pictures.js';
import {createFilters} from './filters.js';
import {createBigPictureContent} from './big-picture.js';
import {createForm, loadForm} from './form.js';


getData(
  (photosFromServer) => {
    fillMiniPictures(photosFromServer);
  },
  () => {
    createBigPictureContent(allPhotos);
    createFilters();
  },
  () => {
    showServerErrorMessage();
  },
);

createForm();
loadForm();

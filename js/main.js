import {showServerErrorMessage} from './errors-succes.js';
import {getData, allPhotos} from './server-fetch.js';
import {fillMiniPictures} from './mini-pictures.js';
import {showFilters} from './filters.js';
import {showBigPicture} from './big-picture.js';
import {createForm, loadForm} from './form.js';


getData(
  (photosFromServer) => {
    fillMiniPictures(photosFromServer);
  },
  () => {
    showBigPicture(allPhotos);
    showFilters();
  },
  () => {
    showServerErrorMessage();
  },
);

createForm();
loadForm();

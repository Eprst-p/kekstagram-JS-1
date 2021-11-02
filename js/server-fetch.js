let allPhotos = [];
const getData = (onSucces, onLoadData, onError) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      onSucces(data);
      allPhotos = data;
    })
    .then(() => {
      onLoadData();
    })
    .catch(() => {
      onError();
    });
};

const sendData = (onSuccess, onError, formData) => fetch(
  'https://24.javascript.pages.academy/kekstagram',
  {
    method: 'POST',
    body: formData,
  },
)
  .then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onError();
    }

  })
  .catch(() => {
    onError();
  });

export {getData, sendData, allPhotos};

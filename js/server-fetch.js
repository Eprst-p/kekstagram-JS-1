const getData = (onSucces) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      onSucces(data);
    });
};

const sendData = (onSuccess, formData) => fetch(
  'https://24.javascript.pages.academy/kekstagram',
  {
    method: 'POST',
    body: formData,
  },
)
  .then((response) => {
    if (response.ok) {
      console.log('успешный успех');
      onSuccess();
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }

  })
  .catch((err) => {
    console.error(err);
  });

export {getData, sendData};

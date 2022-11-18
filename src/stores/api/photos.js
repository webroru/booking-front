import config from '@/config';

const addPhotoApi = async (bookingId, data) => {
  const url = `${config.apiUrl}/api/booking/${bookingId}/photo`;

  let json = [];
  const formData = new FormData();
  formData.append('photo', data);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    json = await response.json();
  } catch (err) {
    console.log(err);
  }

  return json;
};

const removePhotoApi = async (bookingId, data) => {
  const url = `${config.apiUrl}/api/booing/${bookingId}/photo`;

  let json = [];

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    json = await response.json();
  } catch (err) {
    console.log(err);
  }

  return json;
};

export { addPhotoApi, removePhotoApi };

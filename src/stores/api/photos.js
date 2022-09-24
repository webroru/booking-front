

const addPhotoApi = async (bookingId, data) => {
  const url = 'https://run.mocky.io/v3/29818e11-36cf-456e-aaaf-be067fac9018';

  let json = [];

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: data,
    });
    json = await response.json();
  } catch (err) {
    console.log(err);
  }

  return json;
};

const removePhotoApi = async (bookingId, data) => {
  const url = 'https://run.mocky.io/v3/6f22b652-258e-4388-827e-98e0ad85565e';

  let json = [];

  try {
    const response = await fetch(url, {
      method: 'DELET',
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

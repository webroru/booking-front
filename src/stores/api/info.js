import config from '@/config';

const getInfoApi = async (locale) => {
  const url = `${config.apiUrl}/api/info`;

  let json = [];

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Accept-Language': locale,
      },
    });
    json = await response.json();
  } catch (err) {
    console.log(err);
  }

  return json;
};

const sendToEmailApi = async (booking, email) => {
  const url = `${config.apiUrl}/api/send-to-email`;

  let json = [];

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ booking, email }),
    });
    json = await response.json();
  } catch (err) {
    console.log(err);
  }

  return json;
};

export { getInfoApi, sendToEmailApi };

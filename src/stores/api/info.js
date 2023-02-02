import config from '@/config';

const getInfoApi = async () => {
  const url = `${config.apiUrl}/api/info/`;

  let json = [];

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    });
    json = await response.json();
  } catch (err) {
    console.log(err);
  }

  return json;
};

export { getInfoApi };

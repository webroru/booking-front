import config from '@/config';

const searchBookingApi = async (string) => {
  const url = `${config.apiUrl}/api/booking?searchString=${string}`;

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

const updateBookingApi = async (data) => {
  const url = 'https://run.mocky.io/v3/6f22b652-258e-4388-827e-98e0ad85565e';

  let json = [];

  try {
    const response = await fetch(url, {
      method: 'POST',
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

const acceptRuleApi = async (orderId, isRuleAccepted) => {
  const url = `${config.apiUrl}/api/acceptRule`;

  let json = [];

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ orderId, isRuleAccepted }),
    });
    json = await response.json();
  } catch (err) {
    console.log(err);
  }

  return json;
};

const checkInApi = async (orderId, checkIn) => {
  const url = `${config.apiUrl}/api/booking/${orderId}/check-in`;

  let json = [];

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ checkIn }),
    });
    json = await response.json();
  } catch (err) {
    console.log(err);
  }

  return json;
};

const checkOutApi = async (orderId) => {
  const url = `${config.apiUrl}/api/booking/${orderId}/check-out`;

  let json = [];

  try {
    const response = await fetch(url, {
      method: 'PUT',
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

const updateGuestsApi = async (orderId, data) => {
  const url = `${config.apiUrl}/api/booking/${orderId}/guests`;

  let json = [];

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    json = await response.json();
  } catch (err) {
    console.log(err);
  }

  return json.data;
};

const payByCashApi = async (orderId, isPayByCash) => {
  const url = `${config.apiUrl}/api/booking/${orderId}/pay-by-cash`;

  let json = [];

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ isPayByCash }),
    });
    json = await response.json();
  } catch (err) {
    console.log(err);
  }

  return json;
};

const cancelBookingApi = async (orderId) => {
  const url = `${config.apiUrl}/api/booking/${orderId}/cancel`;

  let json = [];

  try {
    const response = await fetch(url, {
      method: 'PUT',
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

const sendMessageApi = async (orderId, message) => {
  const url = `${config.apiUrl}/api/booking/${orderId}/message`;

  let json = [];

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ message }),
    });
    json = await response.json();
  } catch (err) {
    console.log(err);
  }

  return json;
};

export { searchBookingApi, updateBookingApi, acceptRuleApi, updateGuestsApi, payByCashApi, checkInApi, cancelBookingApi, sendMessageApi, checkOutApi };

import baseUrl from '../constants/BaseUrl';

export const getLocationsFromApi = async () => {
  try {
    let response = await fetch(baseUrl + '/locations');
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
};

export const createLocation = async body => {
  try {
    let response = await fetch(baseUrl + '/locations', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
};

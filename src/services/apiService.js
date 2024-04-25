import axios from 'axios';

async function apiCall(url, method = "GET", headers = {}, data = null) {
  try {
    const response = await axios({
      url,
      method,
      headers,
      data
    });
    return response;
  } catch (error) {
    return new Error(error.response.data.message || error.message);
  }
}

export default apiCall;

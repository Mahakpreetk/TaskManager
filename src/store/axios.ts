import axios from "axios";
import { NavigateFunction } from "react-router";
import { notify } from "reapop";
import { AppDispatch } from ".";
import { clearUser } from "./auth/authSlice";

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  config.baseURL = process.env.REACT_APP_WEB_SERVICE_BASE_URL
  config.headers['Accept'] = '*/*';
  
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
export const setupAxiosResponseInterceptors = (
  dispatch: AppDispatch, navigate: NavigateFunction) => {
  // Add a response interceptor
  axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('AXIOS RESPONSE:: ', response);

    return response;
  }, function (error) {
    console.log('AXIOS ERROR:: ', error.response);
    if (error.response?.status === 401) {
      dispatch(clearUser())
      dispatch(notify('Session just ended. Kindly login again', 'error'))
      navigate('/auth/login')
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
}


export default axios;
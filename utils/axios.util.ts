import axios from 'axios';

if (__DEV__) {
  console.log('Development');
} else {
  console.log('Production');
}

export const server = axios.create({
  baseURL: __DEV__
    ? 'http://10.0.2.2:5000/api/'
    : 'https://carto-production.herokuapp.com/api',
  timeout: 5000,
});

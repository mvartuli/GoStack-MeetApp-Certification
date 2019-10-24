import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:3334', // iOS
  baseURL: 'http://10.0.2.2:3333', // emulador Android Android Studio
  // baseURL: 'http://10.0.3.2:3334',  //emulador Android Genymotion
  // baseURL: 'http://<<ip da máquina servidor>>:3334',  //Android via USB
});

export default api;

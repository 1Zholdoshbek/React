// src/api.js или src/utils/axiosConfig.js
import axios from 'axios';

// Установка базового URL для Axios
axios.defaults.baseURL = 'http://localhost:8080'; // Замените на правильный базовый URL

// Вы можете добавить дополнительные настройки, если это необходимо
axios.defaults.timeout = 10000; // Установите таймаут в 10 секунд

export default axios;

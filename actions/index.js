import axios from 'axios';
import {decode as atob, encode as btoa} from 'base-64';
import { Base64 } from 'js-base64';

const baseUrl = 'http://192.168.1.124/dms/hs/app/' //http://1c.biznes-aziya.uz/ba/hs/app/
const login = 'Разработчик'//Обмен:123
export function getRequest(add, userId, password){
  return axios.get(baseUrl + add, {
    headers: {
      Authorization: `Basic ${Base64.encode(login)}`,
      mobileAppUser: btoa(`${userId}:${password}`),
    },
  });
}

export function postRequest(add, body, userId, password) {
  return axios.post(baseUrl + add, body, {
    headers: {
      Authorization: `Basic ${Base64.encode(login)}`,
      mobileAppUser: btoa(`${userId}:${password}`),
    },
  });
}


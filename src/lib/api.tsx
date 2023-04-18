import axios from 'axios';
import { User } from '../interfaces/Interfaces';

export const getData = (path: string, params?: string) => new Promise(async (resolve, reject) => {
  const key = process.env.REACT_APP_MOVIES_API_KEY;
  const moviesUrl = process.env.REACT_APP_MOVIES_API_URL;
  const url = `${moviesUrl}/${path}?api_key=${key}${params || ''}`;
  const response: any = await axios.get(url).catch(() => null);
  return resolve(response?.data || null);
})

 
export const getImage = (path: string | undefined, type: 'poster' | 'face' | 'big') => {
  const types = {
    poster: 'w300',
    face: 'w138_and_h175_face',
    big: 'w1920_and_h800_multi_faces',
  }
  return `${process.env.REACT_APP_IMAGE_URL}/${types[type]}/${path}`
}

export const minsToHours = (mins: number) => `${Math.floor(mins / 60)}h${mins % 60}m`;


export const login = ({email, password}: User) => new Promise(async (resolve, reject) => {
  const url = `${process.env.REACT_APP_API_URL}/auth/login`;
  const { data }: any = await axios.post(url, {email, password}).catch(() => reject({}));
  if (data?.token) {
    localStorage.setItem(process.env.REACT_APP_TOKEN_KEY as string, data.token);
    localStorage.setItem(process.env.REACT_APP_USERNAME as string, data.username);
    return resolve(data);
  } else if(data?.errMessage) {
    return resolve(data);
  }
  return reject('Something went wrong');
});

export const signup = ({email, password, username }: User) => new Promise(async (resolve, reject) => {
  const url = `${process.env.REACT_APP_API_URL}/auth/signup`;
  const { data }: any = await axios.post(url, {email, password, username}).catch(() => reject({}))
  return resolve(data);
});

export const transformDate = (date: string) => {
  if (date) {
    const months: any = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December',
    }
    const newDate = new Date(date);
    return `${('0' + newDate.getDate()).slice(-2)} ${months[newDate.getMonth()]} ${newDate.getFullYear()}`;
  }
}
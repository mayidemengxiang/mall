import axios from 'axios';

export function request(axiosConfig){
  const axiosInstance = axios.create({
    baseURL:'http://152.136.185.210:8000/api/n3',
    timeout:5000
  });

  //请求拦截
  axiosInstance.interceptors.request.use(Config =>{
    return Config;
  },error => {
    console.log(error)
  });

  //响应拦截
  axiosInstance.interceptors.response.use(result => {
    return result.data;
  },error => {
    console.log(error)
  });

  return axiosInstance(axiosConfig);
}

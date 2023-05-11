import axios, { AxiosError, AxiosResponse } from 'axios'
import { Activity } from '../models/activity'
import { toast } from 'react-toastify'
import { router } from '../router/Routes'
import { store } from '../stores/store'

// Setting loader delay
const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.response.use(async (response) => {
    await sleep(1000)
    return response
}, (error: AxiosError) => {
  const  {data, status, config} = error.response as AxiosResponse;

  switch (status) 
  {
    case 400:
      if(config.method === 'get' && data.errors.hasOwnProperty('id')) 
      {
        router.navigate('/not-found')
      }
      
      if(data.errors){
        const modalStateErrors = [];
        for(const key in data.errors){
          if(data.errors[key]){
            modalStateErrors.push(data.errors[key][0])
          }
        }
        throw modalStateErrors.flat();
      }
      else{
        toast.error(data);
      }
      break;
    case 401:
      toast.error('Unathorized')
      break;
    case 403:
      toast.error('Forbidden')
      break;
    case 404:
      router.navigate('/not-found')
      break;
    case 500:
      store.commonStore.setServerError(data)
      router.navigate('/server-error')
      break;
  }

  return Promise.reject(error);
})

// In order to add type safety for more specific parts of the code
// I was needed to define generic types to the ones that came before
// Therefore, the <T>
const responseBody = <T>(response: AxiosResponse<T>) => response.data

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
  // Adding type safety to CRUD operations
  list: () => requests.get<Activity[]>('/activities'),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => requests.post<void>('/activities', activity),
  update: (activity: Activity) =>
    requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete<void>(`/activities/${id}`),
}

const agent = {
  Activities,
}

export default agent

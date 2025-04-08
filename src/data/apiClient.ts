import { URL_SERVER } from '@/presentation/utils/constants'
import axios, { AxiosInstance } from 'axios'

export class ApiClient{
  private api:AxiosInstance
  post: any
  get: any
  put: any
  delete: any
  constructor(){
    this.api = axios.create({
      baseURL:URL_SERVER,
      timeout:10000,
      headers:{
        "Content-Type":'application/json'
      }
    })
    this.interceptors()
  }
  
  public getInstance(){
    return this.api
  }
  private interceptors(){
    this.api.interceptors.request.use((config)=>{
      // if (config.requireAuth) {
      //   const token = ''
      //   this.axiosCliente.he
      // }
      const token = ''
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },(error)=>Promise.reject(error))
  }
}
 

// const axiosClient:AxiosInstance = axios.create({
//   baseURL:URL_SERVER,
//   timeout:1000,
//   headers:{
//     'Content-Type':'application/json'
//   }
// })


// // axiosClient.interceptors.request.use((config:any)=>{
// //   if(config.requireAuth){
// //     const token = 'PRUEBA'
// //     if (token) {
// //       config.headers = config.headers || {}
// //       config.headers.Authorization = `Bearer ${token}`
// //     }
// //   }
// //   },
// //   (error)=> {return Promise.reject(error)}
// // )

// // return config as axiosClient
// //  .interceptors.response.use((response) =>{return response},
// //   (error)=>{
// //     console.log('error en la app',error.response.data);
// //     return Promise.reject(error.response.data)
// //   }
// // )

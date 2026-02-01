import axios from "axios";
// import useAuth from "../hooks/useAuth";

const url = import.meta.env.VITE_REST_HOST + ":" + import.meta.env.VITE_REST_PORT;

export const reqAxios = axios.create( { baseURL: url,
  headers: { "Content-Type": "application/json" },
  withCredentials: true
 });

export const reqSecureAxios = axios.create( { baseURL: url,
  headers: { "Content-Type": "application/json" },
  withCredentials: true
 });

// export const reqAxios = ({...options}) => {
  
  // console.log(onError)
  // console.log(onSuccess)
  // console.log(rest)
    
//   const onSuccess = (response) => {
//     console.log(response)
//     return response
//   }
//   const onError = (error) => {
//     console.log(error)
//     if (error?.response?.data?.error) {
//       error.message = error?.response?.data?.error + " (" + error?.response?.status + ")" 
//     }
//     throw error
//   }
//   return client(options).then(onSuccess).catch(onError);
// }
// export const axiosPrivate = axios.create({
//   baseURL: BASE_URL,
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// });

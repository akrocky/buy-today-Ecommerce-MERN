 import axios from "axios";
 export const createOrUpdateUserApi = async(authtoken:string)=>{

  
  return await axios.post(
   ` ${import.meta.env.VITE_APP_API}/create-or-update-user`,
    {},
    {
    headers:{
      authtoken
    }
  })
}
 export const currentUserApi = async(authtoken:string)=>{

  
  return await axios.post(
   ` ${import.meta.env.VITE_APP_API}/current-user`,
    {},
    {
    headers:{
      authtoken
    }
  })
}

export const currentAdminApi = async(authtoken:string)=>{

  
  return await axios.post(
   ` ${import.meta.env.VITE_APP_API}/current-admin`,
    {},
    {
    headers:{
      authtoken
    }
  })
}
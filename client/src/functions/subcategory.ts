import axios from "axios";

export const getAllSubcategoriesApi = async()=>{

 
 return await axios.get(
  ` ${import.meta.env.VITE_APP_API}/subcategories`)
}
export const getSubategoryApi = async(slug:string)=>{

 
 return await axios.get(
  ` ${import.meta.env.VITE_APP_API}/subcategory/${slug}`
  )
}
export const removeSubcategoryApi = async(slug :string,authtoken : string)=>{

 
 return await axios.delete(
  ` ${import.meta.env.VITE_APP_API}/subcategory/${slug}`,
  {
    headers:{
        authtoken
    }
  }
  )
}
export const updateSubcategoryApi = async(slug: string,{name,parent}:{name:string,parent:string} ,authtoken: string)=>{

 
 return await axios.put(
  ` ${import.meta.env.VITE_APP_API}/subcategory/${slug}`,{name,parent},
  {
    headers:{
        authtoken
    }
  }
  )
}
export const createSubcategoryApi = async({name , parent}:{name:string, parent:string},authtoken: string)=>{

 
 return await axios.post(
  ` ${import.meta.env.VITE_APP_API}/subcategory`,{name: name, parent},
  {
    headers:{
        authtoken
    }
  }
  )
}


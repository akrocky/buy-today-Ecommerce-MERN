import axios from "axios";

export const getAllCategoriesApi = async()=>{

 
 return await axios.get(
  ` ${import.meta.env.VITE_APP_API}/categories`)
}
export const getCategoryApi = async(slug:string)=>{

 
 return await axios.get(
  ` ${import.meta.env.VITE_APP_API}/category/${slug}`
  )
}
export const removeCategoryApi = async(slug :string,authtoken : string)=>{

 
 return await axios.delete(
  ` ${import.meta.env.VITE_APP_API}/category/${slug}`,
  {
    headers:{
        authtoken
    }
  }
  )
}
export const updateCategoryApi = async(slug: string,category: string ,authtoken: string)=>{

 
 return await axios.put(
  ` ${import.meta.env.VITE_APP_API}/category/${slug}`,{name:category},
  {
    headers:{
        authtoken
    }
  }
  )
}
export const createCategoryApi = async(category: string,authtoken: string)=>{
console.log(category);
 
 return await axios.post(
  ` ${import.meta.env.VITE_APP_API}/category`,{name:category},
  {
    headers:{
        authtoken
    }
  }
  )
}

export const getCategorySubcategoryApi = async(_id:string)=>{

 
  return await axios.get(
   ` ${import.meta.env.VITE_APP_API}/category/subcategory/${_id}`
   )
 }
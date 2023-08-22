import axios from "axios";
export type TProduct={ title:string,
description:string,
price:number,
category:string,
subcategory:string[],
shipping:string,
quantity:number,
images:string[],

color:string,
brand:string}

export const createProductApi = async(product:TProduct,authtoken: string)=>{
  
     
     return await axios.post(
      ` ${import.meta.env.VITE_APP_API}/product`,product,
      {
        headers:{
            authtoken
        }
      }
      )
    }
export const removeProductApi = async(slug: string
  ,authtoken: string)=>{
  
     
     return await axios.delete(
      ` ${import.meta.env.VITE_APP_API}/product/${slug}`,
      {
        headers:{
            authtoken
        }
      }
      )
    }

    export const getProductsByCountApi = async(count:number)=>{

 
      return await axios.get(
       ` ${import.meta.env.VITE_APP_API}/products/${count}`)
     }
    export const getProductApi = async(slug:string)=>{

 
      return await axios.get(
       ` ${import.meta.env.VITE_APP_API}/product/${slug}`)
     }
    export const updateProductApi = async(slug:string, product:TProduct, authtoken: string)=>{

 
      return await axios.put(
       ` ${import.meta.env.VITE_APP_API}/product/${slug}`,
       product,
       {
        headers :{
          authtoken
        }
       })
     }
    
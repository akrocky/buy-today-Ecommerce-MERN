import axios from "axios";
type TProduct={ title:string,
description:string,
price:number,
category:string,
subcategory:string[],
shipping:string,
quantity:number,
images:string[],

color:string,
brand:string}

export const createProductApi = async(product,authtoken: string)=>{
    console.log(product);
     
     return await axios.post(
      ` ${import.meta.env.VITE_APP_API}/product`,product,
      {
        headers:{
            authtoken
        }
      }
      )
    }
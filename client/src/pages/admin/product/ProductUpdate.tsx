

import AdminNav from "../../../components/nav/AdminNav"

 import { useAppSelector } from "../../../store/useStore";
import { TUser, selectUser } from "../../../store/slices/userSlice";


import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductApi } from "../../../functions/product";

import ProductUpdateForm, { TValues } from "../../../components/forms/ProductUpdateForm";
import { getAllCategoriesApi, getCategorySubcategoryApi } from "../../../functions/category";
const initialState:TValues={
    title:'',
    description:'',
    price:'',
  
    category:{
      _id: "",
      name: "",
      slug: ""
    },
    subcategory:[],
    shipping:'',
    quantity:'',
    images:[],
    colors:["Black","Brown","Silver","White","Blue"],
    brands:["Apple","Samsung","Microsoft","Lenevo","Asus"],
    color:'',
    brand:''
  };
const ProductUpdate = () => {
    const [values,setValues]=useState(initialState);
    const [loading, setLoading] = useState(false);
    const [subOptions, setSubOptions] = useState([]);
    const [categories, setcategories] = useState([]);
    const [arrayOfSub, setArrayOfSub] = useState([]);
     
 const user= useAppSelector(selectUser)
 const { slug  } = useParams();

 useEffect(() => {
   loadProduct();
   loadCategories();
 }, [])
 const loadProduct=()=>{
    getProductApi(slug as string)
    .then(p=> {
      
      setValues({...values,...p.data})
      //getCategorySubs
      getCategorySubcategoryApi(p.data.category._id)
      .then(res=>{
         setSubOptions(res.data);
         let arr=[];
        p.data.subcategory.map(s=>{
          arr.push(s._id)
        })

        setArrayOfSub((prev)=> arr)
      }).catch(err=> console.log(err.message))
    
    })
    .catch(err=> console.log(err.message))
 };

 const loadCategories=()=> getAllCategoriesApi().then((c)=>{
  setcategories(c.data);
})
 const handleSubmit=(e: React.SyntheticEvent)=>{
  e.preventDefault();
 }
 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
 const handleChange =(e)=>{
  e.preventDefault()
  
  setValues({...values,[e.target.name]:e.target.value})
   
    };
    const handleCategoryChange=async(e)=>{
      e.preventDefault()
   
      setValues({...values,subcategory:[],category :e.target.value})
   
      try {
     const res= await   getCategorySubcategoryApi(e.target.value)
    
     setSubOptions( res.data);
      setArrayOfSub([])
     
      } catch (error) {
        if (error instanceof Error) {
          
          console.log(error.message);
        }
     
      }
    }
  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-2 col-sm-2">
        <AdminNav />
      </div>
      <div className="col-md-10">
      <h4>Product Update</h4>
      {JSON.stringify(values)}
<hr />
<ProductUpdateForm handleSubmit={handleSubmit} handleChange={handleChange} 
values={values} setValues={setValues}   handleCategoryChange={handleCategoryChange} subOptions={subOptions}
categories={categories} arrayOfSub={arrayOfSub} setArrayOfSub={setArrayOfSub}/>


      </div>
      </div>
      </div>
  )
}

export default ProductUpdate

// import {createCategoryApi, getAllCategoriesApi, removeCategoryApi} from "../../../functions/"

import { useEffect, useState } from "react"
import AdminNav from "../../../components/nav/AdminNav"
import { TProduct, createProductApi } from "../../../functions/product";

 import { useAppSelector } from "../../../store/useStore";
import { TUser, selectUser } from "../../../store/slices/userSlice";
import { toast } from "react-toastify";
import ProductCreatForm, { TValues } from "../../../components/forms/ProductCreatForm";
import { getAllCategoriesApi, getCategorySubcategoryApi} from "../../../functions/category"
import Fileupload from "../../../components/forms/Fileupload";
import {LoadingOutlined } from "@ant-design/icons"

 const initialState:TValues={
  title:'Macbook Pro',
  description:'This is the best apple product',
  price:'3000',
  categories:[],
  category:'',
  subcategory:[],
  shipping:'Yes',
  quantity:'50',
  images:[],
  colors:["Black","Brown","Silver","White","Blue"],
  brands:["Apple","Samsung","Microsoft","Lenevo","Asus"],
  color:'White',
  brand:'Apple'
};
const ProductCreat = () => {
  const [values,setValues]=useState(initialState);
  
  const [loading, setLoading] = useState(false);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const user= useAppSelector(selectUser)
  useEffect(() => {
    loadCategories()
}, [])
const loadCategories=()=> getAllCategoriesApi().then((c)=>{
    setValues({...values, categories :c.data});
})
  
  const handleSubmit=(e: React.SyntheticEvent)=>{
    e.preventDefault();
    createProductApi(values as unknown as TProduct,(user as TUser ).token)
    .then((res)=> {
      setLoading(false);
          
  
      window.alert(`"${res.data.title}" is created`)
      window.location.reload()
     
  }).catch(err=>{
      setLoading(false);
      if (err.response.status ===400) {
          toast.error(err.response.data.err)
      }
      
  })
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleChange =(e)=>{
e.preventDefault()

setValues({...values,[e.target.name]:e.target.value})
 
  };
  const handleCategoryChange=async(e)=>{
    e.preventDefault()
 
    setValues({...values,subcategory:[],category :e.target.value})
    setShowSub(false)
    try {
   const res= await   getCategorySubcategoryApi(e.target.value)
  
   setSubOptions( res.data);
    if ( res.data.length) {
      setShowSub(true)
    }
   
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
{ loading ? <LoadingOutlined  className="text-danger"/> :  <h4>Product Create</h4> }
<hr />

{JSON.stringify(values.images)}

<div className="p-3">
  <Fileupload  values={values} setValues={setValues} setLoading={setLoading}/>
</div>

<ProductCreatForm  handleSubmit={handleSubmit} handleChange={handleChange} 
values={values} setValues={setValues}  handleCategoryChange={handleCategoryChange} subOptions={subOptions}
showSub={showSub}/>
      </div>
      </div>
      </div>
  )
}

export default ProductCreat
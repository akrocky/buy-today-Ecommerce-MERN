

import AdminNav from "../../../components/nav/AdminNav"

 import { useAppSelector } from "../../../store/useStore";
import { TUser, selectUser } from "../../../store/slices/userSlice";


import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductApi, updateProductApi } from "../../../functions/product";

import ProductUpdateForm, { TValues } from "../../../components/forms/ProductUpdateForm";
import { getAllCategoriesApi, getCategorySubcategoryApi } from "../../../functions/category";
import Fileupload from "../../../components/forms/Fileupload";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
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
    const [selectedCategory, setSelectedCategory] = useState({});
     
 const user= useAppSelector(selectUser);
 const navigate= useNavigate()
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
  setLoading(true);
  values.subcategory=arrayOfSub;
 
  values.category= selectedCategory ? selectedCategory : values.category ;
  updateProductApi(slug,values, user.token)
  .then(res=>{
setLoading(true);
toast.success(`${res.data.title} is updated`);
navigate("/admin/products");
  }).catch(err=>{
    setLoading(false)
   toast.error(err.message)
  })
 }
 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
 const handleChange =(e)=>{
  e.preventDefault()
  
  setValues({...values,[e.target.name]:e.target.value})
   
    };
    const handleCategoryChange=async(e)=>{
      e.preventDefault()
   
      setValues({...values,subcategory:[]})
    setSelectedCategory(e.target.value)
      try {
     const res= await   getCategorySubcategoryApi(e.target.value)
    
     setSubOptions( res.data);
      
     
      } catch (error) {
        if (error instanceof Error) {
          
          console.log(error.message);
        }
     
      }

      // if user clicks back to the original category
      // show its sub categories in default
      if (values.category._id === e.target.value) {
        loadProduct();
      }
        //clear sub category array
        setArrayOfSub([])
      
     
    }
  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-2 col-sm-2">
        <AdminNav />
      </div>
      <div className="col-md-10">
      { loading ? <LoadingOutlined  className="text-danger"/> :  <h4>Product Update</h4> }
     <div className="p-3">
      <Fileupload
      values={values}
      setValues={setValues} 
      setLoading={setLoading}/>
     </div>
<hr />
<ProductUpdateForm handleSubmit={handleSubmit} handleChange={handleChange} 
values={values} setValues={setValues}   handleCategoryChange={handleCategoryChange} subOptions={subOptions}
categories={categories} arrayOfSub={arrayOfSub} setArrayOfSub={setArrayOfSub} selectedCategory={selectedCategory}/>


      </div>
      </div>
      </div>
  )
}

export default ProductUpdate
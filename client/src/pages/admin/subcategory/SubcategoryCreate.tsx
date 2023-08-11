import React, {  useEffect, useState } from "react"
import AdminNav from "../../../components/nav/AdminNav"
import { getAllCategoriesApi} from "../../../functions/category"

import { useAppSelector } from "../../../store/useStore";
import { TUser, selectUser } from "../../../store/slices/userSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import { createSubcategoryApi, getAllSubcategoriesApi, removeSubcategoryApi } from "../../../functions/subcategory";

const SubcategoryCreate = () => {
    const [name,setName]=useState('');
    const [loading, setLoading] = useState(false);
    const [category, setCategory]= useState('')
    const [categories, setCategories]= useState([])
    const [subcategories, setSubategories]= useState([])
    const [keyword, setKeyword]= useState('')
    //const [categories, setCategories]= useState([])
    useEffect(() => {
        loadCategories();
        loadSubcategories();
    }, [])
    const loadCategories=()=> getAllCategoriesApi().then((c)=>{
        setCategories(c.data);
    })
    
    const loadSubcategories=()=> getAllSubcategoriesApi().then((c)=>{
        setSubategories(c.data);
    })
    
    const user= useAppSelector(selectUser)
    const handleSubmit=(e:React.SyntheticEvent<EventTarget>)=>{
        e.preventDefault()
        
        setLoading(true)
        createSubcategoryApi({name , parent:category},(user as TUser ).token)
         .then((res)=> {
            setLoading(false);
            setName('');
            toast.success(`${res.data.name} is created`)
            loadSubcategories();
        
        }).catch(err=>{
            setLoading(false);
            if (err.response.status ===400) {
                toast.error(err.response.data)
            }
            
        })
    }

    const handleDelete=(slug:string)=>{
        const answer:boolean=window.confirm("Do you want to delete?")
if (answer) {
    setLoading(true)
    removeSubcategoryApi(slug ,(user as TUser).token)
    .then(res=>{
        setLoading(false)
        
    toast.error(`${res.data.message} `)
    loadSubcategories();
  
    }).catch(err=>{
        setLoading(false)
        if (err.response.status === 400) {
            toast.error(err.response.data)
        }
    })
}
     
    }



const searched= (keyword:string)=>(c:{name:string})=> c.name.toLowerCase().includes(keyword);
  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <AdminNav />
      </div>
        <div className="col">
            {
            loading ? <h4 className="text-danger">Loading.....</h4> :
        <h4 className="text-info">Create sub category</h4>
    }

<div className="form-group">
    <label className="category mb-2">Parent Category</label>
    <select name="category" className="form-control border-info mb-2" onChange={e =>setCategory(e.target.value) }>
        <option >Please select</option>
    {categories.length >0 && categories.map((c:{_id:string,name:string,slug:string})=> (
<option key={c._id} value={c._id}>{c.name}</option>
    ))
}
        
    </select>
</div>
{ JSON.stringify(category)}
<CategoryForm name={name} setName={setName} handleSubmit={handleSubmit} btnName="Create"/>

<LocalSearch keyword={keyword} setKeyword={setKeyword} />

<hr />



{
    subcategories.filter(searched(keyword)).map((s:{_id:string,name:string,slug:string})=> (
        <div key={s._id} className="alert alert-secondary">
           {s.name}
           <span onClick={()=> handleDelete(s.slug)} className="btn btn-sm float-end text-danger">
            <DeleteOutlined/>
            </span>
           <Link to={`/admin/subcategory/${s.slug}`}   >
           <span className="btn btn-sm float-end text-warning">
           <EditOutlined/>
            </span>
            
            </Link>
        </div>
    ))
}
        </div>
    </div>
</div>
  )
}

export default SubcategoryCreate;

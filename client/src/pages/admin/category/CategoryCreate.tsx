import React, {  useEffect, useState } from "react"
import AdminNav from "../../../components/nav/AdminNav"
import {createCategoryApi, getAllCategoriesApi, removeCategoryApi} from "../../../functions/category"

import { useAppSelector } from "../../../store/useStore";
import { TUser, selectUser } from "../../../store/slices/userSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
    const [name,setName]=useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories]= useState([])
    const [keyword, setKeyword]= useState('')
    //const [categories, setCategories]= useState([])
    useEffect(() => {
        loadCategories()
    }, [])
    const loadCategories=()=> getAllCategoriesApi().then((c)=>{
      
        setCategories(c.data);
    })
    
    const user= useAppSelector(selectUser)
    const handleSubmit=(e:React.SyntheticEvent<EventTarget>)=>{
        e.preventDefault()
        
        setLoading(true)
         createCategoryApi(name.toString(),(user as TUser ).token)
         .then((res)=> {
            setLoading(false);
            setName('');
            toast.success(`${res.data.name} is created`)
            loadCategories();
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
    removeCategoryApi(slug ,(user as TUser).token)
    .then(res=>{
        setLoading(false)
        
    toast.error(`${res.data.message} `)
    loadCategories();
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
        <h4 className="text-info">Create category</h4>
    }

<CategoryForm name={name} setName={setName} handleSubmit={handleSubmit} btnName="Create"/>

<LocalSearch keyword={keyword} setKeyword={setKeyword} />

<hr />



{
    categories.filter(searched(keyword)).map((c:{_id:string,name:string,slug:string})=> (
        <div key={c._id} className="alert alert-secondary">
           {c.name}
           <span onClick={()=> handleDelete(c.slug)} className="btn btn-sm float-end text-danger">
            <DeleteOutlined/>
            </span>
           <Link to={`/admin/category/${c.slug}`}   >
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

export default CategoryCreate;

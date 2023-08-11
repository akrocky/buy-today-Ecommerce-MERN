import { useEffect, useState } from "react"
import AdminNav from "../../../components/nav/AdminNav"


import { useAppSelector } from "../../../store/useStore";
import { TUser, selectUser } from "../../../store/slices/userSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import { getSubategoryApi, updateSubcategoryApi } from "../../../functions/subcategory";
import { getAllCategoriesApi } from "../../../functions/category";


const SubcategoryUpdate = () => {

    const [loading, setLoading] = useState(false);
    const {slug} = useParams();
    const [name, setName]= useState('');
    const [categories, setCategories]= useState([]);
  
    const [parent, setParent]= useState('');
    const navigate= useNavigate()
    useEffect(() => {
        loadCategories();
        loadSubcategory()
    }, [ ]);
    const loadCategories=()=> getAllCategoriesApi().then((res)=>{
       
        setCategories(res.data);
    });
    const loadSubcategory=()=> getSubategoryApi(slug as string).then((s)=>{
       
        setName(s.data.name);
        setParent(s.data.parent)
    });
    
    const user= useAppSelector(selectUser)
    const handleUpdate=(e:React.SyntheticEvent<EventTarget>)=>{
        e.preventDefault()
        
        setLoading(true)
         updateSubcategoryApi(slug as string,{name,parent},(user as TUser ).token)
         .then((res)=> {
            setLoading(false);
          
            toast.success(`${res.data.name} is updated`)
            navigate('/admin/subcategory')
        }).catch(err=>{
            console.log(err);
            setLoading(false);
            if (err.response.status ===400) {
                toast.error(err.response.data)
            }
            
        })
    }

  
     
    




  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-2 col-sm-2">
        <AdminNav />
      </div>
        <div className="col col-sm-10">
            {
            loading ? <h4 className="text-danger">Loading.....</h4> :
        <h4 className="text-info">Update sub category</h4>
    }
    <div className="form-group">
    <label className="category mb-2">Parent Category</label>
    <select name="category" className="form-control border-info mb-2" onChange={e =>setParent(e.target.value) }>
        <option >Please select</option>
    {categories.length >0 && categories.map((c:{_id:string,name:string,slug:string})=> (
<option key={c._id} value={c._id} selected={c._id === parent} >{c.name}</option>
    ))
}
        
    </select>
</div>
{ JSON.stringify(parent)}

{<CategoryForm name={name} setName={setName} handleSubmit={handleUpdate} btnName="Save" /> }


        </div>
    </div>
</div>
  )
}






export default SubcategoryUpdate
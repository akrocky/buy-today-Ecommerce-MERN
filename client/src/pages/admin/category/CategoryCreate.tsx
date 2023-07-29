import { useEffect, useState } from "react"
import AdminNav from "../../../components/nav/AdminNav"
import {createCategoryApi, getAllCategoriesApi} from "../../../functions/category"

import { useAppSelector } from "../../../store/useStore";
import { TUser, selectUser } from "../../../store/slices/userSlice";
import { toast } from "react-toastify";

const CategoryCreate = () => {
    const [name,setName]=useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories]= useState([])
    useEffect(() => {
        loadCategories()
    }, [])
    const loadCategories=()=> getAllCategoriesApi().then((c)=>{
        setCategories(c.data);
    })
    
    const user= useAppSelector(selectUser)
    const handleSubmit=(e:React.SyntheticEvent<EventTarget>)=>{
        e.preventDefault()
        console.log((user as TUser ).token);
        setLoading(true)
         createCategoryApi(name.toString(),(user as TUser ).token)
         .then((res)=> {
            setLoading(false);
            setName('');
            toast.success(`${res.data.name} is created`)
        }).catch(err=>{
            setLoading(false);
            if (err.response.status ===400) {
                toast.error(err.response.data)
            }
            
        })
    }

const categoryForm=()=> <form onSubmit={handleSubmit}>
<label className="text-info mt-3 mb-2" >Name</label>
<input type="text" className="form-control  border-info" value={name} onChange={e=> setName(e.target.value)}
autoFocus required/>
<br />
<button className="btn btn-outline-info">Create</button>
</form>


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

{categoryForm()}

{
    categories
}
        </div>
    </div>
</div>
  )
}

export default CategoryCreate;

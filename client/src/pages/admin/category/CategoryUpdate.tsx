import { useEffect, useState } from "react"
import AdminNav from "../../../components/nav/AdminNav"
import { getCategoryApi, updateCategoryApi} from "../../../functions/category"

import { useAppSelector } from "../../../store/useStore";
import { TUser, selectUser } from "../../../store/slices/userSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";


const CategoryUpdate = () => {

    const [loading, setLoading] = useState(false);
    const {slug} = useParams();
    const [name, setName]= useState('');
    const navigate= useNavigate()
    useEffect(() => {
        loadCategory()
    }, [ ])
    const loadCategory=()=> getCategoryApi(slug as string).then((c)=>{
       
        setName(c.data.name);
    })
    
    const user= useAppSelector(selectUser)
    const handleUpdate=(e:React.SyntheticEvent<EventTarget>)=>{
        e.preventDefault()
        
        setLoading(true)
         updateCategoryApi(slug as string,name,(user as TUser ).token)
         .then((res)=> {
            setLoading(false);
          
            toast.success(`${res.data.name} is updated`)
            navigate('/admin/category')
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
        <h4 className="text-info">Create category</h4>
    }

{<CategoryForm name={name} setName={setName} handleSubmit={handleUpdate} btnName="Save" /> }


        </div>
    </div>
</div>
  )
}






export default CategoryUpdate
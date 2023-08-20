import { useEffect, useState } from "react"
import AdminProductCard from "../../../components/cards/AdminProductCard";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCountApi, removeProductApi, TProduct } from "../../../functions/product";
import { TUser, selectUser } from "../../../store/slices/userSlice";
import { useAppSelector } from "../../../store/useStore";
import { toast } from "react-toastify";




const AllProducts =() => {
  const [products,setProducts]=useState([]);
  const [loading, setLoading]=useState(false);
  const user= useAppSelector(selectUser)
  useEffect(() => {
    
     loadApllProducts();
       
  }, [])

  const loadApllProducts=()=>{
    setLoading(false);
    getProductsByCountApi(100)
    .then(res=> {
      setLoading(false);
      setProducts(res.data)
    })
    .catch(err => {
      setLoading(false);
      console.log(err.message)
    });
    
  }

  const handleRemoved=(slug:string)=>{
   
        if (window.confirm("Are you sure ?")) {
         removeProductApi(slug,(user as TUser).token)
         .then(res=> {
                loadApllProducts();
                toast.error(`${res.data.title} is deleted`)
         })
         .catch(err => {
          toast.error(err.message)
         })
        }
  }
  
  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <AdminNav />
      </div>
   

   
     
        <div className="col">
        {loading ?<h4 className="text-danger">Loading...</h4>:<h4>All Products</h4>}
          <div className="row">
         {
         products.map((product: TProduct)=>(
          <div className="col-md-4 pb-3" key={product.title} >
            <AdminProductCard  product={product} handleRemoved={handleRemoved}/>
          </div>
          ) 
         )
         }
         </div>
        </div>
    </div>
</div>
  )
}

export default AllProducts 

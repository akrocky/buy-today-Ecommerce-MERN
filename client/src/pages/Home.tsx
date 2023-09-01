import { useEffect, useState } from "react"
import { getProductsByCountApi } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import Jumbotron from "../components/cards/Jumbotron";
import LoadingCard from "../components/cards/LoadingCard";



function Home() {

  const [products,setProducts]= useState([]);
  const [loading, setLoading]=useState(false)

  useEffect(() => {
    loadAllProducts();
  }, [])

  const loadAllProducts=()=>{
    setLoading(true);
    getProductsByCountApi(3)
    .then((res)=> {
      setProducts(res.data);
      setLoading(false);
      })
    .catch(err=>console.log(err.message))
  }
  return (
    <>
    <div className="mt-4 p-5 bg-info text-white rounded d-flex justify-content-center align-items-center h1 font-weight-bold">
     <Jumbotron text={['Latest Products','New Arrivals','Best Sellers']}/>
    </div>
     <div className="container">
      { loading ? <LoadingCard count={3}/> :
        <div className="row">
        {
          products.map((product)=> (
            <div className="col-md-4" key={product._id}>
              <ProductCard  product={product}/>
            </div>
          ))
        }
      </div>}
     </div>
    </>
  )
}

export default Home
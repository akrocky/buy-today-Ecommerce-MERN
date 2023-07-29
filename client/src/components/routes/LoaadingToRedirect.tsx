import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoaadingToRedirect = () => {
    const [count,setCount] = useState(5);
    const navigate = useNavigate();
    useEffect(() => {
    

        const interval= setInterval(()=>{
     setCount((currentCount: number)=> -- currentCount);
        },1000)

        // redirect once count is equal to 0
        count ===0 && navigate('/');
      
        return ()=> clearInterval(interval);
    }, [count])
    
  return (
    <div className="container p-5 text-center">
         <p> Redirecting you in {count} seconds</p>
    </div>
  )
}

export default LoaadingToRedirect
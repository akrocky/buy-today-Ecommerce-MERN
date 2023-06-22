import { useEffect, useState } from "react"
import { auth } from "../../firebase";
import { toast } from "react-toastify";

import {sendPasswordResetEmail} from "firebase/auth";
import { useAppSelector } from "../../store/useStore";
import  { selectUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
 
 function ForgotPassword() {
    const [email,setEmail]=useState('')
    const [loading,setLoading]=useState(false)
    const user=useAppSelector(selectUser)
    const navigate=useNavigate();
    useEffect(() => {
      if (user && user.token) {
        navigate("/");
      }
    }, [navigate, user])
    
    const handleForgotPassword=async(e:React.SyntheticEvent<EventTarget>)=>{
e.preventDefault();
setLoading(true);
const actionCodeSettings = {
  url:import.meta.env.VITE_FORGOT_PASSWORD_REDIRECT_URL as string,
  
  handleCodeInApp: true,
}
try {
 await sendPasswordResetEmail(auth,email,actionCodeSettings)
toast.success("check your email for reset password reset link")

  setLoading(false)
} catch (error) {
  let message = 'Unknown Error'
  if (error instanceof Error) { message = error.message}
      toast.error(message);
      setLoading(false)
    }
}
    
   return (
     <div className="container col-md-6 offset-md-3 p-5">
       {loading ? <h4 className="text-danger">Loding.......</h4> : <h4> Forgot Password</h4> }
           <form onSubmit={handleForgotPassword}>
<input type="email" className="form-control"  value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="email" autoFocus/>
<br />
<button className="btn btn-raised" disabled={!email}>
    Submit
</button>

           </form>
     </div>
   )
 }
 
 export default ForgotPassword

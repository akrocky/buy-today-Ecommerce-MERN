import { useEffect, useState } from "react"

import {  sendSignInLinkToEmail } from "firebase/auth";

import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/useStore";
import { selectUser } from "../../store/slices/userSlice";

function Register() {
  const [email,setEmail]=useState("")
  const navigate= useNavigate();
 
  const user=useAppSelector(selectUser)
   
    useEffect(() => {
      if (user && user.token) {
        navigate("/");
      }
    }, [navigate, user])
  const handleSubmit=async( e :React.SyntheticEvent<EventTarget>)=>{
    e.preventDefault();

    const actionCodeSettings = {
      url:import.meta.env.VITE_REGISTER_REDIRECT_URL as string,
      
      handleCodeInApp: true,
    }
    try {
    await sendSignInLinkToEmail(auth,email, actionCodeSettings);
    
    toast.success(
      `Èmail is sent to ${email}.Click the link to complete your registration`
     )
     window.localStorage.setItem('emailForRegistration', email);
     setEmail("")
    } catch (error) {
      let message = 'Unknown Error'
  if (error instanceof Error) { message = error.message}
      toast.error(message)
    }
    
     

  
  }
  const registerForm=()=><form onSubmit={handleSubmit}>
  <input type="email"  className="form-control border-0 border-secondary-subtle border-bottom  border-2 mt-4"  onChange={(e )=> setEmail( e.target.value)} value={email} placeholder="email please" autoFocus/>

  <button type="submit" className="btn btn-outline-secondary mt-4">Register</button>
  </form>
  return (
    <div className="container p-5">
  <div className="row">
    <div className="col-md-6 offset-md-3">

<h4>Register</h4>

{registerForm()}
    </div>
  </div>

    </div>
  )
}

export default Register
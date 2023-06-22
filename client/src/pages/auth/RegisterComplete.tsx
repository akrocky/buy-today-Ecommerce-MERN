import { useEffect, useState } from "react"
import {  updatePassword } from "firebase/auth";

import {  signInWithEmailLink } from "firebase/auth";

import { auth } from "../../firebase";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/useStore";
import { selectUser } from "../../store/slices/userSlice";

function RegisterComplete() {


  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  
  
  const navigate= useNavigate();
  
  const user=useAppSelector(selectUser)
   
    useEffect(() => {
      if (user && user.token) {
        navigate("/");
      }
    }, [navigate, user])

  useEffect(() => {
  
    setEmail(window.localStorage.getItem("emailForRegistration") as string);
  }, [])
  const onChangePassword = (e: React.FormEvent<HTMLInputElement>): void => {
    setPassword( e.currentTarget.value );
  };
  const handleSubmit=async(e:React.SyntheticEvent<EventTarget>)=>{
    e.preventDefault();
    if (!email) {
      
toast.error('Email and password is required');
return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 character long');
      return;
    }

  try {
  const response=await signInWithEmailLink(auth, email, window.location.href) 
  console.log(response);
  if (response.user.emailVerified) {
    // user email from local storege
 window.localStorage.removeItem("emailForRegistration")
    // user id token
const user= auth.currentUser;

user !== null && await updatePassword(user  , password);
const idTokenResult= await user?.getIdTokenResult()
console.log(user);
console.log(idTokenResult);
    // redux store

    // redirect
    navigate('/')
  }
  } catch (error) {
    let message = 'Unknown Error'
  if (error instanceof Error) { message = error.message}
      toast.error(message)
  }
     

  
  }
  const registerForm= () => <form onSubmit={handleSubmit}>
  <input type="email"  className="form-control border-0 border-secondary-subtle border-bottom  border-2 mt-4"  disabled value={email} placeholder="email please" autoFocus/>
  <input type="password"  className="form-control border-0 border-secondary-subtle border-bottom  border-2 mt-4"  value={password} onChange={onChangePassword } placeholder="password" autoFocus/>

  <button type="submit" className="btn btn-outline-secondary mt-4">Complete Registrationm</button>
  </form> ;

  
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

export default  RegisterComplete;
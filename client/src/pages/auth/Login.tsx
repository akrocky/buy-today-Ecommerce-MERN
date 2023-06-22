import { useEffect, useState } from "react"
import { Button } from 'antd';
import { toast } from "react-toastify";
import {MailOutlined,GoogleOutlined  } from '@ant-design/icons';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { selectUser, userLogIn } from "../../store/slices/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Login() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [loading,setLoading]=useState(false)
  const dispatch=useAppDispatch();
  const navigate= useNavigate();
  const location=useLocation();
  const user=useAppSelector(selectUser)
   
    useEffect(() => {
      if (user && user.token) {
        navigate("/");
      }
    }, [navigate, user])
  const handleGoogleLogin=async()=>{
    setLoading(true)
try {
  const provider = new GoogleAuthProvider();
 const result= await signInWithPopup(auth, provider)
 const {user}= result;
   const idTokenResult= await user.getIdTokenResult()
 
   
   dispatch(userLogIn({
    user:{
      email:user.email as string,
      token:idTokenResult.token

    }
   }));
    
   const from = location.state?.from?.pathname || "/"; 
   navigate(from,{replace:true})
} catch (error) {
  let message = 'Unknown Error'
  if (error instanceof Error) { message = error.message}
      toast.error(message);
      setLoading(false)
}
  }
  const handleSubmit=async( e :React.SyntheticEvent<EventTarget>)=>{
    e.preventDefault();
      setLoading(true)
 
    try {
   const result=  await signInWithEmailAndPassword(auth, email, password)
   
   const {user}= result;
   const idTokenResult= await user.getIdTokenResult()
 
   
   dispatch(userLogIn({
    user:{
      email:user.email as string,
      token:idTokenResult.token

    }
   }))
    
     const from = location.state?.from?.pathname || "/"; 
 navigate(from,{replace:true})
    } catch (error) {
      let message = 'Unknown Error'
  if (error instanceof Error) { message = error.message}
      toast.error(message);
      setLoading(false)
    }
    
     

  
  }
  const loginForm=()=><form onSubmit={handleSubmit}>
    <div className="form-group">
  <input type="email"  className="form-control border-0 border-secondary-subtle border-bottom  border-2 mt-4 "  onChange={(e )=> setEmail( e.target.value)} value={email} placeholder="email " autoFocus/>
  </div>
  <div className="form-group">
  <input type="password"  className="form-control border-0 border-secondary-subtle border-bottom  border-2 mt-4"  onChange={(e )=> setPassword( e.target.value)} value={password} placeholder="password" />
  </div>

  <Button onClick={handleSubmit} type="primary" className="mt-4 d-flex justify-content-center  align-items-center"  block   shape="round" icon={<MailOutlined/>}  size='large' disabled={ !email || password.length < 6}>
           Login with mail/Password
          </Button>
  
  </form>
  return (
    <div className="container p-5">
  <div className="row">
    <div className="col-md-6 offset-md-3">

{
  loading? <h4 className="text-danger">Loading</h4>:<h4>Login</h4>
}

{loginForm()}
<Button onClick={handleGoogleLogin} type="dashed" className="mt-4 d-flex justify-content-center align-items-center"  block   shape="round" icon={<GoogleOutlined />}  size='large' >
           Login with google
          </Button>

          <div className="mt-2  d-flex justify-content-end">
          <Link to="/forgot/password" className=" text-danger ms-auto">
             Forgot Password ?   
         </Link>
          </div>
         
    </div>
  </div>

    </div>
  )
}

export default Login
import {

  Routes,
  Route,

} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";

import { useEffect } from "react";
import { auth } from "./firebase";
import { useAppDispatch } from "./store/useStore";
import { userLogIn } from "./store/slices/userSlice";
import ForgotPassword from "./pages/auth/ForgotPassword";


function App() {
  const dispatch=useAppDispatch();
//  to check firebas auth state
useEffect(() => {
 const unsubscribe=  auth.onAuthStateChanged(async (user)=>{
  if (user) {
    const idTokenTesult= await user.getIdTokenResult()

     dispatch(userLogIn({
       user: {
         email: user.email as string,
         token:idTokenTesult.token  as string 
       }
     })
     )
  }
 })
return ()=> unsubscribe();
}, [])

  return (
    <>
    <Header/>
    
    <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/complete" element={<RegisterComplete />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        
      </Routes>
   
      </>
  )
}

export default App

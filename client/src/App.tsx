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
import { currentUserApi } from "./functions/auth";

import History from "./pages/users/History";
import UserRoute from "./components/routes/UserRoute";
import Password from "./pages/users/Password";
import wishList from "./pages/users/WishList";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubcategoryCreate from "./pages/admin/subcategory/SubcategoryCreate";
import SubcategoryUpdate from "./pages/admin/subcategory/SubcategoryUpdate";
import ProductCreat from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";



function App() {
  const dispatch=useAppDispatch();
//  to check firebas auth state
useEffect(() => {
 const unsubscribe=  auth.onAuthStateChanged(async (user)=>{
  if (user) {
    const idTokenResult= await user.getIdTokenResult()

    const res= await currentUserApi(idTokenResult.token as string)

 dispatch(userLogIn({
   user:{
     userName:res.data.name,
     email:res.data.email as string,
     token:idTokenResult.token,
     role:res.data.role,
     _id:res.data._id

   }
  }))
  }
 })
return ()=> unsubscribe();
}, [dispatch])

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
        <Route path="/user/history" element={<UserRoute component={History } />} />
        <Route path="/user/password" element={<UserRoute component={Password } />} />
        <Route path="/user/wishlist" element={<UserRoute component={wishList } />} />
        <Route path="/admin/dashboard" element={<AdminRoute component={AdminDashboard } />} />
        <Route path="/admin/category" element={<AdminRoute component={CategoryCreate } />} />
        <Route path="/admin/category/:slug" element={<AdminRoute component={CategoryUpdate } />} />
        <Route path="/admin/subcategory" element={<AdminRoute component={SubcategoryCreate } />} />
        <Route path="/admin/subcategory/:slug" element={<AdminRoute component={SubcategoryUpdate} />} />
        <Route path="/admin/products" element={<AdminRoute component={AllProducts} />} />
        <Route path="/admin/product" element={<AdminRoute component={ProductCreat} />} />
        <Route path="/admin/product/:slug" element={<AdminRoute component={ProductUpdate} />} />
        
      </Routes>
   
      </>
  )
}

export default App

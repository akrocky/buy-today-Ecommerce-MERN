import { useState } from "react"
import UserNav from "../../components/nav/UserNav"

import {  User, updatePassword } from "firebase/auth"

import { toast } from "react-toastify";
import { auth } from "../../firebase";


function Password() {

    const [password, setPassword]= useState('');
    const [loading, setLoading]= useState(false);
    const handleSubmit = async (e: React.SyntheticEvent)=>{
        e.preventDefault();
        setLoading(true)
        console.log(auth.currentUser );
        await updatePassword(auth.currentUser as User,password).then(() => {
            // Update successful.
            setLoading(false);
            toast.success('password updated')
        }).catch((error: { message: string; }) => {
            // An error occurred
            setLoading(false);
            toast.error(error.message)
        });
    }
    const passordUpdateForm=()=> <form onSubmit={handleSubmit}> 
        <div className="form-group">
            <label className="mt-2 text-info">Your Password</label>
            <input type="password" onChange={e=> setPassword(e.target.value)} className="form-control border border-info border-top-0 border-start-0 border-end-0 my-3 text-info "
            placeholder="Enter new password"
            />
            <button className="btn btn-primary" disabled={!password || password.length <6 || loading}>Submit</button>
        </div>
    </form>
  return (
    <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <UserNav  />
          </div>
            <div className="col">
          {loading ? <h4 className="text-danger">Loading......</h4> :      <h4 className="text-info mt-2">Password Update</h4>}
                {passordUpdateForm()}
            </div>
        </div>
    </div>
  )
}

export default Password
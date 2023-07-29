import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/useStore";
import { selectUser } from "../../store/slices/userSlice";
import LoaadingToRedirect from "./LoaadingToRedirect";
import { currentAdminApi } from "../../functions/auth";


interface userRouteProps {
  // Define your regular props here
  component: React.ComponentType
 
  // ... other props
}

const AdminRoute: React.FC<userRouteProps> = ({ component:RouteComponent , ...rest }) => {
    
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = useAppSelector(selectUser)// Redux/Context or even in-memory user
  const [ok, setOk] = useState(false)
useEffect(() => {
 if (user && user.token) {
    try {
    const admin=    currentAdminApi(user.token)
     console.log(admin);
     setOk(true)
    } catch (error) {
        if (error instanceof Error) {console.log(error.message); }
       
        setOk(false)
       
      }
        
      
    }

 }
, [user])

  return ok ? (
<RouteComponent {...rest} />
    
    
  ) : (
    <LoaadingToRedirect/>
  );
};

export default AdminRoute;
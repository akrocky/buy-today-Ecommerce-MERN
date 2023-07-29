import React from "react";

import { useAppSelector } from "../../store/useStore";
import { selectUser } from "../../store/slices/userSlice";
import LoaadingToRedirect from "./LoaadingToRedirect";


interface userRouteProps {
  // Define your regular props here
  component: React.ComponentType
 
  // ... other props
}

const UserRoute: React.FC<userRouteProps> = ({ component:RouteComponent , ...rest }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = useAppSelector(selectUser)// Redux/Context or even in-memory user

  return user && user.token  ? (
<RouteComponent {...rest} />
    
    
  ) : (
    <LoaadingToRedirect/>
  );
};

export default UserRoute;
import React, { useState } from 'react';
import { AppstoreOutlined, SettingOutlined ,UserOutlined ,UserAddOutlined,LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { selectUser, userLogOut } from '../../store/slices/userSlice';
const {SubMenu,Item}=Menu

const LinkStyle={
  textDecoration:"none"
}

const Header: React.FC = () => {
  const [current, setCurrent] = useState('home');
  const dispatch=useAppDispatch();
  const navigate= useNavigate();
  const user=useAppSelector(selectUser)
  const onClick: MenuProps['onClick'] = (e) => {
    
    setCurrent(e.key);
  };
  const handleLogout= async()=>{
    try {
    await  signOut(auth);
    navigate("/login")
    dispatch(userLogOut())
    } catch (error) {
      let message = 'Unknown Error'
      if (error instanceof Error) { message = error.message}
          toast.error(message)
    }
   
  }

  return     <Menu

selectedKeys={[current]}
  mode='horizontal'
  
  
>

  <Item
    key="home"
    icon={<AppstoreOutlined />}
  >
    <Link style={LinkStyle} to="/">Home</Link>
  </Item>
  
 {user && <SubMenu icon={<SettingOutlined />} key="username" title={user.email && user.email.split('@')[0]} className='ms-auto'>
<Item key="setting1">
Option 1
</Item>
<Item key="setting2">
Option 2
</Item>
<Item icon={<LogoutOutlined/>} key="logout" onClick={handleLogout}>
Logout
</Item>
  </SubMenu>
}
{
  !user && <Item
  key={"register"}
  onClick={onClick}
  icon={<UserAddOutlined />}
  className=" ms-auto">

 <Link style={LinkStyle} to="/register">Register</Link>
</Item>
}
  {
    !user &&  <Item
    key={"login"}
    onClick={onClick}
    icon={<UserOutlined />}
  >
  <Link style={LinkStyle} to="/login">Login</Link>
  </Item>
  }
 
 

</Menu>
};

export default Header
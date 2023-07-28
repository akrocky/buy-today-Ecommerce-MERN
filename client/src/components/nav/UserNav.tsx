import { Link } from "react-router-dom"


const UserNav = () => {
  return (
    <nav >
        <ul className="nav flex-column  mt-2 ">

           <li className="nav-item">
            <Link to="/user/history" className="nav-link text-info">History</Link>
           </li>
           <li className="nav-item">
            <Link to="/user/password" className="nav-link text-info">Password</Link>
           </li>
           <li className="nav-item">
            <Link to="/user/wishlist" className="nav-link text-info">wishlist</Link>
           </li>
        </ul>
    </nav>
  )
}

export default UserNav
import { Link } from "react-router-dom"


const AdminNav = () => {
  return (
    <nav >
        <ul className="nav flex-column  mt-2 ">

           <li className="nav-item">
            <Link to="/admin/dashboard" className="nav-link text-info">Dashboard</Link>
           </li>
           <li className="nav-item">
            <Link to="/admin/product" className="nav-link text-info">Product</Link>
           </li>
           <li className="nav-item">
            <Link to="/admin/products" className="nav-link text-info">Products</Link>
           </li>
           <li className="nav-item">
            <Link to="/admin/category" className="nav-link text-info">Category</Link>
           </li>
           <li className="nav-item">
            <Link to="/admin/subcategory" className="nav-link text-info">Sub Category</Link>
           </li>
           <li className="nav-item">
            <Link to="/admin/cupons" className="nav-link text-info">Cupons</Link>
           </li>
           <li className="nav-item">
            <Link to="/user/password" className="nav-link text-info">Password</Link>
           </li>
        </ul>
    </nav>
  )
}

export default AdminNav;
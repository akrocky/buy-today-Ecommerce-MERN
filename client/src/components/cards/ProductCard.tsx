import { Card, Skeleton } from "antd";
import { EditOutlined, EllipsisOutlined, EyeOutlined,SettingOutlined,ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Meta from "antd/es/card/Meta";

const ProductCard = ({product}) => {
    const {title, description, images,slug} =  product ;
  return (
   
        
     
    <Card
    cover={<div className="p-2">
        <img alt="example" src={images && images.length ? images[0].url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6AKNjklQ1jlv8mLgpBmo3wLpEgsYvIqYf0--wmEceLAIQkJMj6sX3QnU_ObXxDPj_E1w&usqp=CAU"}  style={{height:"150px",objectFit:"cover",width:"100%"}} />
    </div>}
    actions={[
        <Link className="link-underline link-underline-opacity-0 " to={`/product/${slug}`}>
        <EyeOutlined className="text-warning"/>
        <br /> View Product
        </Link>,<> <ShoppingCartOutlined   className="text-danger"/>
<br /> Add to Cart
        </>
      ]}
    >
  <Meta title={title} description={`${description && description.substring(0,40)}...`} />
    </Card>
  )
}

export default ProductCard
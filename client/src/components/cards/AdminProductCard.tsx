import { Card } from "antd"
import { TProduct } from "../../functions/product"
import Meta from "antd/es/card/Meta"

import { DeleteOutlined, EditOutlined } from "@ant-design/icons"

const AdminProductCard = ({product}:{product:TProduct}) => {
    const {title, description, images} =  product ;
  return (
    <Card
    hoverable
    
    cover={<div className="p-2">
        <img alt="example" src={images && images.length ? images[0].url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6AKNjklQ1jlv8mLgpBmo3wLpEgsYvIqYf0--wmEceLAIQkJMj6sX3QnU_ObXxDPj_E1w&usqp=CAU"}  style={{height:"150px",objectFit:"cover",width:"100%"}} />
    </div>}
    actions={[
      <EditOutlined className="text-warning"/>, <DeleteOutlined  className="text-danger"/>
    ]}
  >
    <Meta title={title} description={`${description && description.substring(0,40)}...`} />
  </Card>
  )
}

export default AdminProductCard
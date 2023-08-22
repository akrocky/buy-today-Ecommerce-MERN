import { ChangeEvent } from "react"
import Resizer from "react-image-file-resizer";
import { selectUser } from "../../store/slices/userSlice";
import { useAppSelector } from "../../store/useStore";
import { TValues } from "./ProductCreatForm";
import axios from "axios";
import { Avatar, Badge, Space } from "antd";

const Fileupload = ({values, setValues, setLoading}:{values: TValues, setValues:React.Dispatch<React.SetStateAction<TValues>>,setLoading:React.Dispatch<React.SetStateAction<boolean>>}) =>{

  const user= useAppSelector(selectUser)
    const fileUploadAndResizee=(e: ChangeEvent<HTMLInputElement>)=>{
     e.preventDefault();
   // resize
   const files = e.target.files  ;
   const allUploadedFiles= values.images;
 
   if (files && files?.length > 0) {
   setLoading(true);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(file);
      Resizer.imageFileResizer(file,720,720,'JPEG',100,0,(uri)=>{
      axios.post(`${import.meta.env.VITE_APP_API}/uploadimages`,{image:uri},{
        headers:{
          authtoken: user?.token
        }
      }).then(res=>{
        console.log("image upload", res);
        setLoading(false);
        allUploadedFiles.push(res.data);
        setValues({...values, images :allUploadedFiles})
      }).catch(err =>{
        setLoading(false);
        if (err instanceof Error) {
          console.log("images upload failed",err.message);
        }
      })
      },
      "base64"
      )
    }
    }
   
   // send back to server to upload to cloudinary
   // set url to images[] in the parent component - producrCreate
    }
    const handleImageRemove= (public_id: string)=>{
      setLoading(true);
    axios.post(`${import.meta.env.VITE_APP_API}/removeimage`,{public_id},
    {
      headers:{
        authtoken: user?.token
      }
    }).then(()=>{
setLoading(false);
const {images}= values;
const filterImages= images.filter(i => i.public_id !== public_id);
setValues({...values, images: filterImages});
    }).catch((err)=>{
      setLoading(false);
      console.log(err.message);
    })
    }
  return (
    <>
   <div className="row">
   <Space size="middle">
    {  values.images && values.images.map((image) =>  (

      <Badge count="X" key={image.public_id} onClick={()=>handleImageRemove(image.public_id)}
      style={{cursor:'pointer'}}>
<Avatar  src={image.url} size={100} shape="square" className="ml-3"/>
      </Badge>
     
        ))
    }
     </Space>
   </div>
    <div className="row">
        <label className="btn btn-primary btn-raised mt-2" style={{width:"20%",minWidth:'120px'}}>Choose File
        <input type="file" hidden multiple accept="images/*" onChange={fileUploadAndResizee} />
        </label>
       
    </div>

    </>
  )
}

export default Fileupload
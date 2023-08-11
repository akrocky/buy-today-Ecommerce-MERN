import React from "react";

type TCategoryForm ={
name: string;
setName: React.Dispatch<React.SetStateAction<string>>;
handleSubmit: (e: React.SyntheticEvent<EventTarget>)=> void ;
btnName:string;
}
const CategoryForm = ({name,setName,handleSubmit,btnName}:TCategoryForm) => {
  return (
    <form onSubmit={handleSubmit} className="mb-4">
<label className="text-info mt-3 mb-2" >Name</label>
<input type="text" className="form-control  border-info" value={name} onChange={e=> setName(e.target.value)}
autoFocus required/>
<br />
<button className="btn btn-outline-info">{btnName}</button>
</form>
  )
}

export default CategoryForm
import { Select, Space } from 'antd';

const { Option } = Select;
export type TCateory={_id:string,name:string,slug:string};

export type TValues={
  title: string;
  description: string;
  price: string;

  category: TCateory;
  subcategory: string[];
  shipping: string;
  quantity: string;
  images: {public_id: string, url: string}[];
  colors: string[];
  brands: string[];
  color: string;
  brand: string;
}
type TProductCreateForm = {
    handleSubmit: (e: React.SyntheticEvent) => void;
     handleChange:(e: any) => void,
     values: TValues;
     categories:TCateory[];
setValues:React.Dispatch<React.SetStateAction<TValues>>;
setArrayOfSub:React.Dispatch<React.SetStateAction<[]>>;
handleCategoryChange:(e : any) => void  ;
subOptions: TCateory[];
arrayOfSub:  [];
selectedCategory: string;

}

const ProductUpdateForm = ({handleSubmit, handleChange, values,setValues, handleCategoryChange,categories,subOptions,arrayOfSub,setArrayOfSub,selectedCategory}:TProductCreateForm) => {
    const {title, description, price, category,subcategory,shipping,quantity,images,colors,brands,color,brand} =  values;
  return (
    
<form onSubmit={handleSubmit} >
<div className="form-group">
  <label className="mb-2"> Title</label>
  <input type="text" name="title" className="form-control" value={title} onChange={handleChange}/>
</div>
<div className="form-group">
  <label className="mb-2"> Description</label>
  <input type="text" name="description" className="form-control" value={description} onChange={handleChange}/>
</div>
<div className="form-group">
  <label className="mb-2"> Price</label>
  <input type="number" name="price" className="form-control" value={price} onChange={handleChange}/>
</div>
<div className="form-group">
  <label className="mb-2"> Shipping</label>
 <select
 value={shipping ==='Yes' ? 'Yes': 'No' }
 name="shipping" className="form-control" onChange={handleChange}>
 <option >Please select </option>
<option value="No">NO</option>
<option value="Yes">Yes</option>

 </select>
</div>
<div className="form-group">
  <label className="mb-2"> Quantity</label>
  <input type="number" name="quantity" className="form-control" value={quantity} onChange={handleChange}/>
</div>
<div className="form-group">
  <label className="mb-2"> Color</label>
  <select 
  value={color}
  name="color" className="form-control" onChange={handleChange}>
<option >Please select </option>
 { colors.map((c:string) => <option key={c} value={c}> {c}</option>)}

 </select>
</div>
<div className="form-group">
  <label className="mb-2"> Brand</label>
  <select
  value={brand}
  name="brand" className="form-control" onChange={handleChange}>
<option >Please select </option>
 { brands.map((b:string) => <option key={b} value={b}> {b}</option>)}

 </select>
</div>



<div >
    <label className=" mb-2"> Category</label>
    <select  name="category" 
     
  value={selectedCategory ? selectedCategory : category._id}
      style={{ width: '100%' }}
    className="form-control border-info mb-2" onChange={handleCategoryChange}
    >
        
    {categories.length >0 && categories.map((c:TCateory)=> (
<option key={c._id} value={c._id}>{c.name}</option>
    ))
}
        
    </select>
</div>
<div className='my-2'>
  <label>Sub Categories</label>
  <Select mode="multiple"
    style={{ width: '100%' }}
    placeholder="Please Select"
    optionLabelProp="label"
    value={arrayOfSub}
   
    onChange={(value)=>setArrayOfSub(value)}
    >
   {subOptions.length && subOptions.map((s)=> <Option key={s._id } value={s._id } label={s.name}>{s.name}</Option> )}

  </Select>
</div>
<button className="btn btn-outline-info mt-2">Save</button>
</form>
  )
}

export default ProductUpdateForm
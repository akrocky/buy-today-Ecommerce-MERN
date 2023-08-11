type TLocalSearch={
    keyword:string;
    setKeyword:React.Dispatch<React.SetStateAction<string>>;
}

const LocalSearch = ({keyword,setKeyword}:TLocalSearch) => {
    
    
    const handleSearchChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase())
        
        }

  return (

<input type="search" placeholder="Filter" value={keyword} onChange={handleSearchChange} className="form-control mb-4"/>

    

  )
}

export default LocalSearch
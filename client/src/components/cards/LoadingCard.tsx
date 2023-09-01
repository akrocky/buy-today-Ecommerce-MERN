import { Skeleton } from "antd"


const LoadingCard = ({count})=> {
    const cards=()=>{
        let totalCards=[];
        for (let i = 0; i < count; i++) {
            totalCards.push(
                <div className="col m-3">
<Skeleton   active >
          
          </Skeleton>
                </div>

            )
            
        }
        return totalCards;
    }
  return (
    <div className="row pb-5">
        {
         cards() 
        }
   
    </div>
  )
}

export default LoadingCard
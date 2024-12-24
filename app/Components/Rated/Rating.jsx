
import { FaRegStar } from "react-icons/fa";

export default function Rating({rating}){    
    const totlaRating = 5;

    return(
        <div className=' flex  md:size-16 items-center'>
            {Array.from({length: totlaRating}).map((_, index) => (

                <FaRegStar 
                key={index}
                color={index < rating ? 'gold' : 'gray'}
                size={20} 
                />

            ))}
        </div>
    )
}
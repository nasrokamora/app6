import { FaRegStar } from "react-icons/fa";

export default function RatingMovies({ rating }) {
    const RatingTotal = 5
    return (
        <div className=' flex   items-center'>
            {Array.from({ length: RatingTotal }).map((_, index) => (

                <FaRegStar
                    key={index}
                    color={index < rating ? 'gold' : 'gray'} 
                    size={22} 
                />

            ))}
        </div>
    )
}
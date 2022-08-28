import { HotelModel } from "../../types";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
   const { data, loading } = useFetch(
      "https://booking-api-jos.herokuapp.com/api/hotels?featured=true&limit=3&min=0&max=999999"
   );

   return (
      <div className="fp">
         {loading ? (
            "Loading"
         ) : (
            <>
               {data.map((item: HotelModel) => (
                  <div className="fpItem" key={item._id}>
                     <img className="fpImg" src={item.photos[0]} alt="" />
                     <span className="fpName">{item.name}</span>
                     <span className="fpCity">{item.city}</span>
                     <span className="fpPrice">
                        Starting from ${item.cheapesPrice}
                     </span>
                     {item.rating && (
                        <div className="fpRating">
                           <button>{item.rating}</button>
                           <span>Excellent</span>
                        </div>
                     )}
                  </div>
               ))}
            </>
         )}
      </div>
   );
};

export default FeaturedProperties;


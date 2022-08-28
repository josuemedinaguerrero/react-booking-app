import { Link } from "react-router-dom";
import { HotelModel } from "../../types";
import "./searchItem.css";

interface Props {
   item: HotelModel;
}

const SearchItem = ({ item }: Props) => {
   const { _id, name, distance, desc, rating, cheapesPrice, photos } = item;

   return (
      <div className="searchItem">
         <img className="siImg" src={photos[0]} alt="" />
         <div className="siDesc">
            <h1 className="siTitle">{name}</h1>
            <span className="siDistance">{distance}m from center</span>
            <span className="siTaxiOp">Free airport taxi</span>
            <span className="siSubtitle">{desc}</span>
            <span className="siFeatures">
               Entire studio · 1 bathroom · 21m<sup>2</sup> 1 full bed
            </span>
            <span className="siCancelOp">Free cancellation</span>
            <span className="siCancelOpSubtitle">
               You can cancel later, so lock in this great price today!
            </span>
         </div>
         <div className="siDetails">
            {rating && (
               <div className="siRating">
                  <span>Excellent</span>
                  <button>{rating}</button>
               </div>
            )}
            <div className="siDetailTexts">
               <span className="siPrice">${cheapesPrice}</span>
               <span className="siTaxOp">Includes taxes and fees</span>
               <Link to={`/hotels/${_id}`}>
                  <button className="siCheckButton">See availability</button>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default SearchItem;

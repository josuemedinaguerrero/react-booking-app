import { useEffect, useState } from "react";
import hotel1 from "../../assets/hotel1.jpg";
import hotel2 from "../../assets/hotel2.jpg";
import hotel3 from "../../assets/hotel3.jpg";
import useFetch from "../../hooks/useFetch";
import "./featured.css";

interface DataCountByCity {
   list: number[];
   cities: string[];
}

const Featured = () => {
   const [newData, setNewData] = useState<DataCountByCity>({
      list: [0],
      cities: [""],
   });
   const { data, loading } = useFetch(
      "https://booking-api-jos.herokuapp.com/api/hotels/countByCity?cities=Cuenca,Quito,Daule"
   );

   const dataCities = data as unknown as DataCountByCity;

   useEffect(() => {
      if (dataCities.list !== undefined && dataCities.cities !== undefined) {
         setNewData(dataCities);
      }
   }, [data]);

   return (
      <div className="featured">
         {loading ? (
            "Loading please wait"
         ) : (
            <>
               <div className="featuredItem">
                  <img className="featuredImg" src={hotel1} alt="" />
                  <div className="featuredTitles">
                     <h1>{newData.cities[0]}</h1>
                     <h2>{newData.list[0]} properties</h2>
                  </div>
               </div>
               <div className="featuredItem">
                  <img className="featuredImg" src={hotel2} alt="" />
                  <div className="featuredTitles">
                     <h1>{newData.cities[1]}</h1>
                     <h2>{newData.list[1]} properties</h2>
                  </div>
               </div>
               <div className="featuredItem">
                  <img className="featuredImg" src={hotel3} alt="" />
                  <div className="featuredTitles">
                     <h1>{newData.cities[2]}</h1>
                     <h2>{newData.list[2]} properties</h2>
                  </div>
               </div>
            </>
         )}
      </div>
   );
};

export default Featured;


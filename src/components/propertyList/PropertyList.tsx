import hotel4 from "../../assets/hotel4.jpg";
import hotel5 from "../../assets/hotel5.jpg";
import hotel6 from "../../assets/hotel6.jpg";
import hotel7 from "../../assets/hotel7.jpg";
import hotel8 from "../../assets/hotel8.jpg";
import useFetch from "../../hooks/useFetch";
import "./propertyList.css";

interface DataCountByType {
   type: string;
   count: number;
}

const PropertyList = () => {
   const { data, loading } = useFetch(
      "https://booking-api-jos.herokuapp.com/api/hotels/countByType"
   );
   const dataTypes = data as DataCountByType[];

   const images = [hotel4, hotel5, hotel6, hotel7, hotel8];

   return (
      <div className="pList">
         {loading ? (
            "Loading"
         ) : (
            <>
               {data &&
                  images.map((img, i) => (
                     <div key={i} className="pListItem">
                        <img className="pListImg" src={img} alt="" />
                        <div className="pListTitles">
                           <h1>{dataTypes[i]?.type}</h1>
                           <h2>
                              {dataTypes[i]?.count} {dataTypes[i]?.type}
                           </h2>
                        </div>
                     </div>
                  ))}
            </>
         )}
      </div>
   );
};

export default PropertyList;

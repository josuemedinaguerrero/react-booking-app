import { useState } from "react";
import { useLocation } from "react-router-dom";
import { DateRange } from "react-date-range";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { format } from "date-fns";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import "./list.css";

const localDate = {
   destination: "",
   date: [{ startDate: new Date(), endDate: new Date(), key: "" }],
   options: {
      children: 0,
      room: 1,
      adult: 0,
   },
};

const List = () => {
   const location = useLocation();
   let state = location.state;
   if (!state) state = localDate;
   const [destination, setDestination] = useState(state.destination);
   const [options, setOptions] = useState(state.options);
   const [openDate, setOpenDate] = useState(false);
   const [date, setDate] = useState(state.date);
   const [min, setMin] = useState(0);
   const [max, setMax] = useState(999999);

   const { data, loading, reFetch } = useFetch(
      `https://booking-api-jos.herokuapp.com/api/hotels?city=${destination}&min=${min}&max=${max}`
   );

   const handleClick = () => {
      reFetch();
   };

   return (
      <div>
         <Navbar />
         <Header type="list" />
         <div className="listContainer">
            <div className="listWrapper">
               <div className="listSearch">
                  <h1 className="lsTitle">Search</h1>
                  <div className="lsItem">
                     <label htmlFor="destination">Destination</label>
                     <input
                        type="text"
                        placeholder={destination}
                        id="destination"
                     />
                  </div>
                  <div className="lsItem">
                     <label htmlFor="destination">Check - in Date</label>
                     <span onClick={() => setOpenDate(!openDate)}>{`
                        ${format(date[0].startDate, "MM/dd/yyyy")} to
                        ${format(date[0].endDate, "MM/dd/yyyy")}
                     `}</span>
                     {openDate && (
                        <DateRange
                           onChange={(item) => setDate([item.selection])}
                           minDate={new Date()}
                           ranges={date}
                        />
                     )}
                  </div>
                  <div className="lsItem">
                     <label htmlFor="">Options</label>
                     <div className="lsOptions">
                        <div className="lsOptionItem">
                           <span className="lsOptionText">
                              Min price <small>per night</small>
                           </span>
                           <input
                              type="number"
                              onChange={(e) => setMin(e.target.value)}
                              className="lsOptionInput"
                           />
                        </div>
                        <div className="lsOptionItem">
                           <span className="lsOptionText">
                              Max price <small>per night</small>
                           </span>
                           <input
                              type="number"
                              onChange={(e) => setMax(e.target.value)}
                              className="lsOptionInput"
                           />
                        </div>
                        <div className="lsOptionItem">
                           <span className="lsOptionText">Adult</span>
                           <input
                              type="number"
                              className="lsOptionInput"
                              placeholder={options.adult}
                              min={1}
                           />
                        </div>
                        <div className="lsOptionItem">
                           <span className="lsOptionText">Children</span>
                           <input
                              type="number"
                              className="lsOptionInput"
                              placeholder={options.children}
                              min={0}
                           />
                        </div>
                        <div className="lsOptionItem">
                           <span className="lsOptionText">Room</span>
                           <input
                              type="number"
                              className="lsOptionInput"
                              placeholder={options.room}
                              min={1}
                           />
                        </div>
                     </div>
                  </div>
                  <button onClick={handleClick}>Search</button>
               </div>
               <div className="listResult">
                  {loading ? (
                     "loading"
                  ) : (
                     <>
                        {data.map((item) => (
                           <div key={item._id}>
                              <SearchItem item={item} key={item._id} />
                           </div>
                        ))}
                     </>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default List;

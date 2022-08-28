import {
   faCircleArrowLeft,
   faCircleArrowRight,
   faCircleXmark,
   faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { HotelModel, SearchProv } from "../../types";
import { useSearch } from "../../hooks/useSearch";
import { useAuth } from "../../hooks/useAuth";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import useFetch from "../../hooks/useFetch";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import ReserveModal from "../../components/reserveModal/ReserveModal";
import "./hotel.css";

const Hotel = () => {
   const location = useLocation();
   const id = location.pathname.split("/")[2];
   const { data, loading } = useFetch(
      `https://booking-api-jos.herokuapp.com/api/hotels/find/${id}`
   );
   const dataHotel = data as unknown as HotelModel;
   const [slideNumber, setSlideNumber] = useState(0);
   const { dates, options } = useSearch() as SearchProv;
   const { user } = useAuth();
   const navigate = useNavigate();
   const [open, setOpen] = useState(false);
   const [openModal, setOpenModal] = useState(false);

   const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
   const dayDifference = (date1: Date, date2: Date): number => {
      const timeDiff = Math.abs(date2.getTime() - date1.getTime());
      const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
      return diffDays;
   };

   const days = dayDifference(dates[0].endDate, dates[0].startDate);

   const handleOpen = (i: number) => {
      setSlideNumber(Number(i));
      setOpen(true);
   };

   const handleMove = (dir: string) => {
      let newSlideNumber;
      if (dir === "l") {
         newSlideNumber =
            slideNumber === 0 ? dataHotel.photos.length : slideNumber - 1;
      } else {
         newSlideNumber =
            slideNumber === dataHotel.photos.length ? 0 : slideNumber + 1;
      }
      setSlideNumber(newSlideNumber);
   };

   const handleClick = () => {
      if (user) {
         setOpenModal(true);
      } else {
         navigate("/login");
      }
   };

   return (
      <div>
         <Navbar />
         <Header type="list" />
         {loading ? (
            "Loading"
         ) : (
            <div className="hotelContainer">
               {open && (
                  <div className="slider">
                     <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="close"
                        onClick={() => setOpen(false)}
                     />
                     <FontAwesomeIcon
                        icon={faCircleArrowLeft}
                        onClick={() => handleMove("l")}
                        className="arrow"
                     />
                     <div className="sliderWrapper">
                        <img
                           src={dataHotel.photos[slideNumber]}
                           alt=""
                           className="sliderImg"
                        />
                     </div>
                     <FontAwesomeIcon
                        icon={faCircleArrowRight}
                        onClick={() => handleMove("r")}
                        className="arrow"
                     />
                  </div>
               )}
               <div className="hotelWrapper">
                  <button className="bookNow">Reserve or Book Now!</button>
                  <h1 className="hotelTitle">{dataHotel.name}</h1>
                  <div className="hotelAddress">
                     <FontAwesomeIcon icon={faLocationDot} />
                     <span>{dataHotel.address}</span>
                  </div>
                  <span className="hotelDistance">
                     Excellent location - {dataHotel.distance}m from center
                  </span>
                  <span className="hotelPriceHighlight">
                     Book a stay over ${dataHotel.cheapesPrice} at this property
                     and get a free airport taxi
                  </span>
                  <div className="hotelImages">
                     {dataHotel.photos?.map((photo, i) => (
                        <div key={i} className="hotelImgWrapper">
                           <img
                              onClick={() => handleOpen(i)}
                              src={photo}
                              alt=""
                              className="hotelImg"
                           />
                        </div>
                     ))}
                  </div>
                  <div className="hotelDetails">
                     <div className="hotelDetailsTexts">
                        <h1 className="hotelTitle">{dataHotel.title}</h1>
                        <p className="hotelDesc">{dataHotel.desc}</p>
                     </div>
                     <div className="hotelDetailsPrice">
                        <h1>Perfect for a {days}-night stay!</h1>
                        <span>
                           Located in the real heart of Krakow, this property
                           has an excellent location score of 9.8!
                        </span>
                        <h2>
                           <b>
                              ${days * dataHotel?.cheapesPrice * options?.room}
                           </b>{" "}
                           ({days} nights)
                        </h2>
                        <button onClick={handleClick}>
                           Reserve or Book Now!
                        </button>
                     </div>
                  </div>
               </div>
               <MailList />
               <Footer />
            </div>
         )}
         {openModal && (
            <ReserveModal setOpenModal={setOpenModal} hotelId={id} />
         )}
      </div>
   );
};

export default Hotel;

import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";
import { RoomModel } from "../../types";
import useFetch from "../../hooks/useFetch";
import "./reserveModal.css";

interface ReserveModalProps {
   setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
   hotelId: string;
}

interface IsAvailable {
   number: number;
   unavailableDates: Array<Date>;
   _id: string;
}

const ReserveModal = ({ setOpenModal, hotelId }: ReserveModalProps) => {
   const [selectedRooms, setSelectedRooms] = useState([] as Array<string>);
   const { data } = useFetch(
      `https://booking-api-jos.herokuapp.com/api/hotels/room/${hotelId}`
   );
   const dataHotelRooms = data as unknown as RoomModel[];
   const { dates } = useSearch();
   const navigate = useNavigate();

   const getDatesInRange = (startDate: Date, endDate: Date) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const date = new Date(start.getTime());
      const dates = [];

      while (date <= end) {
         dates.push(new Date(date).getTime());
         date.setDate(date.getDate() + 1);
      }

      return dates;
   };

   const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

   const isAvailable = (roomNumber: IsAvailable): boolean => {
      const isFound = roomNumber.unavailableDates.some((date) => {
         return allDates.includes(new Date(date).getTime());
      });
      return isFound;
   };

   const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      const value = e.target.value;
      setSelectedRooms(
         checked
            ? [...selectedRooms, value]
            : selectedRooms.filter((item) => item !== value)
      );
   };

   const handleClick = async () => {
      try {
         await Promise.all(
            selectedRooms.map(async (roomId) => {
               const res = await axios.put(
                  `https://booking-api-jos.herokuapp.com/api/rooms/availability/${roomId}`,
                  {
                     dates: allDates,
                  }
               );
               return res.data;
            })
         );
         setOpenModal(false);
         navigate("/");
      } catch (error) {}
   };

   return (
      <div className="reserve">
         <div className="rContainer">
            <FontAwesomeIcon
               icon={faCircleXmark}
               className="rClose"
               onClick={() => setOpenModal(false)}
            />
            <span>Select your rooms:</span>
            {data.length > 0
               ? dataHotelRooms.map((item) => (
                    <div className="rItem" key={item._id}>
                       <div className="rItemInfo">
                          <div className="rTitle">{item.title}</div>
                          <div className="rDesc">{item.desc}</div>
                          <div className="rMax">
                             Max people: <b>{item.maxPeople}</b>
                          </div>
                          <div className="rPrice">{item.price}</div>
                       </div>
                       <div className="rSelectRooms">
                          {item.roomNumbers.map((roomNumber) => (
                             <div className="room" key={roomNumber._id}>
                                <label>{roomNumber.number}</label>
                                <input
                                   type="checkbox"
                                   value={roomNumber._id}
                                   onChange={handleSelect}
                                   disabled={isAvailable(roomNumber)}
                                />
                             </div>
                          ))}
                       </div>
                    </div>
                 ))
               : ""}
            <button onClick={handleClick} className="rButton">
               Reserve Now!
            </button>
         </div>
      </div>
   );
};

export default ReserveModal;

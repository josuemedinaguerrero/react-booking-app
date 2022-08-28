import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

export const useSearch = () => {
   const { city, dates, options, dispatch } = useContext(SearchContext);
   return { city, dates, options, dispatch };
};

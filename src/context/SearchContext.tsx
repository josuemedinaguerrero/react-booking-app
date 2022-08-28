import { createContext, useReducer } from "react";
import {
   SearchInterface,
   SearchProv,
   SearchAction,
   ChildrenProps,
} from "../types";

const INITIAL_STATE: SearchInterface = {
   city: "",
   dates: [
      {
         startDate: new Date(),
         endDate: new Date(),
         key: "",
      },
   ],
   options: {
      adult: 1,
      children: 0,
      room: 1,
   },
};

export const SearchContext = createContext<SearchProv>(INITIAL_STATE);

const SearchReducer = (
   state: SearchInterface,
   action: SearchAction
): SearchInterface => {
   switch (action.type) {
      case "NEW_SEARCH":
         return action.payload;

      case "RESET_SEARCH":
         return INITIAL_STATE;

      default:
         return state;
   }
};

export const SearchProvider = ({ children }: ChildrenProps) => {
   const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
   const { city, dates, options } = state;

   return (
      <SearchContext.Provider value={{ city, dates, options, dispatch }}>
         {children}
      </SearchContext.Provider>
   );
};

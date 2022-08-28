import { createContext, useEffect, useReducer } from "react";
import {
   AuthInterface,
   AuthProv,
   AuthAction,
   ChildrenProps,
   UserModel,
} from "../types";

const INITIAL_STATE: AuthInterface = {
   user: JSON.parse(localStorage.getItem("user") as string) || {},
   loading: false,
   error: {
      message: "",
      stack: "",
      status: 200,
      success: false,
   },
};

export const AuthContext = createContext<AuthProv>(INITIAL_STATE);

const AuthReducer = (
   state: AuthInterface,
   action: AuthAction
): AuthInterface => {
   switch (action.type) {
      case "LOGIN_START":
         return {
            user: {} as UserModel,
            loading: false,
            error: {
               message: "",
               stack: "",
               status: 404,
               success: false,
            },
         };

      case "LOGIN_SUCCESS":
         return {
            user: action.payload,
            loading: true,
            error: {
               message: "",
               stack: "",
               status: 200,
               success: true,
            },
         };

      case "LOGIN_FAILURE":
         return {
            user: {} as UserModel,
            loading: false,
            error: action.payload,
         };

      case "LOGOUT":
         return {
            user: {} as UserModel,
            loading: false,
            error: {
               message: "",
               stack: "",
               status: 404,
               success: false,
            },
         };

      default:
         return state;
   }
};

export const AuthProvider = ({ children }: ChildrenProps) => {
   const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
   const { user, loading, error } = state;

   useEffect(() => {
      localStorage.setItem("user", JSON.stringify(user));
   }, [user]);

   return (
      <AuthContext.Provider value={{ user, loading, error, dispatch }}>
         {children}
      </AuthContext.Provider>
   );
};

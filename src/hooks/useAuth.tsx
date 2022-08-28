import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
   const { user, loading, error, dispatch } = useContext(AuthContext);
   return { user, loading, error, dispatch };
};

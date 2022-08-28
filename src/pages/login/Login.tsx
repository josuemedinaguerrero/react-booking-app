import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ErrorAuth, UserLogin } from "../../types";
import "./login.css";

const Login = () => {
   let { user, loading, error, dispatch } = useAuth();
   const navigate = useNavigate();
   const [credentials, setCredentials] = useState<UserLogin>({
      username: "",
      password: "",
   });

   if (user.username) loading = true;

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials((prev) => ({
         ...prev,
         [e.target.id]: e.target.value,
      }));
   };

   const handleClick = async (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
   ) => {
      e.preventDefault();
      if (dispatch) dispatch({ type: "LOGIN_START" });
      try {
         const res = await axios.post(
            "https://booking-api-jos.herokuapp.com/api/auth/login",
            credentials
         );
         if (res && dispatch) {
            dispatch({
               type: "LOGIN_SUCCESS",
               payload: res.data.details,
            });
            navigate("/");
         }
      } catch (err) {
         const errs = err as AxiosError;
         if (dispatch) {
            const payloadError = errs.response?.data as ErrorAuth;
            dispatch({ type: "LOGIN_FAILURE", payload: payloadError });
         }
      }
   };

   return (
      <div className="login">
         <div className="lContainer">
            <input
               type="text"
               placeholder="username"
               id="username"
               onChange={handleChange}
               className="lInput"
            />
            <input
               type="password"
               placeholder="password"
               id="password"
               onChange={handleChange}
               className="lInput"
            />
            <button
               disabled={loading}
               onClick={handleClick}
               className="lButton"
            >
               Login
            </button>
            {error && <span>{error.message}</span>}
         </div>
      </div>
   );
};

export default Login;

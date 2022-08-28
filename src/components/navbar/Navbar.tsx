import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./navbar.css";

const Navbar = () => {
   const { user } = useAuth();
   const navigator = useNavigate();

   return (
      <div className="navbar">
         <div className="navContainer">
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
               <span className="logo">JoBooking</span>
            </Link>
            {user.username ? (
               user.username
            ) : (
               <div className="navItems">
                  <button className="navButton">Register</button>
                  <button
                     onClick={() => navigator("/login")}
                     className="navButton"
                  >
                     Login
                  </button>
               </div>
            )}
         </div>
      </div>
   );
};

export default Navbar;

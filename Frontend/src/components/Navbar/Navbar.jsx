import React from "react";
import { FaPlaneDeparture } from "react-icons/fa";
function Navbar(){
    return(
        <div className="nav-container">
            <a href="/" className="nav-icon"><FaPlaneDeparture /></a>
            <a href="#" className="nav-offer">Offers</a>
            <a href="#" className="nav-services">Customer Services</a>
            <button>Login in</button>
            
        </div>
    )
}

export default Navbar
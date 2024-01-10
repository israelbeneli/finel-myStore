import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth.context";

export function NavBar(){
    const {worker} = useAuth();
    const [isDark, setIsDark] = useState(true);
    useEffect(() => {
      if (isDark) {
        document.getElementsByTagName("body")[0].setAttribute("data-bs-theme","light");
        localStorage.setItem("mode",false);
      } else {
        document.getElementsByTagName("body")[0].setAttribute("data-bs-theme","dark");
        localStorage.setItem("mode",true);
      }
    }, [isDark]); 
 return(
  <div className='container w-100'>
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3  border-bottom">
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center">
            <NavLink className="nav-link" to="/"><li>דף הבית <i className="bi bi-house"></i></li></NavLink>
            {worker && <NavLink className="nav-link" to="/workers/orders"><li>ההזמנות שלי</li></NavLink>}
            {worker &&<NavLink className="nav-link" to="/cart"><li>Cart <i className="bi bi-cart"></i></li></NavLink>}
        </ul>

        <div className="col-md-3 text-end">
            {worker && <NavLink className="btn btn-primary mx-2" to="/logout">Logout</NavLink>}
            {!worker &&<NavLink className="btn btn-primary mx-2" to="/">Login</NavLink>}
        </div>
        <div className="col-md-3 text-end">
            <button className="btn border mx-2" onClick={()=>setIsDark(!isDark)}>{!isDark?<i className="bi bi-brightness-high"></i>:<i className="bi bi-moon"></i>}</button>
            {worker && <i className="bi bi-person mx-2"> {worker.workerNum}</i>}
        </div> 
        </header></div>
    ) 
}
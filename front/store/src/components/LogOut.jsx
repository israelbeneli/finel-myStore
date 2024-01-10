import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { useState } from "react";

export function LogOut(){
  
    const navigate = useNavigate(); 
    const { logout, worker } = useAuth();
      const [login,setLogin]=useState(Boolean(worker));
    const handleLogout = ()=>{    
        if (worker){
            logout(); 
            navigate("");
            setLogin(false)
        }
    } 

return (
<div className="container w-25 border-black">{login && <>
    <h2>Logout</h2>
    <p>האם אתה בטוח שברצונך לצאת</p>
    <button className="btn btn-danger" onClick={handleLogout}>צא!</button>
</>}
</div>
  );    
}
export default LogOut

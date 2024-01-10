// ButtonGroup.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './loginForm';
import { useAuth } from '../context/auth.context';


const ButtonGroup = () => {
  const {worker}=useAuth();

  if(worker){
      return (
    <div className="container mt-5">
      <div className="col-auto">
        {(worker?.status==="PersonnelManager" || worker?.status==="Admin") &&  <a className="btn btn-lg btn-primary p-5 m-1 w-25" key="0" href="/workers" role="button" label="עובדים">עובדים</a>}  
        <a className="btn btn-lg btn-primary p-5 m-1 w-25" key="1" href="/prodacts" role="button" label="מוצרים">מוצרים</a>
        <a className="btn btn-lg btn-primary p-5 m-1 w-25" key="3" href="/customers" role="button" label="לקוחות">לקוחות</a> 
        {(worker?.status==="PurchasingManager" || worker?.status==="Admin") &&<a className="btn btn-lg btn-primary p-5 m-1 w-25" key="4" href="/providers" role="button" label="ספקים">ספקים</a>}  
      </div>
    </div>
  );
  }
  else{
    return(
      <LoginForm></LoginForm>
    )
  }
};

export default ButtonGroup;

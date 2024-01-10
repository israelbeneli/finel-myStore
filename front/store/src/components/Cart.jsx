import React, { useState } from 'react';
import { useShoppingBasket } from '../context/ShoppingBasketContext';
import ProdactLineInBasket from '../common/ProdactLineInBasket';
import { useNavigate } from 'react-router-dom';
import CustomerInCart from '../common/CustomerInCart';
import { useAuth } from '../context/auth.context';
import customerService from '../services/customerservice';
import workerService from '../services/workerservice';
import orderService from '../services/orderservice';
import { toast } from 'react-toastify';
const ShoppingCart = () => {
    
    const calculateTotal = (basket)=>{
        let totalCalc = 0;
        basket.items.forEach(prodact => {
            totalCalc = totalCalc+(prodact.prodact.priceAfterDisc*prodact.units);            
        });
        return totalCalc;
    }
    const navigate = useNavigate(); 
    const {worker}=useAuth()
    const { basket, clearBasket } = useShoppingBasket();
    const [total,setTotal]= useState(calculateTotal(basket)) 
    const[customer,setCustomer]=useState(null);
   

    const createNewOrder=async()=>{
        if(total===0){
        toast.error("לא ניתן ליצור הזמנה ללא פריטים") 
        return
        }
        const customerToAdd = await customerService.getCustomerWithId(basket.customer.israeliId);
        const workerToAdd = await workerService.getWorkerWithNum(worker.workerNum);
        const prodactsToAdd = [];
        for (let i=0;i<basket.items.length;i++){
            prodactsToAdd.push({prodact:basket.items[i].prodact,units:Number(basket.items[i].units)})
        }
        let newOrder = {customer:customerToAdd.data,
            prodacts:prodactsToAdd,
            totalPrice:total,
            worker:workerToAdd.data
        }
        
        newOrder = await orderService.createOrder(newOrder);
        const data = newOrder.data;
        await customerService.addOrderToCustomer(basket.customer.israeliId,data);
        await workerService.addOrderToWorker(worker.workerNum,data)
        clearBasket();
        setTotal(0);
        setCustomer(null);
        basket.customer=null;
    }   

    return (
  
   <div className="row mb-3">
     
    <div className='row'>
        {(basket.customer)&&
        <ul className="list-group w-25">
            <li className="list-group-item">שם הלקוח: {basket.customer.name.first} {basket.customer.name.last}</li>
            <li className="list-group-item">מספר זהות: {basket.customer.israeliId}</li>
            <li className="list-group-item">מספר טלפון: {basket.customer.phone}</li>
            <li className="list-group-item">כתובת: רחוב: {basket.customer.address.street} מספר בית: {basket.customer.address.houseNumber} עיר: {basket.customer.address.city}</li>
            <li><button className='btn btn-dark' onClick={()=>{
                basket.customer=null
                setCustomer(null);
                }}>לעדכון פרטים לחץ כאן</button></li>
        </ul>}
        <CustomerInCart customer={customer} setCustomer={setCustomer}></CustomerInCart>
    </div>
    <div className="container">
        <button className='btn btn-dark w-25 center' onClick={()=>navigate("/prodacts/search")}>לחיפוש פריטים לחץ כאן</button>           
    </div>
    <h2>Shopping Basket</h2>
    <table className="table">
      <thead>
        <tr>
          <th>מק"ט</th>
          <th>שם המוצר</th>
          <th>דגם</th>   
          <th>מחיר</th>
          <th>מחיר אחרי הנחה</th>
          <th> כמות בסל</th>
          <th> כמות להוספה לסל</th>
          <th>אחוז הנחה לפריט</th>
        <th></th>
        <th></th>
        </tr>
      </thead>
        <tbody>
        {basket.items.map(item => ( 
            <ProdactLineInBasket key={item.prodact.barcode} prodact={item.prodact} setTotal={setTotal} total={total} calculateTotal={calculateTotal}></ProdactLineInBasket>
        ))}
        </tbody>
      </table>
      <h3 className="">סה"כ {total} ש"ח</h3>
      
      <div className='container'>
      <button className='btn btn-danger m-4' onClick={() =>{
        basket.customer=null;
        clearBasket();
        setTotal(0);
       
      }}>מחק
      </button>
        {basket.customer&&<button className='btn btn-primary m-4' onClick={() => createNewOrder()}>יצירת הזמנה חדשה</button>}
    </div>  
    
   </div>
  );
};

export default ShoppingCart;

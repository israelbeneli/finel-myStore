import { useEffect, useState } from "react"
import orderService from "../services/orderservice";
import customerService from "../services/customerservice";
import { toast } from 'react-toastify';
import OrderComponent from "./OrderComponent";
const OrderLine = ({order})=>{
const [custumerName,setCustumerName]=useState("")
const [PaidStatus,setPaidStatus]=useState(order.paidUp)
const [ProvidedStatus,setProvidedStatus]=useState(order.provided)

//משיכת שם הלקוח מהדאטה בייס 
useEffect(()=>{
    const fetchData = async()=>{
        let customer = await customerService.getCustomerById(order.customer);
        customer=customer.data;
        const name = customer.name.first+" "+customer.name.last;
        setCustumerName(name);
    }
    fetchData();
},[custumerName, order.customer])
//חישוב כמות פריטים
let counter = 0;
order.prodacts.forEach(prodact => {
    counter += prodact.units;
});
//הפיכת הזמן שמופיע בשרת לפורמט של תאריך בלבד
const date = new Date(order.createdAt)
const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  //פונקציה שמעדכנת את ההזמנה בשרת על תשלום או אי תשלום בהזמנה
const handlePaidChackBox = async(orderId,status)=>{
    if(ProvidedStatus===false){
        const response = await orderService.getOrderById(orderId);
        const order = response.data;
        order.paidUp = status;
        orderService.updateOrder(order._id,order);
        setPaidStatus(status); 
    }
    else{
        toast.warn("לא ניתן לבטל תשלום לאחר שמוצר סופק")
    }

}
  //פונקציה שמעדכנת את ההזמנה בשרת על אספקה או אי אספקה של הזמנה
  const handleProvidedChackBox = async(orderId,status)=>{
    if (PaidStatus===true){
        const response = await orderService.getOrderById(orderId);
        const order = response.data;
        order.provided = status;
        orderService.updateOrder(order._id,order);
        setProvidedStatus(status);
    }
    else{
        toast.warn("לא ניתן לשחרר הזמנה שטרם שולמה")
    }

}

    return(<>
    <tr key={order.orderNum}>
          <td><OrderComponent 
          order={order}
          date ={formattedDate}>
        </OrderComponent></td>
          <td>{order.prodacts.length}</td>
          <td>{counter}</td>
          <td>{custumerName}</td>
          <td>{order.totalPrice}</td>
          <td>{formattedDate}</td>
          <td><input type="checkbox" id={`PaidStatus${order.orderNum}`}  checked={PaidStatus} onChange={(e)=>handlePaidChackBox(order._id,e.target.checked)}></input></td>
          <td><input type="checkbox" id={`ProvidedStatus${order.orderNum}`} checked={ProvidedStatus} onChange={(e)=>handleProvidedChackBox(order._id,e.target.checked)}></input></td>
        </tr>
    </>
    )
}
export default OrderLine;
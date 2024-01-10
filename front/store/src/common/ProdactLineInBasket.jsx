import { useState } from "react";
import { useShoppingBasket } from "../context/ShoppingBasketContext"
import { toast } from 'react-toastify';
const  ProdactLineInBasket =({prodact,units,setTotal,total,calculateTotal})=>{
const checkIfAlredyInBasket=(prodact)=>{
    for(let i=0;i<basket.items.length;i++){
        if((basket.items[i].prodact.barcode)===prodact.barcode){
            // setUnitInBasket(basket.items[i].units)
            return (basket.items[i].units);
        }
    }
    return(0);
}        
    const {basket}=useShoppingBasket();
    const [unitInBasket,setUnitInBasket]=useState(checkIfAlredyInBasket(prodact)||0);
    const [unitToadd,setUnitToAdd]=useState(0);
    const [discount , setDiscount]=useState(0)
    const [priceAfterDiscount,setPriceAfterDiscount]=useState(prodact.price)


const handleAddToBasket = (units)=>{

    for (let i =0;i<basket.items.length;i++){
        if(basket.items[i].prodact.barcode===prodact.barcode){
            (basket.items[i].units)=Number(units)+Number(basket.items[i].units);
            setUnitInBasket(basket.items[i].units);
            setTotal(calculateTotal(basket));
            return;
        }
    }
    basket.items.push({prodact,units})
    setUnitInBasket(units);
} 
const handleRemoveFromBasket = ()=>{
    for (let i =0;i<basket.items.length;i++){
        if(basket.items[i].prodact.barcode===prodact.barcode){
            basket.items.splice([i],1)
            setUnitInBasket(0);
            setTotal(calculateTotal(basket));
            return;
        }
    }
    basket.items.push({prodact,units})
    setUnitInBasket(units);
} 
return(
        <>
        
        <tr key={prodact.barcode}>
          <td>{prodact.barcode}</td>
          <td>{prodact.prodactDetails.name}</td>
          <td>{prodact.prodactDetails.model}</td>
          <td>{prodact.price} ש"ח</td>
          <td>{priceAfterDiscount}</td>
          <td>{unitInBasket}</td>
          <td><input className="input w-25"  type="number" id="units" name="units" value={unitToadd} onChange={(e)=>setUnitToAdd(e.target.value)}></input></td>
          <td><input className="input w-25"  type="number" id="discaunt" name="discaunt" value={discount} onChange={(e)=>{
            setDiscount(e.target.value)
            if(prodact.maxDiscount>=e.target.value){
                setPriceAfterDiscount(prodact.price-((prodact.price*e.target.value)/100))  
                prodact.priceAfterDisc=prodact.price-((prodact.price*e.target.value)/100)
                setTotal(calculateTotal(basket))
            }
            else{
                toast.warn("to Match Discount")
                setDiscount(prodact.maxDiscount);
            }
          }  
            }></input></td>
          <td><button className="btn btn-outline-primary" id="barcode" onClick={()=>handleAddToBasket(unitToadd)}>הוסף לסל</button></td>
          <td><button className="btn btn-outline-danger" id="barcode" onClick={() =>handleRemoveFromBasket(prodact)}>הסר מהסל</button></td>
        </tr>
        
        </>
    )
}
export default ProdactLineInBasket
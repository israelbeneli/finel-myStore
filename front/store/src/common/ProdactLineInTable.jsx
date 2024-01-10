import { useState } from "react";
import { useShoppingBasket } from "../context/ShoppingBasketContext"
import ProdactComponent from "./ProdactComponent";

const  ProdactLineInTable =({prodact})=>{
prodact.priceAfterDisc=prodact.price;
const checkIfAlredyInBasket=(prodact)=>{

    for(let i=0;i<basket.items.length;i++){
        if((basket.items[i].prodact.barcode)===prodact.barcode){
            return (basket.items[i].units);
        }
    }
    return(0);
}        
    const {basket}=useShoppingBasket();
    const [unitInBasket,setUnitInBasket]=useState(checkIfAlredyInBasket(prodact));
    const [unitToadd,setUnitToAdd]=useState(0);



const handleAddToBasket = (units)=>{
    for (let i =0;i<basket.items.length;i++){
        if(basket.items[i].prodact.barcode===prodact.barcode){
            (basket.items[i].units)=Number(units)+Number(basket.items[i].units);
            setUnitInBasket(basket.items[i].units);
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
          <td>{prodact.provider.providerName}</td>
          <td>{prodact.price} ש"ח</td>
          <td>{prodact.unitsInStock}</td>
          <td>{prodact.maxDiscount}%</td>
          <td>{unitInBasket}</td>
          <td><input className="input w-25"  type="number"  name="units" value={unitToadd} onChange={(e)=>setUnitToAdd(e.target.value)}></input></td>
          <td><button className="btn btn-outline-primary" disabled={(unitToadd===0)}  onClick={()=>handleAddToBasket(unitToadd)}>הוסף לסל</button></td>
        <td><ProdactComponent prodact={prodact}></ProdactComponent></td>
        </tr>
        
        </>
    )
}
export default ProdactLineInTable
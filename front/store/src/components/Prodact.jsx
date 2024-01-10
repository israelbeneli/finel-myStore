import { useAuth } from "../context/auth.context";

const Prodact = ()=>{
    
const {worker}=useAuth();

let buttonData =[]
if (worker.status==="PurchasingManager" || worker.status==="Admin"){
  buttonData =[
    { label: 'הוספת מוצר חדש', url: '/prodacts/add' },
    { label: 'שינוי פרטים/מחיקה', url: '/prodacts/change' },
    { label: 'חיפוש מוצרים', url: '/prodacts/search'}
  ]
}
else{
  buttonData =[
    { label: 'חיפוש מוצרים', url: '/prodacts/search'}
  ]
}
;
    return(<>
    <div className="container mt-5">
            <div className="col-auto">
                {buttonData.map((button, index) => (
                <a
                key={index}
                href={button.url}
                className="btn btn-lg btn-primary mr-2 m-3 w-25"
                role="button"
                >
                {button.label}
                </a>
                ))}
        </div>
    </div> 
    </>)
}
export default Prodact
const OrderShow=({customerName,order,prodactList,date,address})=>{
    console.log(prodactList)
    const getTotalBeforeDiscaunt = ()=>{
        let counter = 0;
        prodactList.forEach((prodact,index) => {
            counter = counter +(prodact.price*order.prodacts[index].units)
        });
        return counter;
    }
  
    
    const TotalBeforeDisc = getTotalBeforeDiscaunt();
    return(<>
    <section class="h-100 gradient-custom"
    style={{backgroundColor:"white"}}>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100"
    style={{backgroundColor:"white"}}>
      <div class="col-lg-10 col-xl-8">
        <div class="card" style={{ borderRadius: '10px'}}>
          <div class="card-header px-4 py-5">
            <h5 class="text-muted mb-0">תודה על רכישתך <span style={{color: "#a8729a"}}>{customerName}</span>!</h5>
          </div>
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <p class="lead fw-normal mb-0" style={{color: "#a8729a"}}>הזמנה</p>
              <p class="small text-muted mb-0">מספר הזמנה : {order.orderNum}</p>
            </div>    
            {prodactList.map((prodact,index)=>(
              <div class="card shadow-0 border mb-4"
               style={{
                backgroundColor: '#white',
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px', 
            }}>
              <div class="card-body">
                <div class="row" style={{
                backgroundColor: 'white',
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px', 
            }}>
                  <div class="col-md-2">
                    <img src={prodact.image.url}
                      class="img-fluid" alt="Phone"/>
                  </div>
                  <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p class="text-muted mb-0">{prodact.prodactDetails.name}</p>
                  </div>
                  <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p class="text-muted mb-0 small">{prodact.prodactDetails.model}</p>
                  </div>
                  <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p class="text-muted mb-0 small">{order.prodacts[index].units}</p>
                  </div>
                  <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p class="text-muted mb-0 small">{prodact.price}</p>
                  </div>
                  <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p class="text-muted mb-0 small">{prodact.price*order.prodacts[index].units}</p>
                  </div>
                </div>
                <hr class="mb-4" style={{
                        backgroundColor: '#e0e0e0',
                        opacity: 1,
                }}/>
              </div>
            </div>  
            ))}
            

            <div class="d-flex justify-content-between pt-2">
              <p class="fw-bold mb-0">פרטי הזמנה:</p>
              <p class="text-muted mb-0"><span class="fw-bold me-4"> סה"כ לפני הנחה: </span>{TotalBeforeDisc} ש"ח</p>
            </div>

            <div class="d-flex justify-content-between pt-2">
              <p class="text-muted mb-0">מספר הזמנה : {order.orderNum}</p>
              <p class="text-muted mb-0"><span class="fw-bold me-4">הנחה: </span>{Math.floor((TotalBeforeDisc-order.totalPrice)*10)/10} ש"ח</p>
            </div>

            <div class="d-flex justify-content-between">
              <p class="text-muted mb-0">תאריך קנייה : {date}</p>
              <p class="text-muted mb-0"><span class="fw-bold me-4">מע"מ: </span>{Math.floor(order.totalPrice-(order.totalPrice/1.17))} ש"ח</p>
            </div>

            <div class="d-flex justify-content-between mb-5">
              <p class="text-muted mb-0">כתובת הלקוח : {address}</p>
            </div>
          </div>
          <div class="card-footer border-0 px-4 py-5"
            style={{
                backgroundColor: '#a8729a',
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px', 
            }}>
            <h5 class="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">סה"כ:</h5>  
              <h3 class="d-flex align-items-center justify-content-end text-white text-uppercase mb-0"> {order.totalPrice} ש"ח</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>)
}
export default OrderShow;



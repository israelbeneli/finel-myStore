import httpService from "./httpservice";

export function setTokenHeader(){
    httpService.setCommonHeader("x-auth-token", localStorage.getItem("token"));
}
setTokenHeader();

export async function createCustomer(customer) {
    // setTokenHeader();
    const newCustomer = await httpService.post("/customers", customer); 
    return newCustomer;
}
    

export async function getCustomerWithId(israeliId){
    const workerRes = await httpService.get(`/customers/${israeliId}`)
    return workerRes;
}  
export async function getCustomerById(id){
    return await httpService.get(`/customers/byid/${id}`)
}
export async function customerChangeDetails(israeliId ,newDetails) {
    return await httpService.patch(`/customers/${israeliId}`,newDetails)
}

export async function delCustomerByIsraeliId(israeliId){
    return await httpService.delete(`/customers/${israeliId}`)
}

export async function addOrderToCustomer(israeliId,order){
    return await httpService.put(`/customers/orders/${israeliId}`,order)
}


const customerService = {
    createCustomer,
    getCustomerWithId,
    customerChangeDetails,
    delCustomerByIsraeliId,
    addOrderToCustomer,
    getCustomerById

}
export default customerService;
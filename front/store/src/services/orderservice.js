import httpService from "./httpservice";

export function setTokenHeader(){
    httpService.setCommonHeader("x-auth-token", localStorage.getItem("token"));
}
setTokenHeader();

export async function createOrder(order) {
    // setTokenHeader();
    const newOrder = await httpService.post("/orders", order); 
    return newOrder;
}
export async function getOrderById(id){
    const result = await httpService.get(`/orders/${id}`)
    return result;
}
export async function getOrderByCustomer(customerId){
    const res = await httpService.get(`/orders/bycustumers/${customerId}`)
    return res;
}
export async function updateOrder(orderId,newOrder){
    return await httpService.patch(`/orders/update/${orderId}`,newOrder)
}
export async function getOrderByWorker(workerId){
    const res = await httpService.get(`/orders/byworkers/${workerId}`)
    return res;
}
    



const orderService = {
    createOrder,
    getOrderById,
    updateOrder
}
export default orderService;
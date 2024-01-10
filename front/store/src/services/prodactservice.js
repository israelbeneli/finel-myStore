import httpService from "./httpservice";

export function setTokenHeader(){
    httpService.setCommonHeader("x-auth-token", localStorage.getItem("token"));
}
setTokenHeader();

export async function createProdact(prodact) {  
    return await httpService.post("/prodacts", prodact); 
}
export async function chengeProdactDetails(barcode,newDetails){
    return await httpService.patch(`/prodacts/change/${barcode}`,newDetails)
}    
export async function getProdactByBarcode(barcode){
    return  await httpService.get(`/prodacts/barcode/${barcode}`)
} 
export async function getProdactById(id){
    return  await httpService.get(`/prodacts/id/${id}`)
}   
export async function getAllProdacts() {
    return await httpService.get(`/prodacts/all/`)
}

export async function delProdactByBarcode(barcode){
    return await httpService.delete(`/prodacts/${barcode}`)
}


const prodactService = {
    createProdact,
    getProdactByBarcode,
    getAllProdacts,
    chengeProdactDetails,
    delProdactByBarcode,
    getProdactById
}
export default prodactService
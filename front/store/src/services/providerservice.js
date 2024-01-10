import httpService from "./httpservice";
import { toast } from 'react-toastify';
export async function createProvider(provider) {
    const newProvider =  await httpService.post("/providers", provider);
    return newProvider;
}
export async function getProviderById(id){
    const provider = await httpService.get(`/providers/Byid/${id}`)
    return provider;
}
export async function getProviderWithNum(providerNum){
    if (!providerNum){
        return false;
    }
    try{
        const providerRes = await httpService.get(`/providers/${providerNum}`)
        if(providerRes){
            return providerRes; 
        }
        else{
            toast.error("provider is not exist")
            return false  
        }
    }catch(e){
        toast.error(e)
    }
}  
export async function providerDelete(providerNum){
    const providerRes = await httpService.delete(`/providers/${providerNum}`)
    return providerRes;
}  
export async function providerChangeDetails(providerNumber ,providerUpdate) {
    return await httpService.put(`/providers/${providerNumber}`,providerUpdate)
}
const providerService = {
    createProvider,
    getProviderWithNum,
    providerDelete,
    providerChangeDetails,
    getProviderById
}
export default providerService;
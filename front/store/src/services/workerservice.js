import httpService from "./httpservice";
import {jwtDecode} from "jwt-decode";
const TOKEN_KEY = "token";

export function setTokenHeader(){
    httpService.setCommonHeader("x-auth-token", getJWT());
}
setTokenHeader();



export async function loginWorker(credentials) {
    
    const response = await httpService.post("/workers/login", credentials);
    localStorage.setItem(TOKEN_KEY, response.data);
    setTokenHeader();
    return response;
  }
export function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setTokenHeader();
    
}
export async function createWorker(worker) {
    return await httpService.post("/workers", worker);
}
export async function createAdmin(admin) {
    return await httpService.post("/workers/createadmin", admin);
}
export async function getWorkerWithNum(workerNum){
    return await httpService.get(`/workers/${workerNum}`)
}  
export async function getWorkerById(WorkerId){
    return await httpService.get(`/workers/byId/${WorkerId}`)
}  
export async function workerDelete(workerNum){
   return await httpService.delete(`/workers/${workerNum}`)
}  
export async function workerChangeDetails(workerNumber ,workerUpdate) {
    return await httpService.put(`/workers/${workerNumber}`,workerUpdate)
}
export async function addOrderToWorker(workerNum,order){
    return await httpService.put(`/workers/orders/${workerNum}`,order)
}

export function getJWT() {
    return localStorage.getItem(TOKEN_KEY);
}
export function getWorker() {
    try {
      const token = getJWT();
      return jwtDecode(token);
    } catch {
      return null;
    }
}

const workerService = {
    createWorker,
    loginWorker,
    logout,
    getJWT,
    getWorker,
    getWorkerWithNum,
    workerChangeDetails,
    workerDelete,
    addOrderToWorker,
    getWorkerById,
    createAdmin
}
export default workerService;
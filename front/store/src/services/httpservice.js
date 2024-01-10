import axios from "axios";
import config from "../config.json";
import { toast } from "react-toastify";

axios.defaults.baseURL = config.apiUrl;

export function setCommonHeader(headerName, value) {
  axios.defaults.headers.common[headerName] = value;
}
// header:{"x-auth-token":token};

axios.interceptors.response.use(null, (error) => {
  if (error.code === "ERR_NETWORK") {
    toast.error("Network Error");
  } else if (error.response.status >= 403) {
    toast.error("An unexpected error occurred");
  }
  else if (error.response.status === 401) {
    toast.error(error.response.data);
  }

  return Promise.reject(error);
});



const httpService = {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  put: axios.put,
  delete: axios.delete,
  setCommonHeader,
};

export default httpService;

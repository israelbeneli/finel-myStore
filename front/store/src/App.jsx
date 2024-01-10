
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import ShoppingCart from './components/Cart';
import { Customer } from './components/Customer';
import AddCustomerForm from './components/CustomerAddForm';
import CustomerOrderList from './components/CustomerOrders';
import CustomerUpdateForm from './components/CustomerUpdate';
import { LogOut } from './components/LogOut';
import { NavBar } from './components/NavBar';
import Prodact from './components/Prodact';
import AddProdactForm from './components/ProdactAddForm';
import ProdactChangeDetails from './components/ProdactChangeDetails';
import ProdactSearch from './components/ProdactSearch';
import Providers from './components/Provider';
import AddProviderForm from './components/ProviderAddForm';
import ProviderUpdateForm from './components/ProviderUpdate';
import AddWorkerForm from './components/WorkerAddForm';
import WorkerOrderList from './components/WorkerOrderList';
import WorkerUpdate from './components/WorkerUpdate';
import Workers from "./components/Workers";
import ButtonGroup from './components/main';
import { useAuth } from './context/auth.context';
import workerService from './services/workerservice';
function App() {
  //יצירת משתמש ראשוני עם הרשאות מנהל(ירוץ פעם אחת בלבד)
  const createAdminInFirstTime=()=>{
    const admin = {
      name:"israel",
      phone:"0543331122",
      password:"12345678",
      status:"Admin"
  }
    workerService.createAdmin(admin); 
  }
// createAdminInFirstTime();

  const{worker}=useAuth();
  
  return (
    <div className="App">
      <div className="row">
        <h1>My Store</h1>
      </div>
      <div className="header">
      <NavBar></NavBar>
      <ToastContainer></ToastContainer>
      </div>
      <div className='column min-vh-100'>
      <Routes>
        <Route path='/' element={<ButtonGroup></ButtonGroup>}></Route>
        <Route path='/logout' element={<LogOut></LogOut>}></Route>
       {worker&&<> 
        <Route path='/cart' element={<ShoppingCart></ShoppingCart>}></Route>
        <Route path='/workers' element={<Workers></Workers>}></Route>
          <Route path='/workers/add' element={<AddWorkerForm></AddWorkerForm>}></Route>
          <Route path='/workers/change' element={<WorkerUpdate></WorkerUpdate>}></Route>
          <Route path='/workers/orders' element={<WorkerOrderList></WorkerOrderList>}></Route>
        <Route path='/customers' element={<Customer></Customer>}></Route>
          {(worker.status==="PersonnelManager" || worker.status==="Admin")&&<>
          <Route path='/customers/add' element={<AddCustomerForm></AddCustomerForm>}></Route>
          <Route path='/customers/change' element={<CustomerUpdateForm></CustomerUpdateForm>}></Route>
          <Route path='/customers/orders' element={<CustomerOrderList></CustomerOrderList>}></Route>
          </>}
          {(worker.status==="PurchasingManager" || worker.status==="Admin") &&<>   
            <Route path='/providers' element={<Providers></Providers>}></Route>
          <Route path='/providers/add' element={<AddProviderForm></AddProviderForm>}></Route>
          <Route path='/providers/change' element={<ProviderUpdateForm></ProviderUpdateForm>}></Route>
          </>}
        <Route path='/prodacts' element={<Prodact></Prodact>}></Route>
        {(worker.status==="PurchasingManager" || worker.status==="Admin") &&<>
        <Route path='/prodacts/change' element={<ProdactChangeDetails></ProdactChangeDetails>}></Route>
          <Route path='/prodacts/add' element={<AddProdactForm></AddProdactForm>}></Route></>}
          <Route path='/prodacts/search' element={<ProdactSearch></ProdactSearch>}></Route></>}
      </Routes>
      </div>
      <div className="footer">
        <h3>Footer</h3>
      </div>
    </div>
  );
}

export default App;

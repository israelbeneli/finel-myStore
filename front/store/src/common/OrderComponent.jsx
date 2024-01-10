
import React, { useEffect, useState } from 'react';
import OrderModal from './OrderModal';

import prodactService from '../services/prodactservice';
import customerService from '../services/customerservice';

const OrderComponent = ({order,date}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [customerDetails , setCustumerName]=useState("");
  const [podactList,setProdactList]=useState([])
  useEffect(()=>{
    const customerData = async()=>{
      let customer = await customerService.getCustomerById(order.customer);
      customer=customer.data;
      setCustumerName(customer);
    }
    const prodactsData = async()=>{
        const prodacts = [];
        for(let i=0;i<order.prodacts.length;i++){
          const prodact = await prodactService.getProdactById(order.prodacts[i].prodact);
          prodacts.push(prodact.data);
          console.log(order.prodacts[i].prodact)
        }
        setProdactList(prodacts);
    }
    customerData();
    prodactsData();
  },[order.customer, order.prodacts])
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
        {order && <>
          <button className='btn btn-outline-success  w-100' onClick={openModal}>{order.orderNum}</button>
          <OrderModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            detailsCustomer={customerDetails}
            detailsProdacts={podactList}
            detailsOrder={order}
            date={date}/>
        </>}       
    </>
  );
};

export default OrderComponent;

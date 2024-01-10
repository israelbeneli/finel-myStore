
import React from 'react';
import Modal from 'react-modal';
import OrderShow from './OrderShow';

const OrderModal = ({ isOpen, onRequestClose, detailsCustomer, detailsProdacts,detailsOrder,date}) => {
  
  let customerName = "";
  let address = "";
  if(detailsCustomer){
    customerName=detailsCustomer.name.first+" "+detailsCustomer.name.last;
    address ="רחוב: "+ detailsCustomer.address.street+". מספר בית: "+detailsCustomer.address.houseNumber +" עיר: "+ detailsCustomer.address.city;
  }
  
  return (
    
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Details Modal"
      ariaHideApp={false}>
        <button className='btn btn-close' onClick={onRequestClose}></button>
        <OrderShow 
        customerName={customerName}
        order={detailsOrder}
        prodactList={detailsProdacts}
        date={date}
        address={address}
        ></OrderShow>
    </Modal>
  
  );
};

export default OrderModal;

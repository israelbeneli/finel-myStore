
import React from 'react';
import Modal from 'react-modal';

const ProdactModal = ({ isOpen, onRequestClose, details, imageUrl,alt,name }) => {
  return (
    
    <Modal className="container"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Details Modal"
      ariaHideApp={false}>
        <button className='btn btn-close' onClick={onRequestClose}></button>
        <div className='card w-50 text-center'>
            <div className='card-image'><img className='w-50 p-2' src={imageUrl} alt={alt} /></div>
            <div className='card-body'>
                <h2 className='card-title'>פרטי המוצר</h2>
                <h4  className='card-title'>{name}</h4>
                <p className='card-text'>{details}</p>
            </div>
        </div>
    </Modal>
  
  );
};

export default ProdactModal;

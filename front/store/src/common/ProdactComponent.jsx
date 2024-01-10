
import React, { useState } from 'react';
import ProdactModal from './ProdactModal';

const ProdactComponent = ({prodact}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
        <button className='btn btn-info' onClick={openModal}>לפרטי מוצר</button>
                <ProdactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                details={prodact.prodactDetails.description}
                imageUrl={prodact.image.url}
                alt={prodact.image.alt}
                name={prodact.prodactDetails.name+" דגם: "+prodact.prodactDetails.model}
                />
            
    </>
  );
};

export default ProdactComponent;

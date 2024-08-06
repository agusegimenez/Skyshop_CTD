import React, { useState } from 'react';
import Header from "./Components/Header";
import Body from './Components/Body';
import Modal from "./Components/Modal";
import './index.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenModal = (producto) => {
    setSelectedProduct(producto);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Header />
      <Body handleOpenModal={handleOpenModal} />
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        producto={selectedProduct} 
      />
    </>
  );
}

export default App;
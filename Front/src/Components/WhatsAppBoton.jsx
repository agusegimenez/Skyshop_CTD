import React from 'react'
import { FaWhatsapp } from 'react-icons/fa';
import customCss from './WhatsAppBoton.module.css';

const WhatsAppBoton = () => {
    const whatsappNumber = '5492284553077';
    const message = "¡Hola SkyShop!"

    const handleClick = () => {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
      };
    
      return (
        <div className={customCss.whatsappButton} onClick={handleClick}>
          <FaWhatsapp size={40} color="white" />
        </div>
      );
    };

export default WhatsAppBoton
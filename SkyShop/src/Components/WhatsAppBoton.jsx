import React from 'react'
import { FaWhatsapp } from 'react-icons/fa';
import customCss from './WhatsAppBoton.module.css';

const WhatsAppBoton = () => {
    const whatsappNumber = '5492284553077';

    const handleClick = () => {
        const whatsappUrl = `https://wa.me/${whatsappNumber}`;
        window.open(whatsappUrl, '_blank');
      };
    
      return (
        <div className={customCss.whatsappButton} onClick={handleClick}>
          <FaWhatsapp size={40} color="white" />
        </div>
      );
    };

export default WhatsAppBoton
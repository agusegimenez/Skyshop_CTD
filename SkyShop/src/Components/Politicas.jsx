import React from 'react';
import customCss from './Politicas.module.css';

const Politicas = () => {
  return (
    <div className={customCss.politicasContainer}>
      <h3 style={{textDecoration: "underline"}}>Políticas del Producto & Políticas de Entrega</h3>
      <ul className={customCss.politicasList}>
        <li><strong>Política de Horarios de Entrega:</strong> Las entregas se realizan en franjas horarias de 1 hora, seleccionadas por el cliente al realizar la reserva. El cliente debe estar presente para recibir el paquete en la franja elegida. Los horarios disponibles son de 7:00 AM a 10:00 PM todos los días. Los retrasos o cambios en la entrega pueden estar sujetos a condiciones climáticas adversas o restricciones operativas.</li>
        <li><strong>Política de Entrega en Balcones:</strong> Las entregas a balcones están disponibles exclusivamente para edificios que cumplan con los estándares de accesibilidad de drones. El cliente debe asegurarse de que el balcón esté despejado y sea accesible desde el exterior. No nos hacemos responsables por entregas fallidas debido a obstáculos no informados o problemas de acceso al balcón.</li>
        <li><strong>Política de Responsabilidad y Daños:</strong> Los paquetes entregados por drones están asegurados por posibles daños durante el vuelo o la entrega. Sin embargo, no nos responsabilizamos por daños causados por el receptor al intentar recoger el paquete o por daños derivados de la caída de objetos no asegurados correctamente en el balcón.</li>
        <li><strong>Política de Cancelaciones y Modificaciones:</strong> Las cancelaciones de pedidos pueden realizarse hasta 2 horas antes de la franja horaria reservada sin costo adicional, comunicandose con SkyShop vía WhatsApp. Modificaciones de la franja horaria o dirección de entrega no están permitidas. De cancelar su pedido tendrá una multa del 10% del precio total del Paquete elegido, que será abonado en su próxima compra después de dicha cancelación.</li>
        <li><strong>Política de Clima y Condiciones Meteorológicas:</strong> Por la seguridad de nuestros drones y sus entregas, las operaciones de vuelo están sujetas a las condiciones meteorológicas. En caso de tormentas, vientos fuertes o condiciones peligrosas, las entregas pueden ser reprogramadas automáticamente y el cliente será notificado con antelación.</li>
        <li><strong>Política de Seguridad y Privacidad:</strong> Cumplimos con todas las normativas locales en cuanto a la seguridad y privacidad de los datos del cliente y las operaciones de vuelo de drones. Las rutas de los drones son monitoreadas, y las imágenes capturadas durante el vuelo son utilizadas exclusivamente para garantizar la precisión de las entregas, y no se almacenan más allá del tiempo necesario para la operación.</li>
        <li><strong>Política de Reembolsos:</strong> En caso de que la entrega no se realice dentro del rango horario reservado por causas imputables al servicio, se procederá con un reembolso completo. No se realizan reembolsos por causas ajenas al servicio, como la inaccesibilidad del balcón, la ausencia del receptor o cualquier otra circunstancia fuera de nuestro control.</li>
      </ul>
    </div>
  );
};

export default Politicas;
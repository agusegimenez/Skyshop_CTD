import React, { useContext, useEffect, useState } from 'react'
import customCss from "./AñadirProd.module.css"
import axios from 'axios';
import { BotonContext } from '../Context/Context';
import { useParams } from 'react-router-dom';
import { productos } from '../utils/products';

const EditProd = () => {
    const { id } = useParams(); // id de producto
    const producto = productos.find((prod) => prod.id == id); // producto encontrado en array por id
    const [productName, setProductName] = useState(producto.nombre || "");
    const [productDescription, setProductDescription] = useState(producto.contenido || "");
    const [productPrice, setProductPrice] = useState(producto.precio || "");
    const [selectedCategorie, setSelectedCategorie] = useState(producto.categoria || ""); // estado que guarda la categoria seleccionada
    const [images, setImages] = useState([]); // estado que guarda las imagenes subidas al navegador
    const [imgFiles, setImgFiles] = useState([]); // estado que guarda las imagenes en formato archivo
    const [imagesCloudUrls, setImagesCloudUrls] = useState(producto.imagenes || []); // estado q guarda el link de la url de la imagen en Cloudinary
    const [error, setError] = useState(false);
    const [selectedCharacteristics, setSelectedCharecteristics] = useState(producto.caracteristicas || []); // estado que guarda las caracteristicas seleccionadas
    const {loggedUser} = useContext(BotonContext);
    const [isMobile, setIsMobile] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const eliminarImagenCloud = (index) => {
        const nuevasUrls = imagesCloudUrls.filter((_, i) => i !== index);
        setImagesCloudUrls(nuevasUrls);
    
        // Una vez eliminada, recalcula el total de imágenes
        const totalImages = imgFiles.length + nuevasUrls.length;
    
        if (totalImages >= 4) {
            alert("Puedes subir hasta 4 imágenes en total.");
        }
    };

    const isAdmin = () => {
      let response;
      if(loggedUser.role == "ADMIN"){
          response = true;
      }else{
          response = false;
      }
      return response;
  }

  useEffect(() => {
      const handleResize = () => {
          if (window.innerWidth < 1024) {
              setIsMobile(true);
              setShowPopup(true); 
          } else {
              setIsMobile(false);
              setShowPopup(false); 
          }
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, [loggedUser]);

  const closePopup = () => {
    window.location.reload(); 
};

if(loggedUser === null){
  return <div className={customCss.ifNotAdminDiv}>
  <h3>Usted ni siquiera está logueado como usuario. ¡Fuera!</h3>
  {isMobile && showPopup && (
      <div className={customCss.popupOverlay}>
          <div className={customCss.popup}>
              <p className={customCss.warning}>No puede acceder a esta función desde este dispositivo</p>
              <p>Ingrese desde un ordenador para acceder al Panel de Admin.</p>
              <button className={customCss.acceptButton} onClick={closePopup}>Aceptar</button>
          </div>
      </div>
  )}
</div>
}

const handleButtonClick = (option) => {
  if (isMobile) {
      setShowPopup(true); 
  } else {
      setSelectedOption(option); 
  }
};

    const resetForm = () => {
      setProductName("");
      setProductDescription("");
      setProductPrice("");
      setSelectedCategorie("");
      setSelectedCharecteristics([]);
      setImages([]);
      setImgFiles([]);
      setImagesCloudUrls([]);
  };

  const handleImagenSubida = (e) => {
    const files = Array.from(e.target.files);

    // Calcular el total de imágenes después de eliminar
    const totalImages = files.length + imgFiles.length + imagesCloudUrls.length;

    // Si supera las 4 imágenes, muestra la alerta
    if (totalImages > 4) {
        alert("Puedes subir hasta 4 imágenes en total.");
        return;
    }

    // Añadir las nuevas imágenes a los estados correspondientes
    setImgFiles(prevFiles => [...prevFiles, ...files]);
    const nuevasImagenes = files.map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...nuevasImagenes]);
  };

  const eliminarImagen = (index) => {
    const nuevasImagenes = images.filter((_, i) => i !== index);
    const nuevosArchivos = imgFiles.filter((_, i) => i !== index);
    setImages(nuevasImagenes);
    setImgFiles(nuevosArchivos);
};

useEffect(() => {
    // Calcular el total de imágenes cada vez que cambien las imágenes o archivos
    const totalImages = imgFiles.length + imagesCloudUrls.length;
    if (totalImages > 4) {
        alert("Puedes subir hasta 4 imágenes en total.");
    }
}, [imgFiles, imagesCloudUrls]);

  // subida de imagen a Cloudinary
  // (implementacion cuando se pueda agregar productos al back-end)
  const uploadImageToCloudinary  = async (files) => {
    const urls = [];
    for(const file of files){
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'x1kdwphk');
      try{
        const response = await axios.post('https://api.cloudinary.com/v1_1/dqeczcnjq/image/upload', formData);
        urls.push(response.data.secure_url);
      }catch(error){
        console.error("Error uploading image:", error);
        urls.push(null);
      }
    }
    return urls;
  };

  const handleCharacteristics = (e) => {
      const value = e.target.value;
      if(selectedCharacteristics.includes(value)){
        setSelectedCharecteristics(selectedCharacteristics.filter((item) => item !== value));
      }else{
        setSelectedCharecteristics([...selectedCharacteristics, value]);
      }
  }
    
  const handleSubmit = async (e) => {
      e.preventDefault();
      if(productName.trim() === "") {
          setError(true);
      }else {
          setError(false);
          let urls = [];
          // se ejecuta subida de img a Cloudinary si no hay errores y si hay imagenes seleccionadas
          if(imgFiles.length > 0){
            urls = await uploadImageToCloudinary(imgFiles);
            if (urls) {
              setImagesCloudUrls(urls);
            } else {
              console.error("Error uploading image");
              return;
            }
          }
          // cambiar esto con POST a API
          console.log('Producto guardado', { productName, productDescription, productPrice, selectedCategorie, selectedCharacteristics, imagesCloudUrls });
          //limpiar los inputs si se guardo bien el producto
          resetForm();
      }
  }

  if(isAdmin()){
  return (
    <>
     <form onSubmit={handleSubmit} className={`${customCss.productForm} ${showPopup ? customCss.blur : ''}`}>
            <h2>Datos del Producto</h2>
            <label>Imagenes actuales: </label>
            <div className={customCss.imgPreview}>
                {/* Vista previa de imágenes */}
                {imagesCloudUrls.map((image, index) => (
                  <img key={index} src={image} className={customCss.imgThumbnail} onClick={() => eliminarImagenCloud(index)} alt={`preview-${index}`} />
                ))}
                {/* Botón para agregar más imágenes */}
            </div>

            {/* Vista previa de imágenes nuevas */}
            <label>Imágenes Nuevas:</label>
                <div className={customCss.imgPreview}>
                    {images.map((image, index) => (
                        <img key={index} src={image} className={customCss.imgThumbnail} onClick={() => eliminarImagen(index)} alt={`preview-${index}`} />
                    ))}
                    <label className={customCss.addImage}>
                        <input 
                            type="file" 
                            accept="image/*"
                            multiple  
                            onChange={handleImagenSubida} 
                            style={{ display: 'none' }} 
                        />
                        <div className={customCss.plusIcon}>+</div>
                    </label>
                </div>
        {/* Campo de nombre con validación */}
        <label>Nombre:</label>
        <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className={`${customCss.nombre} ${error ? customCss.errorInput : ''}`}
        />
        {error && (
            <p className={customCss.errorMensaje}>
              El nombre del producto ya esta en uso, coloque un nombre diferente
            </p>
      )}

      {/* Campo de descripción */}
      <label className={customCss.descripcion}>Descripción:</label>
      <text className={customCss.errorMensaje} style={{color: "#00843d"}}>
        Separar con comas cada item que contenga el Paquete. Ej: Doritos, Lay´s, Pringles
      </text>
      <textarea
      className={customCss.textArea}
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
      ></textarea>


      {/* Campo de categorías */}
      <label>Categoría:</label>
      <div className={customCss.categories}>
        <div className={customCss.caracteristicas}>
        {['Alimentos', 'Higiene', 'Diversion', 'Mascotas', 'Perros'].map((category) => (
          <label key={category}>
            <input
            type="radio"
            name="categoria"
            value={category}
            checked={selectedCategorie == category}
            onChange={() => setSelectedCategorie(category)}
            />
            <div>
                <div className={customCss.customRadio} style={{color: "green"}}>{ selectedCategorie == category && "✔"}</div>
              <img src={`/caracteristica_${category.toLowerCase()}.png`} alt={`${category}-logo`} />
            </div>
              {category}
          </label>
        ))}
        </div>
      </div>

      {/* campo de caracteristicas */}
      <label>Características:</label>
      <div className={customCss.categories}>
        <div className={customCss.caracteristicas}>
        {['Alimentos', 'Higiene', 'Diversion', 'Mascotas', 'Perros'].map((characteristic) => (
          <label key={characteristic} onClick={(e) => e.stopPropagation()}>
            <input
            type="radio"
            name="categoria"
            value={characteristic}
            checked={selectedCharacteristics.includes(characteristic)}
            onChange={handleCharacteristics}
            />
            <div>
            <button type="button" className={customCss.customRadio} style={{color: "green"}}
              onClick={(event) => {
                event.preventDefault(); // Evita que se seleccione el input
                handleCharacteristics({ target: { value: characteristic } });
              }}>{selectedCharacteristics.includes(characteristic) && "✔"}</button>
              <img src={`/caracteristica_${characteristic.toLowerCase()}.png`} alt={`${characteristic}-logo`} />
            </div>
              {characteristic}
          </label>
        ))}
        </div>
      </div>


       {/* Campo de precio */}
       <label>Precio:</label>
      <input
        type="number"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
        className={customCss.precio}
      />

        {/* Botón de guardar */}
        <button type="submit" className={customCss.buttonSubmit}>Guardar producto</button>
    </form>
    {showPopup && (
      <div className={customCss.popupOverlay}>
          <div className={customCss.popup}>
              <p className={customCss.warning}>No puede acceder a esta función desde este dispositivo</p>
              <p>Ingrese desde un ordenador para acceder al Panel de Admin.</p>
              <button className={customCss.acceptButton} onClick={closePopup}>Aceptar</button>
          </div>
      </div>
  )}
    </>
  )
}else {
  return (
    <div className={customCss.ifNotAdminDiv}>
                <h3>¡Para tener acceso a a la funcionalidad admin debes estar logeado con un usuario que cuente con el rol ADMIN!</h3>
                {isMobile && showPopup && (
                    <div className={customCss.popupOverlay}>
                        <div className={customCss.popup}>
                            <p className={customCss.warning}>No puede acceder a esta función desde este dispositivo</p>
                            <p>Ingrese desde un ordenador para acceder al Panel de Admin.</p>
                            <button className={customCss.acceptButton} onClick={closePopup}>Aceptar</button>
                        </div>
                    </div>
                )}
            </div>
  )
}
}

export default EditProd
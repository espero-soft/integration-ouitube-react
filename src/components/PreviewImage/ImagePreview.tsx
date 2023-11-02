/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 02/11/2023 07:39:52
*/
import React, { useState } from 'react';
import { Button, Modal, Carousel } from 'react-bootstrap';

interface ImagePreviewProps {
  images: string[]; // Tableau de chemins d'image
  onClose: () => void; // Fonction de fermeture
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ images, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleShow = (index: number) => {
    setCurrentImageIndex(index);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    onClose(); // Appeler la fonction de fermeture lorsque le modal est fermé
  };


  return (
    <div>
     
      <Modal size='lg' centered show={!!images.length} onHide={handleClose}>
        <Modal.Body>
          <Carousel
            interval={null} // Désactive le défilement automatique
            activeIndex={currentImageIndex}
            onSelect={(index) => setCurrentImageIndex(index)}
          >
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  src={image}
                  alt={`Image ${index}`}
                  className="img-fluid"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ImagePreview;

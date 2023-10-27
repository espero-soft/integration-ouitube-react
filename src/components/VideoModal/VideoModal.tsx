/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 27/10/2023 11:31:47
*/
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const VideoModal: React.FC<{ show: boolean, videoUrl: string, onHide: () => void }> = ({ show, videoUrl, onHide }) => {
  return (
    <Modal show={true} centered onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Lecture vidéo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="embed-responsive embed-responsive-16by9 iframe-container">
          <iframe
          width="100%"
          height="460px"
          className="embed-responsive-item" src={videoUrl} allowFullScreen title="Video Player"></iframe>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VideoModal;


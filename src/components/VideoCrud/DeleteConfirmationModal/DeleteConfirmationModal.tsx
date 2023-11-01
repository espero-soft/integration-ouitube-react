/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 27/10/2023 11:14:20
*/
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


const DeleteConfirmationModal: React.FC<{video: any, onDelete: () => void, onCancel: () => void }> = ({ video, onDelete, onCancel }) => {
  return (
    <Modal show={true} centered onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation de suppression</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Êtes-vous sûr de vouloir supprimer cet élément : {video?.name} ?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Annuler
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Supprimer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
/*
  Author: Mudey Formation
  Website: https://mudey.fr/
  App Name: E-commerce with React.Js
  Created At: 31/10/2023 14:43:45
*/

import React, { FC, useEffect, useState } from 'react';
import './ManageVideoModal.css';
import { Video } from '../../../models/Video';
import { Button, Form, Modal } from 'react-bootstrap';
import VideoPlayer from '../../VideoPlayer/VideoPlayer';
import { generateFileUrl } from '../../../helpers/utils';
import { addVideos, updateVideos } from '../../../api/api-video';

interface ManageVideoModalProps {
  video?: Video | null;
  showModal: boolean;
  setShowModal: (bool: boolean) => void;
  reloadVideo: () => void;
}

const ManageVideoModal: FC<ManageVideoModalProps> = ({ video, showModal, setShowModal,reloadVideo }) => {
  const [formValues, setFormValues] = useState<Video>(
    video || { name: '', description: '', uniqueCode: '', created_at: new Date(), updated_at: new Date() }
  );
  const [fileData, setFileData] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<any>(null);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // window.scrollTo(0, 0);

    const runLocalData = async () => {
      setProgress(0)
      if (video) {
        setFormValues(video);
        setFileUrl(`https://api.ouitube.fr/videos/${video?.uniqueCode}`);
      }
    };
    runLocalData();
  }, [video]);

  const handleClose = async () => {
    setFormValues({
      name: '',
      description: '',
      uniqueCode: '',
      created_at: new Date(),
      updated_at: new Date(),
    });
    setShowModal(false);
    setFileData(null);
    setFileUrl(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Save or update the video (you should implement this part)
    if (video) {
      // Update video
      // Call your update API with formValues
      let formData: FormData | Video;

      const newVideo: Video = {
        name: formValues.name,
        description: formValues.description,
        uniqueCode: video.uniqueCode,
        updated_at: new Date(),
      };

      if (fileData) {
        formData = new FormData();
        formData.append('video', JSON.stringify(newVideo));
        formData.append('videoFile', fileData);
      } else {
        formData = newVideo;
      }

      await updateVideos(video.uniqueCode, formData, setProgress);
    } else if (fileData) {
      // Add video
      // Call your create API with formValues
      const formData = new FormData();

      const newVideo = {
        name: formValues.name,
        description: formValues.description,
        create_at: new Date(),
      };

      formData.append('video', JSON.stringify(newVideo));
      formData.append('videoFile', fileData);

      await addVideos(formData, setProgress);
    }

    setFileData(null);
    setFileUrl(null);
    handleClose();
    setProgress(0)
    reloadVideo()
  };

  const handleSetFile = async (file: File) => {
    try {
      const url: string = await generateFileUrl(file);
      setFileUrl(url);
      setFileData(file);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div className="ManageVideoModal">
      <Modal show={showModal} size="lg" scrollable centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {video ? 'Edit Video' : 'Add Video'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="error">{error.message}</div>}

          <Form>
            {/* Add form fields for video details */}
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={formValues.name}
                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={formValues.description}
                className="mb-1"
                onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
              />
            </Form.Group>
            {fileUrl && (
              <Form.Group controlId="formVideo">
                <VideoPlayer videoUrl={fileUrl} />
              </Form.Group>
            )}
            <Form.Group controlId="formVideo">
              <Form.Label>Video</Form.Label>
              <Form.Control
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files ? e.target.files[0] : null;
                  if (file) {
                    handleSetFile(file);
                  }
                }}
              />
            </Form.Group>
            {
              !!progress && (
                <div className="progress mt-2">
                  <div className="progress-bar progress-bar-striped bg-success" role="progressbar"
                    style={{ width: progress + '%' }} aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} />
                </div>
              )
            }

          </Form>
        </Modal.Body>
        {
          !progress ?
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {video && formValues.name && formValues.description && (
              <Button variant="primary" onClick={handleSave}>
                Update
              </Button>
            )}
            {!video && formValues.name && formValues.description && fileData && (
              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
            )}
          </Modal.Footer>
          :
          null
        }
      </Modal>
    </div>
  );
};

export default ManageVideoModal;

/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 26/10/2023 23:31:29
*/
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { addVideos, deleteVideo, getVideos, updateVideos } from '../../api/api-video';
import { generateFileUrl } from '../../helpers/utils';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
import VideoModal from '../VideoModal/VideoModal';

interface Video {
  _id?: string;
  name: string;
  description: string;
  uniqueCode: string;
  posterFiles?: any[],
  created_at: Date;
  updated_at: Date;
}

const VideoCrud: React.FC = () => {

  const [videos, setVideos] = useState<Video[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<any>(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [formValues, setFormValues] = useState<Video>({ name: '', description: '', uniqueCode: '', created_at: new Date(), updated_at: new Date() });
  const [fileData, setFileData] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<any>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  // Mock function to load videos (you should replace it with your API call)
  const loadVideos = async () => {
    // Fetch videos and set them to the videos state
    const data = await getVideos(1, 60)
    if (data.isSuccess) {
      console.log(data);
      setVideos(data.results)
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const handleAdd = () => {
    setFormValues({ name: '', description: '', uniqueCode: '', created_at: new Date(), updated_at: new Date() });
    setShowAddModal(true);
  };

  const handleEdit = (video: Video) => {
    setFormValues(video);
    setSelectedVideo(video);
    setShowEditModal(true);
  };

  const handleSave = async (e: any) => {
    e.preventDefault()
    // Save or update the video (you should implement this part)
    if (selectedVideo) {
      // Update video
      // Call your update API with formValues
      let formData
      const video = {
        name: formValues.name,
        description: formValues.description,
        updated_at: new Date()
      }
      if (fileData) {
        formData = new FormData();
        formData.append('video', JSON.stringify(video))
        formData.append('videoFile', fileData)

      } else {
        formData = video
      }


      await updateVideos(selectedVideo.uniqueCode, formData)

    } else if (fileData) {
      // Add video
      // Call your create API with formValues
      const formData = new FormData();

      const video = {
        name: formValues.name,
        description: formValues.description,
        create_at: new Date()
      }
      formData.append('video', JSON.stringify(video))
      formData.append('videoFile', fileData)
      await addVideos(formData)

    }
    console.log({ formValues });

    setShowAddModal(false);
    setShowEditModal(false);
    loadVideos(); // Reload videos after adding or updating
  };

  const handleSetFile = async (file: File) => {
    try {
      const url: string = await generateFileUrl(file)
      setFileUrl(url)
      setFileData(file)

    } catch (error) {
      setError(error)
    }
  }

  const handleDelete = (video: Video) => {
    // Delete the video (you should implement this part)
    // Call your delete API with video._id
    setShowDeleteModal(video)
    // loadVideos(); // Reload videos after deleting
  };
  const confirmDelete = () => {
    // Delete the video (you should implement this part)
    // Call your delete API with video._id
    deleteVideo(showDeleteModal.uniqueCode)
    setShowDeleteModal(false)
    loadVideos(); // Reload videos after deleting
  };
  const openVideoModal = (video: any) => {
    setCurrentVideo(video)
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
  };



  return (
    <div className='container pt-3'>
      <Button onClick={handleAdd}>Add Video</Button>
      {
        showDeleteModal ?
          <DeleteConfirmationModal
            video={showDeleteModal}
            onCancel={() => setShowDeleteModal(false)}
            onDelete={confirmDelete}
          />
          :
          null
      }
      {
        showVideoModal && currentVideo ?
        <VideoModal
          show={showVideoModal}
          videoUrl={"https://api.ouitube.fr/videos/" + currentVideo?.uniqueCode} // Remplacez par l'URL de votre vidéo
          onHide={closeVideoModal}
        />
        :
        null
      }
      <table className="table">
        <thead>
          <tr>
            <th>N°</th>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video, index) => (
            <tr key={video._id}>
              <td>{index + 1}</td>
              <td>
                <img src={video?.posterFiles?.[0]} width={100} />
              </td>
              <td>{video.name}</td>
              <td>{video.description}</td>
              <td className='d-flex'>
                <div className="m-1">
                  <Button variant="success" onClick={() => openVideoModal(video)}>View</Button>

                </div>
                <div className="m-1">
                  <Button onClick={() => handleEdit(video)}>Edit</Button>

                </div>
                <div className="m-1">
                  <Button variant="danger" onClick={() => handleDelete(video)}>
                    Delete
                  </Button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showAddModal} size='lg' scrollable centered onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && (<div className="error">${error.message}</div>)}

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
                className='mb-1'
                onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
              />

            </Form.Group>
            {fileUrl && (
              <Form.Group controlId="formVideo">
                <video src={fileUrl} controls width="100%"></video>
              </Form.Group>
            )}
            <Form.Group controlId="formVideo">
              <Form.Label>Video</Form.Label>
              <Form.Control
                type="file"
                onChange={(e: any) => handleSetFile(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          {formValues.name && formValues.description && fileData && (
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>

          )}
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} size='lg' scrollable centered onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && (<div className="error">${error.message}</div>)}
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
                onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
              />
            </Form.Group>
            {fileUrl && (
              <Form.Group controlId="formVideo">
                <video src={fileUrl} controls width="100%"></video>
              </Form.Group>
            )}
            <Form.Group controlId="formVideo">
              <Form.Label>Video</Form.Label>
              <Form.Control
                type="file"
                onChange={(e: any) => handleSetFile(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VideoCrud;

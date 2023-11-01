/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 26/10/2023 23:31:29
*/
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { addVideos, deleteVideo, getVideos, searchVideos, updateVideos } from '../../api/api-video';
import { generateFileUrl } from '../../helpers/utils';
import DeleteConfirmationModal from './DeleteConfirmationModal/DeleteConfirmationModal';
import ViewVideoModal from './ViewVideoModal/ViewVideoModal';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { Video } from '../../models/Video';
import ManageVideoModal from './ManageVideoModal/ManageVideoModal';
import Pagination from './Pagination/Pagination';
import { getTag } from '../../redux/selectors/selector';
import { useSelector } from 'react-redux';
import DataPerPage from '../DataPerPage/DataPerPage';


const VideoCrud: React.FC = () => {

  const [data, setData] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<any>(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage, setVideosPerPage] = useState((window as any).localStorage.getItem('perPage') || 5);

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const tag = useSelector(getTag)

  // Mock function to load videos (you should replace it with your API call)
  const loadVideos = async () => {
    // Fetch videos and set them to the videos state
    const data = await searchVideos(tag, currentPage, videosPerPage)
    if (data.isSuccess) {
      setData(data)
    }
  };

  useEffect(() => {
    loadVideos();
    (window as any).localStorage.setItem('perPage', videosPerPage)
    setVideosPerPage((window as any).localStorage.getItem('perPage'))
  }, [currentVideo, videosPerPage, currentPage, tag]);

  const handleAdd = () => {
    // setFileUrl(null)
    // setFormValues({ name: '', description: '', uniqueCode: '', created_at: new Date(), updated_at: new Date() });
    setSelectedVideo(null)
    setShowAddModal(true);
    setShowEditModal(false);
  };

  const handleEdit = (video: Video) => {
    // setFileUrl("https://api.ouitube.fr/videos/" + video?.uniqueCode)
    // setFormValues(video);
    setSelectedVideo(video);
    setShowEditModal(true);
    setShowAddModal(false)
  };



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

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data?.allCount / videosPerPage); i++) {
    pageNumbers.push(i);
  }







  return (
    <div className='container pt-3'>
      <Button className='shadow' onClick={handleAdd}>Add Video</Button>
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
          <ViewVideoModal
            show={showVideoModal}
            videoUrl={"https://api.ouitube.fr/videos/" + currentVideo?.uniqueCode} // Remplacez par l'URL de votre vidéo
            onHide={closeVideoModal}
          />
          :
          null
      }
      {
        setShowEditModal || setShowAddModal ?
          <ManageVideoModal
            video={selectedVideo ? selectedVideo : null}
            setShowModal={selectedVideo ? setShowEditModal : setShowAddModal}
            showModal={selectedVideo ? showEditModal : showAddModal}
            reloadVideo={loadVideos}
          />
          :
          null
      }
      <div className='d-flex gap-1 align-item-center justify-content-end'>

        <DataPerPage
          videosPerPage={videosPerPage}
          setVideosPerPage={setVideosPerPage}
        />
        {
          pageNumbers.length > 1 ?
            <Pagination
              currentPage={currentPage}
              pageNumbers={pageNumbers}
              handleSelect={setCurrentPage}
            />
            :
            null
        }
      </div>
      {
        tag && (
          <p> <strong>{data?.results?.length}</strong> Search result{data?.results?.length > 1 ? "s" : ""} for the keyword <strong>{tag}</strong> </p>
        )
      }
      {
        data?.results?.length ?
          <table className="table table-bordered shadow">
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
              {data?.results.map((video: Video, index: number) => (
                <tr key={video._id}>
                  <td>{data?.allCount - ((currentPage - 1) * videosPerPage) - index}</td>
                  <td>
                    <img onClick={() => openVideoModal(video)} className='shadow' src={video?.posterFiles?.[0]} width={100} />
                  </td>
                  <td>{video.name}</td>
                  <td>{video.description}</td>
                  <td>
                    <div className="d-flex h-100 justify-content-center  align-items-center gap-1">

                      <Button className='shadow' variant="success" onClick={() => openVideoModal(video)}>View</Button>

                      <Button className='shadow' onClick={() => handleEdit(video)}>Edit</Button>

                      <Button className='shadow' variant="danger" onClick={() => handleDelete(video)}> Delete </Button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          :
          null
      }
      <div className='d-flex gap-1 align-item-center justify-content-end'>

        {/* <DataPerPage
          videosPerPage={videosPerPage}
          setVideosPerPage={setVideosPerPage}
        /> */}
        {
          pageNumbers.length > 1 ?
            <Pagination
              currentPage={currentPage}
              pageNumbers={pageNumbers}
              handleSelect={setCurrentPage}
            />
            :
            null
        }
      </div>
    </div>
  );
};

export default VideoCrud;

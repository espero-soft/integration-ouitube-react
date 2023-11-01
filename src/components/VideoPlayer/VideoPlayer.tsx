/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 31/10/2023 14:06:40
*/
import React, { FC, useEffect } from 'react';
import './VideoPlayer.css';


interface VideoPlayerProps {
  videoUrl: string
}


const VideoPlayer: FC<VideoPlayerProps> = ({videoUrl}) => {



  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  })

  return (
    <div className="VideoPlayer">
    <div
      className="embed-responsive embed-responsive-16by9"
      style={{
        position: "relative",
        height: "0",
        paddingBottom: "56.25%", // Rapport d'aspect 16:9 (9 / 16 = 0.5625)
        overflow: "hidden", // Masquer les barres de défilement
      }}
    >
      <iframe
        className="embed-responsive-item"
        src={videoUrl}
        allowFullScreen
        title="Video Player"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "103%",
        }}
      ></iframe>
    </div>
  </div>
  );
}

export default VideoPlayer;
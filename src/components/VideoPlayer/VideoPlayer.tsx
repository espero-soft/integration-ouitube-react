/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 31/10/2023 14:06:40
*/
import React, { FC, useEffect } from 'react';
import './VideoPlayer.css';
import { OuitubePlayer } from 'ouitube-player';


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
      <OuitubePlayer
          src={videoUrl}
      />
  </div>
  );
}

export default VideoPlayer;
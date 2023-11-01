/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 01/11/2023 10:24:42
*/
import React, { FC, useEffect } from 'react';
import './DataPerPage.css';


interface DataPerPageProps {
  videosPerPage: number
  setVideosPerPage: (value: number) => void
}


const DataPerPage: FC<DataPerPageProps> = ({ videosPerPage, setVideosPerPage }) => {



  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  },[videosPerPage])

  return (
    <div className="DataPerPage  pt-2 pb-2">
      <select defaultValue={videosPerPage} onChange={(e: any) => setVideosPerPage(e.target.value)} className='form-control' name="" id="">
        <option >5</option>
        <option >10</option>
        <option >20</option>
      </select>
    </div>
  );
}

export default DataPerPage;
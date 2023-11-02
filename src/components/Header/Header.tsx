/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 01/11/2023 08:49:15
*/
import React, { FC, useEffect } from 'react';
import './Header.css';
import SearchVideoForm from '../SearchVideoForm/SearchVideoForm';

interface HeaderProps {

}


const Header: FC<HeaderProps> = () => {


  
  

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  })

  return (
    <div className="Header shadow sticky-top">
      <header className="py-3 mb-3 border-bottom position-sticky-top">
        <div className="container-fluid d-grid gap-3 align-items-center" style={{ gridTemplateColumns: '1fr 2fr' }}>
          <div className="">
            <a href="#" className="d-flex align-items-center col-lg-4 mb-2 mb-lg-0 link-dark text-decoration-none">
              API Ouitube
            </a>
           
          </div>
          <div className="d-flex align-items-center">
            <SearchVideoForm/>
          </div>
        </div>
      </header>


    </div>
  );
}

export default Header;
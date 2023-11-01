/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 01/11/2023 09:00:52
*/
import React, { FC, useEffect } from 'react';
import './SearchVideoForm.css';
import { useDispatch } from "react-redux";
import { SET_DATA } from '../../redux/genericReducer';


interface SearchVideoFormProps {

}


const SearchVideoForm: FC<SearchVideoFormProps> = () => {

  
  const displatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  })

  const handleChange = (event: any) =>{
    const {value} = event.target
    displatch({
      type: SET_DATA,
      data: value
    })
    
  }

  return (
      <form className="w-100 me-3">
        <input onChange={handleChange} type="search" className="form-control" placeholder="Search videos ..." aria-label="Search" />
        {/* <div className="btn btn-success shadow">Search</div> */}
      </form>
  );
}

export default SearchVideoForm;
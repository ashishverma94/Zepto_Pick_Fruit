import React from 'react'
import './chipCardOption.css' ;

const ChipCardOptions = ({url = "",userName = "",email = ""}) => {
  const imgUrl = url ;
  return (
    <div className='chip-card-option'>
      <div className='left'>
      <img src = {imgUrl} height="30px" width = "30px" alt = "img"/>
      
      </div>
      <div className='middle'>
      <span className='name'>{userName}</span>
      </div>
      <span className='email'>{email}</span>
    </div>
  )

}

export default ChipCardOptions
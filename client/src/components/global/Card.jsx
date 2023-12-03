import React from 'react'
import { AccessAlarm, FavoriteOutlined } from '@mui/icons-material'

function Card() {
  return (
    <div className='card'>
        <img className='card__image'></img>
        <div className='card__left'>
            <h3 className='card__title'>Title</h3>
            <div className='card__metadata'>
                <p>Company Name</p>
                <div className='dot'></div>
                <p>Category</p>
            </div>
            <div className='card__date'>
                <AccessAlarm />
                <p>2 days left</p>
            </div>
        </div>
        <FavoriteOutlined />
    </div>
  )
}

export default Card
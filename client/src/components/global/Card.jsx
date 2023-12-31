import React from 'react'
import { AccessAlarm, FavoriteOutlined } from '@mui/icons-material'

function Card({ data }) {
  return (
    <div className='card'>
        {/* <img className='card__image' alt='card' src={data.image.includes("data") ? "https://www.rd.com/wp-content/uploads/sites/2/2016/01/01-statue-of-liberty-facts.jpg" : data.image}/> */}
        <img className='card__image' alt='card' src={data.image}/>
        <div className='card__left'>
            <h3 className='card__title'>GET {data.percentoff}</h3>
            <div className='card__metadata'>
                <p>{data.title}</p>
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

export default Card;
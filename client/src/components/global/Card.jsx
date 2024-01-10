import React from 'react'
import { FavoriteOutlined } from '@mui/icons-material'
import '../../assets/css/card.css'

function Card({ data }) {
  return (
    <div className='card-container'>
      <a className='card' id={data.id} href={data.link} target='_blank' rel="noreferrer">
          {/* <img className='card__image' alt='card' src={data.image.includes("data") ? "https://www.rd.com/wp-content/uploads/sites/2/2016/01/01-statue-of-liberty-facts.jpg" : data.image}/> */}
          <img className='card__image' alt='card' src={data.image}/>
          <div className='card__left'>
            <h3 className='card__title'>GET {data.percentoff}</h3>
            <div className='card__metadata'>
              <p>{data.title}</p>
            </div>
          </div>
          <FavoriteOutlined className='card__favorite-icon' />
      </a>
    </div>
  )
}

export default Card;
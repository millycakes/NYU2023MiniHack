import React from 'react'
import marker from '../../assets/marker.svg'

function Marker({text}) {
  return (
    <div className='marker'>
        <img src={marker}/>
        <div className='marker__chip'>
            <p className='marker__text bold'>{text} off</p>
        </div>
    </div>
  )
}

export default Marker
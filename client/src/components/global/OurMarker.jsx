import React from 'react'
import marker from '../../assets/marker.svg'

export default function OurMarker({text, clickfunc}) {
  return (
    <div className='marker' onClick={() => clickfunc()}>
        <div className='marker__chip'>
          <p className='marker__text bold'>{text}</p>
        </div>
        <img src={marker}/>
    </div>
  )
}
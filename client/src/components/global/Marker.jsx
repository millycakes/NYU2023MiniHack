import React from 'react'
import marker from '../../assets/marker.svg'

function Marker() {
  return (
    <div className='marker'>
        <img src={marker}/>
        {/* <div className='marker__chip'>
            <p className='bold'>20% off</p>
        </div> */}
    </div>
  )
}

export default Marker
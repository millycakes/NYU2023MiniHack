import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { calculate, toastPromise } from '../../GlobalFunctions';
import '../../assets/css/popup.css'
import 'reactjs-popup/dist/index.css';

export default function DiscountCalculator({ open, setOpen }) {
    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://deals-finder.herokuapp.com' : 'http://localhost:3001';
  const closeModal = () => setOpen(false);
  const [originalprice, setOriginalPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [calculated, setCalculated] = useState(null);
    

  return (
    <div>
      <Popup open={open} closeOnDocumentClick onClose={closeModal} className='flex flex-col items-start justify-start'>
        <h1>Discount Calculator</h1>
        {/* labels for Original Price and Discount */}
        <div className='flex flex-col'>
            <label for='originalPrice'>Original Price</label>
            <input type='number' id='originalPrice' placeholder='Original Price' value={originalprice} onChange={e => setOriginalPrice(e.target.value)}></input>
        </div>
        <div className='flex flex-col'>
            <label for='discount'>Discount</label>
            <input type='number' id='discount' placeholder='Discount' value={discount} onChange={e => setDiscount(e.target.value)}></input>
        </div>
        <button className=' mt-4' onClick={() =>
            toastPromise(new Promise(async (resolve, reject) => {
                // if (originalprice === 0 || discount === 0) {
                //     reject('Please enter a valid price and discount');
                // } else {
                //     // call calculate func
                //     let num = await fetch(baseUrl + '/calculate?totalnumber=' + originalprice + '&percentage=' + discount);
                //     console.log(num);
                //     setCalculated(num);
                //     resolve();
                // }
                setCalculated(50);
                resolve();
            }), 'Discount calculated!')
        }>
            Calculate
        </button>
        {calculated && (
            <p>You would save ${originalprice * discount * .01}! 🥳</p>
        )}
      </Popup>
    </div>
  );
};
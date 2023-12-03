import logo from '../../assets/logo.svg'
import { Share, Logout } from '@mui/icons-material'
import { useState } from 'react';
import DiscountCalculator from './DiscountCalculator';


export default function Header() {
    const [open, setOpen] = useState(false);
    return (
        <div className='header'>
            <div className='header__left'>
                <img src={logo}/>
            </div>
            <div className='header__right'>
                <p>John Doe</p>
                <p className='header__profile'>J</p>
                <Share />
                <div className='divider'></div>
                <p className='bold body-large'>💰 Saved deals: <span className='regular'>32</span></p>
                <div className='divider'></div>
                <button onClick={() => setOpen(true)}>
                    Discount Calculator
                </button>
                <div className='divider'></div>
                <Logout/>
            </div>
            <DiscountCalculator open={open} setOpen={setOpen} />        
        </div>
    );
}
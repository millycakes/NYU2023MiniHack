import logo from '../../assets/logo.svg'
import { Share, Logout } from '@mui/icons-material'


export default function Header() {
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
                <button>Discount Calculator</button>
                <div className='divider'></div>
                <Logout/>
            </div>
        </div>
    );
}
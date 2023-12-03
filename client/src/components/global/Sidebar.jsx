import { useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App';
import { animated, useSpring } from 'react-spring';
import { Search, Close } from '@mui/icons-material'

import Card from './Card';
import '../../assets/css/Sidebar.css';

export default function Sidebar() {
    const [searchquery, setSearchQuery] = useState('');
    const [cards, setCards] = useState([1, 2, 3, 4, 5, 6, 7]);
    const location = useLocation(); // Get the current route location
    const navigate = useNavigate();

    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://deals-finder.herokuapp.com' : 'http://localhost:3001';

    // const props = useSpring({
    //     from: { 
    //         opacity: 0, 
    //         left: '-27vw',
    //     },
    //     to: { 
    //         opacity: 1, 
    //         left: '0vw',
    //     },
    // })

    async function getRestaurants() {
        const res = await fetch(`${baseUrl}?query=${searchquery}`);
        const data = await res.json();
        console.log(data);
        setCards(data);
    }

    return (
        <div className='sidebar'>
            <div className='search'>
                <input className='search__input' type='text' placeholder='Search'/>
                <Search />
                <Close />
            </div>
            <div className='sidebar__results'>
                <h2>Over 200 Results</h2>
                <button>Suggest Deals</button>
            </div>
            <div>
                {/* {cards.map((val, index) => (
                    <Card data={val} key={index} />
                ))} */}
            </div>
        </div>
    )
}
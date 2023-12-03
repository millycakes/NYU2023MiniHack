import { useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App';
import { animated, useSpring } from 'react-spring';
import { Search, Close } from '@mui/icons-material'

import Card from './Card';
import '../../assets/css/Sidebar.css';

export default function Sidebar() {
    const [searchquery, setSearchQuery] = useState('');
    const [cards, setCards] = useState([]);
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
        console.log("data:", data.filter((val) => Object.values(val).some((v) => v === null)));
        // filter data that has any value of its keys as null
        setCards(data.filter((val) => Object.values(val).some((v) => v === null)));
    }

    return (
        <div className="Frame20095 w-full sidebar" style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
            <div className='search flex flex-row' id='searchbar'>
                <input placeholder='Search' value={searchquery} onChange={(e) => setSearchQuery(e.target.value)} className="Search" />        
                <button onClick={() => getRestaurants()} id="searchbutton">
                    <Search />
                </button>
                <Close />
            </div>
            <div className='sidebar__results flex flex-row justify-between w-full'>
                <h2>Over 200 Results</h2>
                <button>Suggest Deals</button>
            </div>
            <div id='categories'>
                <button>Saved</button>
                <button>FREE</button>
                <button>Food</button>
                <button>Events</button>
                <button>Museums</button>
            </div>
            <div>
                {cards.length > 0 &&
                    <div className='flex flex-col gap-x-2 items-center justify-center'>
                        {cards.map((val, index) => (
                            <Card data={val} key={index} />
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}
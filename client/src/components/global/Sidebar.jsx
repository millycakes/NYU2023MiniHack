import { useState, useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App';
import { Search, Close, Bookmark, Restaurant, Celebration, Museum } from '@mui/icons-material'

import Card from './Card';
import '../../assets/css/Sidebar.css';

export default function Sidebar() {
    const [searchquery, setSearchQuery] = useState('');
    const [cards, setCards] = useState([]);
    const location = useLocation(); // Get the current route location
    const navigate = useNavigate();
    const [category, setCategory] = useState('');

    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://deals-finder.herokuapp.com' : 'http://localhost:3001';

    async function getRestaurants() {
        const res = await fetch(`${baseUrl}?query=${searchquery}` + ' ' + category);
        const data = await res.json();
        console.log("data:", data.filter((val) => Object.values(val).some((v) => v === null)));
        // filter data that has any value of its keys as null
        setCards(data.filter((val) => Object.values(val).some((v) => v === null)));
    }

    useEffect(() => {
        getRestaurants()
    }, [category]);
    

    return (
        <div className="sidebar">
            <div className='search'>
                <input placeholder='Search' value={searchquery} onChange={(e) => setSearchQuery(e.target.value)} className="search__input" />        
                <button onClick={() => getRestaurants()} id="searchbutton">
                    <Search />
                </button>
                <Close />
            </div>
            <div className='sidebar__results'>
                <h2>Over 200 Results</h2>
                <button>Suggest Deals</button>
            </div>
            <div className='categories'>
                <div className='chip'>
                    <Bookmark />
                    <p>Saved</p>
                </div>
                <div className='chip' onClick={() => setCategory("Food")}>
                    <Restaurant />
                    <p>Food</p>
                </div>
                <div className='chip' onClick={() => setCategory("Events")}>
                    <Celebration />
                    <p>Event</p>
                </div>
                <div className='chip' onClick={() => setCategory("Museum")}>
                    <Museum />
                    <p>Museum</p>
                </div>
            </div>
            <div>
                {cards.length > 0 &&
                    <div>
                        {cards.map((val, index) => (
                            <Card data={val} key={index} />
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}
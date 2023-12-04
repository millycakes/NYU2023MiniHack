import { useState, useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App';
import { Search, Close, Bookmark, Restaurant, Celebration, Museum } from '@mui/icons-material'
// import Select from 'react-select'

import Card from './Card';
import '../../assets/css/Sidebar.css';
import { toastPromise } from '../../GlobalFunctions';

export default function Sidebar() {
    const [searchquery, setSearchQuery] = useState('');
    const [cards, setCards] = useState([]);
    const location = useLocation(); // Get the current route location
    const navigate = useNavigate();
    const [category, setCategory] = useState('');

    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://deals-finder.herokuapp.com' : 'http://localhost:3001';

    async function getRestaurants() {
        const res = await fetch(`${baseUrl}?query=${searchquery + " " + category}`);
        const data = await res.json();
        // console.log("all data:", data);
        // exclude where title's empty and if percentoff is ""
        console.log("data:", data.filter((val) => val.title !== null && val.percentoff !== "" && val.percentoff !== null));
        // filter data that has any value of its keys as null
        setCards(data.filter((val) => val.title !== null && val.percentoff !== "" && val.percentoff !== null));
    }
    
    return (
        <div className="sidebar">
            <div className='search'>
                <input placeholder='Search' value={searchquery} onChange={(e) => setSearchQuery(e.target.value)} className="search__input" />        
                <button onClick={() => 
                    toastPromise(new Promise(async (resolve, reject) => {
                        await getRestaurants();
                        resolve();
                    }), "Searching...")}
                id="searchbutton">
                    <Search />
                </button>
                <Close />
            </div>
            <div className='sidebar__results'>
                <h2>Over 200 Results</h2>
                <button><a target='_blank' href='https://forms.gle/7EJ2HfczCcWRgcEi6'>Suggest Deals</a></button>
            </div>
            <div className='categories'>
                <button className='chip' onClick={() => setCategory("")}>
                    <Bookmark />
                    <p>Saved</p>
                </button>
                <button className={`chip ${category=="Food" ? 'active' : ''}`} onClick={() => setCategory("Food")}>
                    <Restaurant />
                    <p>Food</p>
                </button>
                <button className={`chip ${category=="Event" ? 'active' : ''}`} onClick={() => setCategory("Event")}>
                    <Celebration />
                    <p>Event</p>
                </button>
                <button className={`chip ${category=="Museum" ? 'active' : ''}`} onClick={() => setCategory("Museum")}>
                    <Museum />
                    <p>Museum</p>
                </button>
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
import { useState, useContext, useEffect, useRef, createRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App';
import { Search, Close, Bookmark, Restaurant, Celebration, Museum } from '@mui/icons-material'
import ContentLoader from "react-content-loader"
import Card from './Card';
import { toastPromise } from '../../GlobalFunctions';
import '../../assets/css/sidebar.css';


export default function Sidebar({ cards, setCards, focused }) {
    const [searchquery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('');

    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://deals-finder.herokuapp.com' : 'http://localhost:3001';

    useEffect(() => {
        console.log("focused:", focused);
        const focusedCard = document.getElementById(focused);
        console.log("focusedCard:", focusedCard);
        focusedCard?.scrollIntoView({ behavior: 'smooth', block: 'center' });

        if (focusedCard) {
            focusedCard.classList.add('flash');
            // setTimeout(() => {
            //     focusedCard.classList.remove('flash');
            // }, 2000);
        }
    }, [focused]);

    useEffect(() => {
        async function loadRest() {
            await getRestaurants();
        }
        loadRest();
    }, []);

    async function getRestaurants() {
        const res = await fetch(`${baseUrl}?query=${searchquery + " " + category}`);
        const data = await res.json();
        // console.log("all data:", data);
        // exclude where title's empty and if percentoff is ""
        let filtereddata = data.filter((val) => val.title !== null && val.percentoff !== "" && val.percentoff !== null);
        console.log("data:", filtereddata);
        // filter data that has any value of its keys as null
        setCards(filtereddata);
    }
    
    return (
        <div className="sidebar w-2/5">
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
            <div className='flex flex-col items-center justify-center'>
                {cards.length > 0 ?
                    <div>
                        {cards.map((val, index) => (
                            <Card data={val} key={index} />
                        ))}
                    </div>
                :
                    [0,1,2,3,4].map((val, index) => (
                        <ContentLoader 
                            speed={2}
                            width={210}
                            height={80}
                            viewBox="0 0 210 80"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"

                        >
                            <rect x="120" y="6" rx="3" ry="3" width="88" height="6" /> 
                            <rect x="123" y="24" rx="3" ry="3" width="85" height="6" /> 
                            <circle cx="280" cy="156" r="2" /> 
                            <rect x="6" y="14" rx="0" ry="0" width="94" height="50" /> 
                            <rect x="121" y="44" rx="3" ry="3" width="85" height="6" /> 
                            <rect x="122" y="62" rx="3" ry="3" width="85" height="6" />
                        </ContentLoader>
                    ))
                }
            </div>
        </div>
    )
}
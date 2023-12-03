import { useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App';
import { animated, useSpring } from 'react-spring';
import { ReactComponent as Search } from '../../assets/icons/search.svg';
import { ReactComponent as XIcon } from '../../assets/icons/x.svg';
import Card from './Card';
import '../../assets/css/Sidebar.css';

export default function Sidebar() {
    const [searchquery, setSearchQuery] = useState('');
    const [cards, setCards] = useState([]);
    const location = useLocation(); // Get the current route location
    const navigate = useNavigate();

    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://deals-finder.herokuapp.com' : 'http://localhost:3001';

    const props = useSpring({
        from: { 
            opacity: 0, 
            left: '-27vw',
        },
        to: { 
            opacity: 1, 
            left: '0vw',
        },
    })

    async function getRestaurants() {
        const res = await fetch(`${baseUrl}?query=${searchquery}`);
        const data = await res.json();
        console.log(data);
        setCards(data);
    }

    return (
        <animated.div className="Sidebar w-[274px] relative h-screen" style={props}>
            <div className="Rectangle2" style={{width: 268, opacity: 0.60, background: 'white'}} />
            <div className="Frame20098" style={{width: 232, left: 21, top: 90, position: 'absolute', flexDirection: 'column',
                justifyContent: 'flex-start', alignItems: 'flex-start', gap: 20, display: 'inline-flex', paddingBottom: '20px'
            }}>
                <div className="Frame20095 w-full" style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                    <div id='searchbar' className='flex flex-row'>
                        {/* <Search /> */}
                        <input placeholder='Search' value={searchquery} onChange={(e) => setSearchQuery(e.target.value)} className="Search" />
                        {/* <XIcon /> */}
                        <button onClick={() => getRestaurants()}>
                            <Search />
                        </button>
                    </div>
                    <div className='flex justify-between items-center w-full'>
                        <p className='font-bold text-lg'>Over 100 deals</p>
                        <button id='suggestbutton' className='text-sm font-bold'>Suggest Deals</button>
                    </div>
                    <div id='categories' className='flex items-center justify-evenly w-full'>
                        <button>Saved</button>
                        <button>FREE</button>
                        <button>Food</button>
                        <button>Events</button>
                        <button>Museums</button>
                    </div>
                    <div className='flex flex-col gap-x-2 items-center justify-center'>
                        {cards.map((val, index) => (
                            <Card data={val} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </animated.div>
    )
}
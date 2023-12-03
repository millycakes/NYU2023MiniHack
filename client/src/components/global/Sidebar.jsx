import { useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App';
import { animated, useSpring } from 'react-spring';
import { ReactComponent as Search } from '../../assets/icons/search.svg';
import { ReactComponent as XIcon } from '../../assets/icons/x.svg';

export default function Sidebar({ sidetabvisible, role }) {
    const [searchquery, setSearchQuery] = useState('');
    const [cards, setCards] = useState([]);
    const location = useLocation(); // Get the current route location
    const navigate = useNavigate();

    const props = useSpring({
        from: { 
            opacity: sidetabvisible ? 0 : 1, 
            left: sidetabvisible ? '-27vw' : '0vw',
        },
        to: { 
            opacity: sidetabvisible ? 1 : 0, 
            left: sidetabvisible ? '0vw' : '-27vw',
        },
    })

    return (
        <animated.div className="Sidebar w-[274px] relative" style={props}>
            <div className="Rectangle2" style={{width: 268, opacity: 0.60, background: 'white'}} />
            <div className="Frame20098" style={{width: 232, left: 21, top: 90, position: 'absolute', flexDirection: 'column',
                justifyContent: 'flex-start', alignItems: 'flex-start', gap: 20, display: 'inline-flex', paddingBottom: '20px'
            }}>
                <div className="Frame20095 w-full" style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                    <div>
                        <Search />
                        <input placeholder='Search' value={searchquery} onChange={(e) => setSearchQuery(e.target.value)} className="Search" />
                        <XIcon />
                    </div>
                    <div className='flex justify-between items-center w-full'>
                        <p>Over 100 deals</p>
                        <button>Suggest Deals</button>
                    </div>
                    <div className='flex items-center justify-evenly w-full'>
                        <button>Saved</button>
                        <button>FREE</button>
                        <button>Food</button>
                        <button>Events</button>
                        <button>Museums</button>
                    </div>
                    {/* <div className='flex flex-col gap-x-2 items-center justify-center'>
                        {cards.map((val, index) => (
                            <Card />
                        ))}
                    </div> */}
                </div>
            </div>
        </animated.div>
    )
}
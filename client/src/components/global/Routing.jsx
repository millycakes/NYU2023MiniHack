import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Home from '../../pages/Home/Home.js';
import SignupScreen from '../../pages/Signup/SignUpScreen.jsx';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import { useMediaQuery } from 'react-responsive'
import LoginScreen from '../../pages/Signup/LoginScreen.jsx';
import { animated, useSpring } from 'react-spring';
import { AuthContext } from '../../App.js';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase.js';

export default function Routing() {
  const [sidetabvisible, setTabVisible] = useState(true);
  const is1000 = useMediaQuery({ query: '(min-width: 1000px)' })
  const [imglink, setImgLink] = useState('https://cdn-icons-png.flaticon.com/512/64/64572.png');

  const {user, setUser} = useContext(AuthContext);

  useEffect(() => {
    console.log("user", user);
  }, [user])

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser); 
    return () => unsubscribe(); 
  }, [])

  const props = useSpring({
    from: { 
      left: sidetabvisible ? (is1000 ? '-17%' : '-26%') : '0vw',
      width: sidetabvisible ? '100%' : '97%'
    },
    to: {
      left: sidetabvisible ? '0vw' : (is1000 ? '-17%' : '-26%'),
      width: sidetabvisible ? '97%' : '100%'
    },
  })

  return (
    <BrowserRouter>
      {user && <Sidebar />}
      <animated.div className={`${user && 'relative'} pt-4`} style={props}>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/signin' element={<LoginScreen />} />
          {/* <Route exact path='/' element={<SignupScreen />} /> */}
        </Routes>
      </animated.div>
    </BrowserRouter>
  );
};
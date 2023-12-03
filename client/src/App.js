import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home'


function App() {
  return (
    <Routes>
        <Route path="/signup" element = {
          <Signup/>
        }/>
        <Route path = "/" element = {
          <Home/>
        }/>
    </Routes>
  );
}

export default App;

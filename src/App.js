import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';


import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
    <BrowserRouter> 

      <NavBar title="GeoLocation"/> 
      {/* I had to include NavBar inside BrowserRouter to use Link in that */}

        {/* 
        <Link to="/">Home</Link>
        <Link to="/about">About</Link> */}
 
      
      {/* Component to render here on particular path */}
      <Routes>
        <Route exact path="/" element={<Home/>}/>  
        <Route exact path="/about" element={<About/>} />  
      </Routes>
    
  </BrowserRouter>

  </>
  );
}

export default App;

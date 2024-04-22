import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import TheatresForMovie from './pages/TheatresForMovie'
import BookShow from './pages/BookShow';

import "./stylesheets/alignments.css"
import "./stylesheets/custom.css"
import "./stylesheets/form-elements.css"
import "./stylesheets/sizes.css"
import "./stylesheets/theme.css"
import ProtectedRoute from './components/ProtectedRoute';



function App() {
  return (
    <div className="App">
      <p> Movie Time </p>
      <BrowserRouter>
      <Routes>
        <Route path ="/" element={ <ProtectedRoute> <Home /></ProtectedRoute> } />
        <Route path ="/login" element={ <Login /> } />
        <Route path ="/register" element={ <Register /> } />
        <Route path ="/admin" element={ <ProtectedRoute><Admin/> </ProtectedRoute> } />
        <Route path ="/profile" element={ <ProtectedRoute><Profile/> </ProtectedRoute> } />
        <Route path ="/movie/:id" element={ <ProtectedRoute><TheatresForMovie /> </ProtectedRoute> } />
        <Route path ="/book-show/:showId" element={ <ProtectedRoute><BookShow /> </ProtectedRoute> } />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

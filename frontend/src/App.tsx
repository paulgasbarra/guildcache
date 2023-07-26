import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import {Home} from './pages/Home';
import {Students} from './pages/Students';
import {Employers} from './pages/Employers';
// ... import all your pages

function App() {
  return (
    <>
    Hello!
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact component={Home} />
        <Route path="/students" component={Students} />
        <Route path="/employers" component={Employers} />
      </Routes>
    </Router>
    Hello!
    </>
  );
}

export default App;


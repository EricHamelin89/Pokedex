import React, { Component } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import Navbar from './components/layouts/Navbar';
import Pokedex from './components/layouts/Pokedex';
import Footer from './components/layouts/Footer';
import PokemonInfo from './components/pokemon/PokemonInfo';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route exact path='/page=:pageNumber' component={Pokedex} />
              <Route exact path='/pokemoninfo/:pokemonIndex' component={PokemonInfo} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
import React, { Component } from 'react';

import logo from '../assets/logo-48.png';
import Search from './Search';

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav
          className='navbar navbar-expand-md navbar-dark fixed-top'
          style={{
            backgroundColor: '#ef5350',
            color: '#ffffff',
          }}
        >
          <a className='navbar-brand' href='https://github.com/EricHamelin89/Pokedex'>
            <img
              alt='Pokedex logo'
              src={logo}
              style={{
                height: '40px',
                width: '40px'
              }}
            />
            Pokedex
          </a>
          <Search />
        </nav>
      </div >
    );
  }
}

export default Navbar;
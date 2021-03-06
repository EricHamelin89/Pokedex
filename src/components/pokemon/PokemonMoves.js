import React, { Component } from 'react';

import Utility from '../../Utility';

class PokemonMoves extends Component {

  render() {
    const { moves } = this.props;


    return (
      <div className="row">
        {
          moves.map(info => {
            return (
              <div className="mr-2 mb-2" key={info.move.url.split('/')[6]}>
                <button type="button" className="btn btn-outline-dark">
                  {Utility.toCapitalize(info.move.name)}
                </button>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default PokemonMoves;
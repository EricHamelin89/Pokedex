import React, { Component } from 'react';

import PokemonCard from './PokemonCard';

import Utility from '../../Utility';

const { toCapitalize } = Utility;

class PokemonEvolution extends Component {
  state = {
    evolutionChainUrl: '',
    pokemonEvolutionData: {},
    evolutionChain: [],
    normalEvolution: [],
    branchedEvolution: [],
    imageLoading: true
  }

  componentDidMount() {
    const { evolutionChainUrl } = this.props;

    this.setState({
      evolutionChainUrl
    }, this.fetchData(evolutionChainUrl)); // Since setState is asynchronous, setting callback to fetch
  }

  fetchData(url) {
    fetch(url).then(res => res.json()).then(resObj => {
      this.setState({ pokemonEvolutionData: { ...resObj } }, this.extractPokemonData);
    })
  }

  /**
   * @param {Object} obj 
   * @param {Array} evolutionChain 
   */
  getEvolvesToData(obj, evolutionChain) {
    if (obj.evolves_to.length) {
      const { evolves_to } = obj;

   
      if (obj.evolves_to.length > 1) {
        const branchedEvolution = obj.evolves_to.map(branchPokemon => branchPokemon.species);

        evolutionChain.push(branchedEvolution);
      } else {
        evolutionChain.push(evolves_to[0].species);
      }

      this.getEvolvesToData(evolves_to[0], evolutionChain);
    } else {
      return;
    };
  }


  extractPokemonData() {
    const { pokemonEvolutionData } = this.state;
    const evolutionChain = [];
    const normalEvolution = [];
    const branchedEvolution = [];

    
    evolutionChain.push(pokemonEvolutionData.chain.species);

    
    this.getEvolvesToData(pokemonEvolutionData.chain, evolutionChain);

    evolutionChain.forEach(pokemonData => {
      if (!Array.isArray(pokemonData)) {
        normalEvolution.push(pokemonData);
      } else {
        branchedEvolution.push(...pokemonData);
      }
    });

    this.setState({
      evolutionChain,
      normalEvolution,
      branchedEvolution
    });
  }

  render() {

    return (
      <div>
        <hr></hr>
        <h5>Normal Evolution:</h5>
        <hr></hr>
        <div
          className="row mt-5"
          style={{
            justifyContent: 'center'
          }}
        >
          {
            this.state.normalEvolution.map(evolution => {
              return (
                <PokemonCard
                  key={evolution.name}
                  pokemonName={evolution.name}
                  pokemonUrl={evolution.url}
                />
              );
            })
          }
        </div>
        <div style={{
          display: this.state.branchedEvolution.length ? 'block' : 'none'
        }}>
          <hr></hr>
          <h5>Branched Evolution of {
            (this.state.normalEvolution[this.state.normalEvolution.length - 1])
              ? toCapitalize(this.state.normalEvolution[this.state.normalEvolution.length - 1].name)
              : null
          }:
          </h5>
          <hr></hr>
        </div>
        <div
          className="row mt-5"
          style={{
            justifyContent: 'center'
          }}
        >
          {
            this.state.branchedEvolution.map(evolution => {
              return (
                <PokemonCard
                  key={evolution.name}
                  pokemonName={evolution.name}
                  pokemonUrl={evolution.url}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default PokemonEvolution;
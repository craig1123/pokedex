angular.module('pokedex')
  .service('speciesService', function ($http) {

    this.getPokemon = function (searchTerm) {
      if (isNaN(searchTerm)) {
        searchTerm = searchTerm.toLowerCase();
      }
        return $http({
          method: 'GET',
          url: 'https://pokeapi.co/api/v2/pokemon-species/' + searchTerm + '/'
        }).then(function (response) {
          var pokemon = response.data;
          var pokeData = [];
          var types = [];
          if (searchTerm === 'craig') {
            pokeData.push('1');
            pokeData.push('1');
            pokeData.push('1');
            pokeData.push('1');
            pokeData.push('1');
            pokeData.push('Craig, is the master of all things Pokemon. Bow to his greatness!');
          }
          else {
          if (pokemon.habitat) {
            pokeData.push(pokemon.habitat.name);
          }
          else {
            pokeData.push("unknown");
          }
          if (pokemon.shape) {
            pokeData.push(pokemon.shape.name);
          }
          else {
            pokeData.push("unknown");
          }
          if (pokemon.growth_rate) {
            pokeData.push(pokemon.growth_rate.name);
          }
          else {
            pokeData.push("unknown");
          }
          pokeData.push(pokemon.evolution_chain.url);
          pokeData.push(pokemon.id);
          pokeData.push(pokemon.flavor_text_entries[1].flavor_text);
        }
          return pokeData;
        }, function () {
          if (searchTerm === 'craig') {
            return [0, 0, 0, 0, 0, "Everybody clap your hands if you think Craig did a great job."];
          }
          else {
            return "";
          }
        });
    };

    this.getEvolution = function(input) {
      return $http({
        method: 'GET',
        url: input
      }).then(function(result) {
        var evoChain = [];
        evoChain.push(result.data.chain.species.name);
        if (result.data.chain.evolves_to.length !== 0) {
          evoChain.push('⇒');
          evoChain.push(result.data.chain.evolves_to[0].species.name);
        }
        else {
          return evoChain;
        }
        if (result.data.chain.evolves_to[0].evolves_to.length !== 0) {
          evoChain.push('⇒');
          evoChain.push(result.data.chain.evolves_to[0].evolves_to[0].species.name);
        }
        else {
          return evoChain;
        }
        return evoChain;
      });
    };

  });//End Service

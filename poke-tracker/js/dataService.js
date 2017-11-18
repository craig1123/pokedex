angular.module('tracker').service('dataService', function($http) {

    this.getPokemon = function() {
      return $http({
        method: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon/?limit=811'
      }).then(function(response) {
        var data = response.data.results;
        var pokemon = [];
        for (var i = 0; i < data.length; i++) {
          if (i < 721) {
            pokemon.push({name: data[i].name.charAt(0).toUpperCase() + data[i].name.slice(1), id: (i + 1).toString(), img: 'https://www.serebii.net/art/th/' + (i + 1) + '.png'});
          }
          else {
            if (data[i].name.includes('pikachu-') || data[i].name.includes('-eternal') || data[i].name.includes('-small') || data[i].name.includes('-large') || data[i].name.includes('-super') || data[i].name.includes('-sunny') || data[i].name.includes('-snowy') || data[i].name.includes('-rainy') || data[i].name.includes('-striped')){

            }
            else {
              pokemon.push({name: data[i].name.charAt(0).toUpperCase() + data[i].name.slice(1), id: "", img: 'https://img.pokemondb.net/artwork/' + data[i].name + '.jpg'});
            }
          }
        }
        return pokemon;
      });
    };

    this.getPokemonSpecies = function (pokemon) {
      var url = pokemon.name.toLowerCase()
      return $http({
        method: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon-species/' + url + '/'
      }).then(function (response) {
        console.log('species', response.data);
        var data = response.data;
        var egg_groups = [];
        for (var i = 0; i < data.egg_groups.length; i++) {
          egg_groups.push(data.egg_groups[i].name);
        }
        var monster = {
          base_happiness: data.base_happiness,
          capture_rate: data.capture_rate,
          color: data.color.name,
          egg_groups: egg_groups,
          evolution_chain: data.evolution_chain.url,
          habitat: data.habitat.name,
          gender_rate: data.gender_rate,
          genera: data.genera[2],
          growth_rate: data.growth_rate.name,
          has_gender_differences: data.has_gender_differences,
          hatch_counter: data.hatch_counter,
        };
        return monster
      })
    };

    this.getMoreDetails = function(pokemon) {
      var url = pokemon.name.toLowerCase()
      return $http({
        method: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon/' + url + '/'
      }).then(function (response) {
        console.log('pokemon', response);
        var data = response.data;
        var monster = {
          name: pokemon.name,
          id: pokemon.id,
          img: pokemon.img,
          stats: data.stats,
          types: data.types,
          moves: data.moves,
          abilities: data.abilities,
          height: data.height,
          weight: data.weight,
        };
        return monster;
      });
    };

    this.getEvolution = function(url) {
      return $http({ method: 'GET', url: url }).then(function(result) {
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

});

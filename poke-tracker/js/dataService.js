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
        var data = response.data;
        var egg_groups = [];
        var description;
        var gender_rate;
        for (var i = 0; i < data.egg_groups.length; i++) {
          egg_groups.push(data.egg_groups[i].name);
        }
        if (data.flavor_text_entries[1].language.name === 'en') {
          description = data.flavor_text_entries[1].flavor_text;
        } else if (data.flavor_text_entries[2].language.name === 'en') {
          description = data.flavor_text_entries[2].flavor_text;
        }
        if (data.gender_rate == -1) {
          gender_rate = "N/A";
        } else {
          gender_rate = '\u2642' + (((8 - data.gender_rate) / 8) * 100 ).toFixed(2) +
            "% " + '\u2640' + ((data.gender_rate / 8) * 100).toFixed(2) + "% ";
        }
        var monster = {
          base_happiness: data.base_happiness,
          capture_rate: ((data.capture_rate / 255) * 100).toFixed(2),
          color: data.color.name,
          description: description,
          egg_groups: egg_groups,
          evolution_chain: data.evolution_chain.url,
          habitat: data.habitat ? data.habitat.name : 'N/A',
          gender_rate: gender_rate,
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
        var data = response.data;
        var img;
        var naturalMoves = [];
        var machineMoves = [];
        for (var i = 0; i < data.moves.length; i++) {
          if (data.moves[i].version_group_details[0].level_learned_at !== 0) {
            naturalMoves.push({
              name: data.moves[i].move.name,
              lvl: data.moves[i].version_group_details[0].level_learned_at
            })
          } else {
            machineMoves.push(data.moves[i].move.name)
          }
        }
        if (data.id > 721) {
          img = 'https://img.pokemondb.net/artwork/' + pokemon.name + '.jpg';
        } else {
          img = 'https://www.serebii.net/art/th/' + data.id + '.png';
        }
        var monster = {
          name: pokemon.name,
          id: data.id,
          img: img,
          stats: data.stats,
          types: data.types,
          naturalMoves: naturalMoves,
          machineMoves: machineMoves,
          abilities: data.abilities,
          height: data.height,
          weight: data.weight,
        };
        return monster;
      });
    };

    this.getEvolution = function(url) {
      return $http({ method: 'GET', url: url }).then(function(response) {
        var evoChain = [];
        var data = response.data.chain;
        function evolve(evolution, i) {
          var triggerName =  evolution.evolves_to[i].evolution_details[0].trigger.name;
          var how;
          if (triggerName === 'level-up') {
            if (evolution.evolves_to[i].evolution_details[0].min_level) {
              how = 'at level ' + evolution.evolves_to[i].evolution_details[0].min_level
            } else if (evolution.evolves_to[i].evolution_details[0].min_happiness) {
              how = 'with a minimum happiness of ' + evolution.evolves_to[i].evolution_details[0].min_happiness
            } else if (evolution.evolves_to[i].evolution_details[0].location) {
              how = 'at ' + evolution.evolves_to[i].evolution_details[0].location.name
            } else if (evolution.evolves_to[i].evolution_details[0].known_move_type) {
              how = 'with a known move type of ' + evolution.evolves_to[i].evolution_details[0].known_move_type.name
            } else {
              how = 'through unknown means'
            }
          } else if (triggerName === 'use-item') {
            how = 'with a ' + evolution.evolves_to[i].evolution_details[0].item.name
          } else if (triggerName === 'trade') {
            how = 'by trade'
          } else {
            how = 'through unknown means'
          }
          evoChain.push({
            from: evolution.species.name,
            to: evolution.evolves_to[i].species.name,
            how: how,
          });
        };
        if (data.evolves_to.length !== 0) {
          for (var i = 0; i < data.evolves_to.length; i++) {
            evolve(data, i)
            if (data.evolves_to[i].evolves_to.length !== 0) {
              for (var j = 0; j < data.evolves_to[i].evolves_to.length; j++) {
                evolve(data.evolves_to[i], j);
              }
            }
          }
        }
        if (evoChain.length === 0) {
          evoChain.push({from: data.species.name, to: 'has no evolutions', how: 'never'});
        }
        return evoChain;
      });
    };

});

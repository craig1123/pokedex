angular.module('tracker').controller('trackerCtrl', function($scope, dataService) {

  $scope.delay = true;
  $scope.getPokemon = function() {
    dataService.getPokemon().then(function(pokemon) {
      $scope.pokes = pokemon;
      $scope.delay = false;
      $scope.loadImages();
    });
  };

  $scope.getPokemon();

  $scope.pokemons = [];
  $scope.counter = 24;
  $scope.loadImages = function() {
      $scope.pokemons = $scope.pokes.slice(0, $scope.counter)
      $scope.counter += 24;
  };

  $scope.scrollTop = function() {
    var top = document.getElementById('poke-wrapper');
    top.scrollTop = 0;
    window.scrollTo(0,0);
  }

  $scope.flipIt = function(pokemon) {
    // flip animation start
    dataService.getMoreDetails(pokemon).then(function(res) {
      $scope.selectedPokemon = res;
      // renderStats(res);
    });
    dataService.getPokemonSpecies(pokemon).then(function(res) {
      dataService.getEvolution(res.evolution_chain).then(function(evoChain) {
        $scope.evoChain = evoChain;
      });
      $scope.selectedSpecies = res;
    })
  }


  var typesToColors = {
    normal: '#A8A878',
    fire: '#F08030',
    fighting: '#C03028',
    water: '#6890F0',
    grass: '#78C850',
    poison: '#A040A0',
    electric: '#F8D030',
    ground: '#E0C068',
    rock: '#B8A038',
    bug: '#A8B820',
    dragon: '#7038F8',
    ghost: '#705898',
    dark: '#705848',
    fairy: '#EE99AC',
    steel: '#B8B8D0',
    psychic: '#F85888',
    ice: '#98D8D8',
    flying: '#A890F0'
  };

  function smoothExponentially(value, max) {
    var a = -max / Math.pow(max, 2);
    return a * Math.pow(value - max, 2) + max;
  };
  function getStatDisplayRatio (statValue) {
    var maxStat = 255;
    var smoothedValue = smoothExponentially(statValue, maxStat);
    return smoothedValue / maxStat;
  };
  function getMonsterPrimaryType(monster) {
    return (monster.types[1] || monster.types[0]).name;
  };
  function renderStats(monster) {
    var monsterType = (monster.types[1] || monster.types[0]).name;
    var barColor = typesToColors[monsterType];
    $scope.monsterStats = monster.stats;
    var stats = {
      'hp': 'HP',
      'attack': 'Attack',
      'defense': 'Defense',
      'speed': 'Speed',
      'sp_atk': 'Sp Atk',
      'sp_def': 'Sp Def',
    };
    $scope.getStatName = function(monsterStat) {
      return stats[monsterStat.stat.name];
    }
    $scope.statBackground = function(stat) {
      return {
        background: barColor,
        transform: "scaleX(" + getStatDisplayRatio(stat.base_stat) + ")"
      }
    }
    $scope.statFont = function(stat) {
      return {'color': stat.base_stat < 20 ?'#333':'#fff'}
    }

  };

}).filter('filter', function() {
  return function(pokemon, search) {
      if (search.id || search.name) {
        var results = [];
        var i;
        var searchName = search.name.toLowerCase();
        for(i = 0; i < pokemon.length; i++){
          var firstName = pokemon[i].name.toLowerCase();
          var id = pokemon[i].id
          if (firstName.indexOf(searchName) >= 0 || id.indexOf(search.id) >= 0) {
            results.push(pokemon[i]);
          }
        }
        return results;
    } else {
      return pokemon;
    }
  };
});




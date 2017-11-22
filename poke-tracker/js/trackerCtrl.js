angular.module('tracker').controller('trackerCtrl', function($scope, dataService, regionService) {
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
  var stats = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    speed: 'Speed',
    "special-attack": 'Sp Atk',
    "special-defense": 'Sp Def',
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  $scope.delay = true;
  $scope.modal = false;
  $scope.counter = 24;
  $scope.getPokemon = function() {
    dataService.getPokemon().then(function(monsters) {
      $scope.pokemons = monsters;
      $scope.delay = false;
    });
  };

  $scope.getPokemon();

  $scope.scrollTop = function() {
    var top = document.getElementById('poke-wrapper');
    top.scrollTop = 0;
    window.scrollTo(0,0);
  }

  $scope.flipIt = function(pokemon) {
    pokemon.name = capitalizeFirstLetter(pokemon.name)
    setTimeout(function () {
      $scope.pokeModal = true;
      var modal = document.getElementById('poke-modal');
      document.body.style.overflowY = 'hidden';
      document.getElementById('poke-wrapper').style.overflowY = 'hidden';
      modal.classList.remove('out');
      modal.classList.add('unfold-modal');
      dataService.getMoreDetails(pokemon).then(function(res) {
        $scope.selectedPokemon = res;
        renderStats(res);
      });
      dataService.getPokemonSpecies(pokemon).then(function(res) {
        dataService.getEvolution(res.evolution_chain).then(function(evoChain) {
          $scope.evolution = evoChain;
          var normalColor = $scope.barColor;
          var darkerColor = shadeBlend(-0.25, normalColor);
          $scope.evoArrows = {fill: darkerColor, stroke: darkerColor};
        });
        $scope.selectedSpecies = res;
      })
      $scope.regions = regionService.getRegions(pokemon);
    }, 250);
  }

  $scope.removeModal = function() {
    var modal = document.getElementById('poke-modal');
    $scope.pokeModal = false;
    document.body.style.overflowY = '';
    document.getElementById('poke-wrapper').style.overflowY = '';
    document.getElementById('modal-background').style.background = 'rgba(0,0,0,.8)';
    modal.classList.remove('unfold-modal');
    modal.classList.add('out');
  }

  function shadeBlend(p,from,to) {
    var n=p<0?p*-1:p,u=Math.round,w=parseInt;
    var f=w(from.slice(1),16),t=w((to?to:p<0?"#000000":"#FFFFFF").slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF;
    return "#"+(0x1000000+(u(((t>>16)-R1)*n)+R1)*0x10000+(u(((t>>8&0x00FF)-G1)*n)+G1)*0x100+(u(((t&0x0000FF)-B1)*n)+B1)).toString(16).slice(1)
  }
  function changeBackgroundClass(color) {
    var sections = document.getElementsByClassName('section-header');
    var darkerColor = shadeBlend(-0.25, color);
    for (var i = 0; i < sections.length; i++) {
      sections[i].style.backgroundColor = darkerColor;
    }
  }
  function hexToRGB(hex) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + ", " + g + ", " + b + ", .8)";
  }
  function smoothExponentially(value, max) {
    var a = -max / Math.pow(max, 2);
    return a * Math.pow(value - max, 2) + max;
  };
  function getStatDisplayRatio (statValue) {
    var maxStat = 255;
    var smoothedValue = smoothExponentially(statValue, maxStat);
    return smoothedValue / maxStat;
  };
  function renderStats(monster) {
    var monsterType = (monster.types[1] || monster.types[0]).type.name;
    var types = [];
    for (var i = 0; i < monster.types.length; i++) {
      types.push({
        name: monster.types[i].type.name,
        color: typesToColors[monster.types[i].type.name]
      })
    }
    $scope.types = types;
    $scope.barColor = typesToColors[monsterType];
    document.getElementById('modal-background').style.background = hexToRGB($scope.barColor);
    changeBackgroundClass(typesToColors[monsterType]);
    $scope.monsterStats = monster.stats;
    $scope.getStatName = function(monsterStat) {
      return stats[monsterStat.stat.name];
    }
    $scope.statBackground = function(stat) {
      return {
        background: $scope.barColor,
        transform: "scaleX(" + getStatDisplayRatio(stat.base_stat) + ")"
      }
    }
    $scope.statFont = function(stat) {
      return {color: stat.base_stat < 20 ?'#333':'#fff'}
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

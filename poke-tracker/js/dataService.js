angular
  .module('tracker')
  .service('dataService', function($http) { //A service is a constructor function

    this.getPokemon = function() {
      return $http({
        method: 'GET',
        url: 'http://pokeapi.co/api/v2/pokemon/?limit=811'
      }).then(function(response) {
        var data = response.data.results;
        var pokemon = [];
        for (var i = 0; i < data.length; i++) {
          if (i < 721) {
            pokemon.push({name: data[i].name.charAt(0).toUpperCase() + data[i].name.slice(1), id: '#' + (i + 1), img: 'http://www.serebii.net/art/th/' + (i + 1) + '.png'});
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
}); //End service

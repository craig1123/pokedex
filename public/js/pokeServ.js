angular.module('pokedex')
  .service('pokeServ', function ($http) {

    this.getPokemon = function (searchTerm) {
      if (isNaN(searchTerm)) {
        searchTerm = searchTerm.toLowerCase();
      }
        return $http({
          method: 'GET',
          url: 'https://pokeapi.co/api/v2/pokemon/' + searchTerm + '/'
        }).then(function (response) {
          var pokemon = response.data;
          var pokeData = [];
          var types = [];
          pokeData.push(pokemon.name);
          pokeData.push(pokemon.sprites);
          pokeData.push(pokemon.types);
          pokeData.push(pokemon.moves);
          return pokeData;
        }, function () {
          return "";
        });
    };

});//End Service

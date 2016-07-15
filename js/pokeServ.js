angular.module('pokedex')
  .service('pokeServ', function ($http) {
    this.getPokemon = function (num) {
      return $http({
        method: 'GET',
        url: 'http://pokeapi.co/api/v2/pokemon/' + num + '/'
      }).then(function (response) {
        return response.data
      })
    }


  });

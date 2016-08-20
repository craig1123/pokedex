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
          return response.data;
        }, function () {
          return "";
        });
    };


  });

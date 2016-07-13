angular.module('pokedex')
  .controller('pokeCtrl', function ($scope, pokeServ) {

    $scope.pokeData = function (num) {
      pokeServ.getPokemon(num).then(function (response) {
        console.log(response);
        $scope.pokeName = response.name;
        $scope.pokepic = response.sprites.front_shiny;
      });
    };

  });

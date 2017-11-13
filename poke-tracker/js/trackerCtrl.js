angular
.module('tracker')
.controller('trackerCtrl', function($scope, dataService, $timeout) {

  $scope.getPokemon = function() {
    dataService.getPokemon().then(function(pokemon) {
      console.log(pokemon);
      $scope.pokemons = pokemon;
    });
  };

$scope.delay = false;
$scope.fav = false;
$scope.getPokemon();
$scope.flipCard = false;
});  //End mainCtrl

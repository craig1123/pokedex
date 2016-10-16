angular
.module('tracker')
.controller('trackerCtrl', function($scope, dataService, $timeout) {

  $scope.getPokemon = function() {
    dataService.getPokemon().then(function(pokemon) {
      $scope.pokemons = pokemon;
    });
  };

// $scope.setDelay = function() {
//   $timeout(function() {
//     $scope.delay = !$scope.delay;
//   }, 500);
// };

$scope.delay = false;
$scope.fav = false;
$scope.getPokemon();
$scope.flipCard = false;
});  //End mainCtrl

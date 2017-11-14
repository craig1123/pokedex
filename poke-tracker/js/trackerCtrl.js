angular
.module('tracker')
.controller('trackerCtrl', function($scope, dataService) {

  $scope.delay = true;
  $scope.getPokemon = function() {
    dataService.getPokemon().then(function(pokemon) {
      $scope.pokemons = pokemon;
      $scope.delay = false;
    });
  };

  $scope.fav = false;
  $scope.getPokemon();
  $scope.flipCard = false;
})
.filter('filter', function() {
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
});;  //End mainCtrl

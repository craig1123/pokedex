angular.module('tracker').controller('trackerCtrl', function($scope, dataService) {

  $scope.delay = true;
  $scope.getPokemon = function() {
    dataService.getPokemon().then(function(pokemon) {
      $scope.pokes = pokemon;
      $scope.delay = false;
      $scope.loadImages();
    });
  };

  $scope.pokemons = [];
  $scope.counter = 24;
  $scope.loadImages = function() {
      $scope.pokemons = $scope.pokes.slice(0, $scope.counter)
      $scope.counter += 24;
  };


  $scope.fav = false;
  $scope.getPokemon();
  $scope.flipCard = false;

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

angular.module('tracker').directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        var raw = elm[0];
        elm.on('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});




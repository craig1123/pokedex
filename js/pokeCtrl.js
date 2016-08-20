angular.module('pokedex')
  .controller('pokeCtrl', function ($scope, pokeServ) {

    $scope.pokeData = function (num) {
      pokeServ.getPokemon(num).then(function (response) {
        if (response === '') {
          $scope.pokeName = "";
          $scope.pokepic = "https://www.web2.mnr.gov.on.ca/sar/Quiz/match_quiz/img/try-again.png";
          $scope.number = "";
          if ($scope.cssToggle === false) {
            $scope.cssToggle = true;
          }
        }
        else {
        $scope.pokeName = response.name;
        $scope.pokepic = response.sprites.front_default;
        $scope.types = response.types;
        $scope.number = "";
        if ($scope.cssToggle === false) {
          $scope.cssToggle = true;
        }
        }
      });
    };

    $scope.cssToggle = false;
  });

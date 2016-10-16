angular.module('pokedex')
    .controller('mainCtrl', function($scope, $state, pokeServ, regionService, landingSrv, speciesService) {

        $scope.pokeData = function(pokemon) {
          $scope.pokepic = 'https://pbs.twimg.com/profile_images/580498151703973888/UkkIZu0M.png';
            pokeServ.getPokemon(pokemon).then(function(response) {
                if (response === '') {
                    $scope.typeT = "";
                    $scope.moveT = "";
                    $scope.regionT = "";
                    $scope.regions = "";
                } else {
                    $scope.types = response[2];
                    $scope.moves = response[3];
                    $scope.regionT = "Region(s)";
                    $scope.typeT = "Type(s)";
                    $scope.moveT = "Moves";
                }
            });
        };

       var talking = function() {
        responsiveVoice.speak($scope.desc, "Australian Female");
      };

        $scope.getMoreData = function(pokemon) {
            $scope.num = "";
            speciesService.getPokemon(pokemon).then(function(results) {
                if (results === '') {
                    $scope.habitat = '';
                    $scope.shape = '';
                    $scope.growth = '';
                    $scope.evo = '';
                    $scope.number = '';
                    $scope.otherInfoT = '';
                    $scope.evoT = '';
                } else {
                    $scope.habitat = results[0];
                    $scope.shape = results[1];
                    $scope.growth = results[2];
                    $scope.evo = results[3];
                    $scope.number = results[4];
                    $scope.otherInfoT = "Misc";
                    $scope.evoT = 'Evolution';
                    $scope.desc = results[5];
                    talking();
                    getEvo();
                }
            });
        };
        $scope.testData = function(input) {
            $scope.cssToggle = true;
            var checkVal = landingSrv.getID(input);
            if (checkVal === 'invalid') {
              if (input === 'craig') {
                $scope.pokeImg = "";
                $scope.testName = "The End";
              }
              else {
                $scope.pokeImg = 'https://pbs.twimg.com/profile_images/580498151703973888/UkkIZu0M.png';
                $scope.testName = "Try Again";
              }
            } else {
                $scope.pictureID = checkVal;
                var temp = landingSrv.getName(input);
                $scope.pokeImg = "http://www.serebii.net/art/th/" + $scope.pictureID + ".png";//*****This is not secure
                $scope.testName = temp.charAt(0).toUpperCase() + temp.slice(1);
            }
        };

        var getEvo = function() {
            var chainID = $scope.evo;
            if ($scope.testName === "Vaporeon" || $scope.testName === "Jolteon" || $scope.testName === "Flareon" || $scope.testName === "Espeon" || $scope.testName === "Umbreon" || $scope.testName === "Leafeon" || $scope.testName === "Glaceon" || $scope.testName === "Sylveon") {
                $scope.evolution = ['Eevee', '⇒', '' + $scope.testName + ''];
            } else if ($scope.testName === "Eevee") {
                $scope.evolution = ["Eevee", '⇒', '8 possibilities'];
            } else {
                speciesService.getEvolution(chainID).then(function(returned) {
                    $scope.evolution = returned;
                });
            }
        };


        $scope.regionData = function(pokemon) {
            $scope.regions = regionService.getRegions(pokemon);
        };

        $scope.pokemonID = function(pokemon) {
            $scope.id = regionService.getID(pokemon);
        };

        $scope.route = function() {
            $state.go('mainSearch');
        };

        $scope.randomizer = function() {
            $scope.cssToggle = true;
            var searchNum = Math.floor((Math.random() * (721)) + 1);
            $scope.testData(searchNum);
            $scope.pokeData(searchNum);
        };

        $scope.startGame = function() {
          $scope.gameRight = 1;
          $scope.showName = false;
          $scope.testName = "";
          $scope.pokeImg = "";
          $scope.randomizer();
        };

        $scope.gameChecker = function(guess) {
            var randName = $scope.testName;
            if (guess.toLowerCase() !== randName.toLowerCase()) {
              setTimeout(function() {
                $state.go('prize');
              }, 1000);
            }
            else {
              $scope.showName = true;
              $scope.gameRight++;
              $scope.nameGuess = "";
              setTimeout(function() {
                $scope.showName = false;
              }, 500);
              setTimeout(function() {
                $scope.randomizer();
              }, 2000);
            }
        };

        $scope.gameRight = 0;
        $scope.pokedexPic = "./img/Pokedex.png";
        $scope.pokeTypes = ['Normal', 'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel', 'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark', 'Fairy'];
        $scope.cssToggle = false;


    }); //End Controller

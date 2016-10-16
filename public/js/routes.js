angular.module('pokedex')
        .config(function($stateProvider, $urlRouterProvider) {
                  $stateProvider
                      .state('home', {
                        url: '/',
                        templateUrl: '../views/home.html',
                        controller: 'mainCtrl',
                        controllerAs: 'vm'
                      })
                      .state('mainSearch', {
                        url: '/pokeSearch',
                        templateUrl: '../views/mainSearch.html',
                        controller: 'mainCtrl',
                        controllerAs: 'vm'
                      })
                      .state('randomSearch', {
                        url: '/randomizer',
                        templateUrl: '../views/randomizer.html',
                        controller: 'mainCtrl',
                        controllerAs: 'vm'
                      })
                      .state('details', {
                        url: '/details',
                        templateUrl: '../views/details.html',
                        controller: 'mainCtrl',
                        controllerAs: 'vm'
                      })
                      .state('prize', {
                        url: '/easteregg',
                        templateUrl: '../views/prize.html',
                      })
                      .state('regions', {
                        url: '/regions',
                        templateUrl: '../views/regions.html',
                        controller: 'mainCtrl'
                      })
                      .state('types', {
                        url: '/types',
                        templateUrl: '../views/types.html',
                        controller: 'mainCtrl',
                        controllerAs: 'vm'
                      });

                  $urlRouterProvider.otherwise('/');

});

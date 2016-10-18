angular.module('pokedex').directive('carouselDir', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        $(element).slick({
          autoplay: true,
          autoplaySpeed: 2000
        });
    }
  };
});

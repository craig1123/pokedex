angular.module('pokedex')
        .directive('headerDirective', function($window) {

          var $win = angular.element($window);

          return {
            restrict: 'A',
            link: function(scope, element, attrs) {
              var offsetTop = element.offset().top;

                $win.on('scroll', function(e) {
                  if ($win.scrollTop() >= offsetTop - 20) {
                    $('.header-content').addClass("header-fixed");
                    $('.header-logo').addClass("logo-fixed");
                    $(element).addClass("search-fixed");
                    $('.nav-links').addClass('nav-fixed');
                    $('.footer-content').addClass('footer-fixed');
                    $('.pokedex-wrapper').css("margin-top", "170px");
                  }
                  else {
                    $('.header-content').removeClass("header-fixed");
                    $('.header-logo').removeClass("logo-fixed");
                    $(element).removeClass("search-fixed");
                    $('.nav-links').removeClass("nav-fixed");
                    $('.footer-content').addClass('footer-fixed');
                    $('.pokedex-wrapper').css("margin-top", "0");
                  }
                });
              }
            };
});

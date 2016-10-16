$(document).ready(function() {

  $(window).on('scroll', function(e) {

    if ($(window).scrollTop() > 131) {
      $('.headerTop').addClass("header-fixed");
      $('.logo').addClass("logo-fixed");
      $('input').addClass("search-fixed");
      $('.poke-wrapper').css("margin-top", "26.5vh");
    } else {
      $('.headerTop').removeClass("header-fixed");
      $('.logo').removeClass("logo-fixed");
      $('input').removeClass("search-fixed");
      $('.poke-wrapper').css("margin-top", "0");
    }
  });
});

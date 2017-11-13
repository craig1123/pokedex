$(document).ready(function() {

  $(window).on('scroll', function(e) {

    if ($(window).scrollTop() > 131) {
      $('.header-content').addClass("logo-fixed");
      $('input').addClass("search-fixed");
      $('.poke-wrapper').css("margin-top", "26.5vh");
    } else {
      $('.headerTop').removeClass("header-fixed");
      $('.header-content').removeClass("logo-fixed");
      $('input').removeClass("search-fixed");
      $('.poke-wrapper').css("margin-top", "0");
    }
  });
});

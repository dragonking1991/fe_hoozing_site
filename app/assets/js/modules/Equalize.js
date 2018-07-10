export default class Equalize {
  constructor(el) {

     var target = $(el).data('target');
  $(el).find(target).removeAttr('style');

    setTimeout(function() {
      if ($(window).width() > 1024) {

        var maxHeight = Math.max.apply(null, $(el).find(target).map(function () {
          return $(this).height();
          console.log(maxHeight);
        }).get());
        console.log(maxHeight);

        $(el).find(target).height(Math.ceil(maxHeight -20));
      }
    },1000);

  $(window).on('load resize', function () {
    setTimeout(function() {
      if ($(window).width() > 1024) {

        var maxHeight = Math.max.apply(null, $(el).find(target).map(function () {
          return $(this).height();
          console.log(maxHeight);
        }).get());
        console.log(maxHeight);

        $(el).find(target).height(Math.ceil(maxHeight -20));
      }
      else {
        $(el).find(target).removeAttr('style');
      }
    },1000);

  });
  }
}
export default class Form {
  constructor(el) {

    $('[data-toggle="modal"]').on('click',function(e){
      let target = $(this).attr('href');
      $(target).modal();
    });
    $('.close-modal').on('click',function(e){
      let target = $(this).attr('href');
      $(target).modal('hide');
    });

    $('[data-show]').on('click',function(e){
      var blockToggle = $(this).attr('data-show');
      $(this).toggleClass('active');
      if ( !$(blockToggle).hasClass('show')) {
        $(blockToggle).addClass('show');
      }
      else {
        $(blockToggle).removeClass('show');
      }
    });

    $('.close-modal').on('click',function(){
      var target = $(this).data('close');
      $(target).removeClass('show');
    });

    $('.select-wrapper, .checkbox-list').on('click',function(e){
      e.stopPropagation();
      if ($(window).width() < 1025 && !$(this).hasClass('show')) {
        $('.select-wrapper,.checkbox-list').removeClass('show');
        $(this).addClass('show');
      }
      else {
        $(this).removeClass('show');
      }
    });

    $('.form_suggest-search').find('input').on('focus', function(){
      $('.form_suggest-search').find('.box-suggest').toggleClass('active');
    });

    $('.form_suggest-search').find('input').on('blur', function(){
      setTimeout(function(){
        $('.form_suggest-search').find('.box-suggest').removeClass('active');
      },200);
    });

    $(".input-file").change(function () {
      var file    = this.files[0];
      console.log(file);

      var reader  = new FileReader();
      var total_file= document.getElementById("input-file").files.length;
      console.log(total_file);
      for(var i=0;i<total_file;i++){
        console.log(event.target.files[i]);
        console.log(URL.createObjectURL(event.target.files[i]));
        $('.input-photo').append("<figure><img class='img-responsive' src='"+URL.createObjectURL(event.target.files[i])+"'></figure>");
      }


      reader.onloadend = function (readerEvent) {
        var image = new Image();
        image.onload = function (imageEvent) {

          var imgSize = $(".input-photo").data('size');
          var imgQuality = $(".input-photo").data('quality');
          var canvas = document.createElement('canvas'),
          max_size = imgSize,
          width = image.width,
          height = image.height;


          if (width > height) {
            if (width > max_size) {
              height *= max_size / width;
              width = max_size;
            }
          } else {
            if (height > max_size) {
              width *= max_size / height;
              height = max_size;
            }
          }
          canvas.width = width;
          canvas.height = height;
          var ctx = canvas.getContext('2d');

          var x = -(width - max_size)/2;
          var y = -(height - max_size)/2;

          // var orientation;
          // EXIF.getData(image, function() {
          //   orientation = EXIF.getTag(this, 'Orientation');
          // });

          // if (orientation && orientation <= 8 && orientation >= 2) {
          //   switch (orientation) {
          //     case 2:
          //     ctx.translate(width, 0);
          //     ctx.scale(-1, 1);
          //     break;
          //     case 3:
          //     ctx.translate(width, height);
          //     ctx.rotate(Math.PI);
          //     break;
          //     case 4:
          //     ctx.translate(0, height);
          //     ctx.scale(1, -1);
          //     break;
          //     case 5:
          //     ctx.rotate(0.5 * Math.PI);
          //     ctx.scale(1, -1);
          //     x = -(width - max_size)/2;
          //     y = (height - max_size)/2;
          //     break;
          //     case 6:
          //     ctx.rotate(0.5 * Math.PI);
          //     ctx.translate(0, -(height));
          //     x = -(width - max_size)/2;
          //     y = (height - max_size)/2;
          //     break;
          //     case 7:
          //     ctx.rotate(0.5 * Math.PI);
          //     ctx.translate(width, -(height - 50));
          //     ctx.scale(-1, 1);
          //     x = -(width - max_size)/2;
          //     y = (height - max_size)/2;
          //     break;
          //     case 8:
          //     ctx.rotate(-0.5 * Math.PI);
          //     ctx.translate(-width, 0);
          //     x = -(width - max_size)/2;
          //     y = (height - max_size)/2;
          //     break;
          //   }
          //   ctx.drawImage(image, x, y, width, height);
          // }
          // else{
          // }
          ctx.drawImage(image, 0, 0, width, height);

          var dataUrl = canvas.toDataURL('image/png', imgQuality);
          // $(".step__get-img").addClass("active").find("img").attr("src", dataUrl);
          // $("#get-img").attr("value", dataUrl);

        }
        image.src = readerEvent.target.result;
      }
      reader.readAsDataURL(file);
    });


    $(document).on('click', function(e){
      var container = $(".select-wrapper, .checkbox-list");

      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.removeClass('show');
      }
    });

    $('.select-wrapper li').on('click',function(e){
      e.stopPropagation();
      $(this).parents('.select-wrapper').removeClass('show');
      $(this).parents(".select-wrapper").find('li').removeClass('active'); 
      $(this).addClass('active').parents(".select-wrapper").removeClass('show').find('span').html($(this).html());
    });

  }
}
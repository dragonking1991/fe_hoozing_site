import OpenPopup from './OpenPopup';

export default class PhotoUpload {
    constructor(el) {
        let popup = new OpenPopup();
        let _this = this;
        var theme_path = '';
        if(window.location.host.indexOf('9000') > 0 || window.location.host.indexOf('9001')  > 0){
          theme_path = 'https://milo-vietnam.asiadigitalhub.com';
        };

        if(window.location.hash) {
          if( '#upphoto' == window.location.hash){
            setTimeout(function(){
                $('.upload__control.btn--upload').trigger('click');
            },1000);
          }
        };

        $('#popup-invalid-photo .btn--upload').on('click', function(){
            $.magnificPopup.close();
        });


        var IUL = (function(){
            'use strict';
            var variables;
            var currentZoom, originZoom;
            var currentDegree, originDegree;
            var imgCrop, imageSrc;
            var methods = {
                getBoundWindow: function(){
                    var heightWindow = document.documentElement.clientHeight;
                    var widthWindow = document.documentElement.clientWidth;
                    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
                    if (iOS) {
                        var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
                        heightWindow = window.innerHeight * zoomLevel;
                        widthWindow = window.innerWidth * zoomLevel;
                    }
                    return {width: widthWindow, height: heightWindow};
                },
                trigger: function(){
                    variables.mask.on('click', function(){
                        variables.file.trigger('click');
                        variables.selectImageCallback(this);
                    });

                    variables.editMask.on('click', function(){
                        var tempImg = new Image();
                        tempImg.src = $(this).parent().find('.raw-image').val();

                        methods.initCrop(tempImg);

                        variables.editImageCallback(this);
                    });
                },
                readImage: function(){
                    'use strict';
                    variables.file.on('change', function(){
                        var file = this.files[0];
                        var sFileName = file.name;
                        var sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1].toLowerCase();
                        var iFileSize = file.size;

                        /// OR together the accepted extensions and NOT it. Then OR the size cond.
                        /// It's easier to see this way, but just a suggestion - no requirement.
                        if (!(sFileExtension === "jpg" ||
                                sFileExtension === "png" ||
                                sFileExtension === "jpeg")) { /// file type
                            if(typeof variables.errorFileType === 'function'){
                                variables.errorFileType();
                            }

                            return false;
                        }

                        if (iFileSize > 5242880) { /// 5 mb
                            if(typeof variables.errorFileSize === 'function'){
                                variables.errorFileSize();
                            }

                            return false;
                        }

                        methods.initialFile(this.files[0]);

                    });
                },
                initialFile: function(file){
                    'use strict';
                    if ( window.FileReader && window.File && window.FileList && window.Blob ) {
                        var reader = new FileReader();
                        reader.onloadend = function () {
                            var tempImg = new Image();
                            tempImg.src = reader.result;

                            methods.initCrop(tempImg);
                        };
                        reader.readAsDataURL(file);
                    } else {
                        if(typeof variables.errorSupport === 'function'){
                            variables.errorSupport();
                        }
                        return false;
                    }
                },
                initCrop: function(tempImg){
                    'use strict';
                    tempImg.onload = function() {
                        'use strict';

                        var MAX_WIDTH = tempImg.width;
                        var MAX_HEIGHT = tempImg.height;
                        if(MAX_WIDTH < variables.width || MAX_HEIGHT < variables.height) {
                            if(typeof variables.errorDimension === 'function'){
                                variables.errorDimension(variables.width, variables.height);
                            }
                            return false;
                        }

                        variables.beforeInitCropCallback(tempImg, function(result) {
                            popup.hideLoader();
                            if (result.responseJSON.status == 0) {
                                console.log(result.responseJSON.msg);
                                // show popup
                                // popup.showAlert('Lỗi', result.responseJSON.msg);
                                popup.showInvalidPhoto(result.responseJSON.msg);
                                return;
                            }

                            $('.edit-tools').removeClass('hidden');

                            if(tempImg.width > variables.maxWidth) {
                                MAX_WIDTH = variables.maxWidth;
                            }
                            if(tempImg.height > variables.maxHeight) {
                                MAX_HEIGHT = variables.maxHeight;
                            }

                            if(methods.getBoundWindow().width < 768) {
                                if(tempImg.width > variables.maxWidthMobile) {
                                    MAX_WIDTH = variables.maxWidthMobile;
                                }
                                if(tempImg.height > variables.maxHeightMobile) {
                                    MAX_HEIGHT = variables.maxHeightMobile;
                                }
                            }

                            //imageSrc = methods.resizeAndCropImage(tempImg, MAX_WIDTH, MAX_HEIGHT);

                            variables.image.attr('src', tempImg.src);

                            methods.editImage();

                            originZoom = 0;
                            variables.zoomControl.slider({
                                range: "min",
                                animate: true,
                                min: 0,
                                max: 100,
                                value: 0,
                                slide: function(event, ui){
                                    currentZoom = ui.value - originZoom;
                                    originZoom = ui.value;
                                    variables.image.cropper('zoom', currentZoom / 60 );
                                }
                            });
                            originDegree = 36;
                            variables.rotateControl.slider({
                                range: "min",
                                animate: true,
                                min: 0,
                                max: 72,
                                value: 36,
                                slide: function(event, ui){
                                    currentDegree = ui.value - originDegree;
                                    originDegree = ui.value;
                                    variables.image.cropper('rotate',currentDegree * 5 );
                                }
                            });

                            $('#left-rotate').off('click').on('click', function(){
                                var current = parseInt(variables.rotateControl.slider('value'), 10);
                                if(current > 0 && current <= 72) {
                                    variables.rotateControl.slider('value', current - 1);

                                    currentDegree = (current - 1) - originDegree;
                                    originDegree = (current - 1);
                                    variables.image.cropper('rotate', currentDegree * 5);
                                }
                            });

                            $('#right-rotate').off('click').on('click', function(){
                                var current = parseInt(variables.rotateControl.slider('value'), 10);
                                if(current >= 0 && current < 72) {
                                    variables.rotateControl.slider('value', current + 1);

                                    currentDegree = (current + 1) - originDegree;
                                    originDegree = (current + 1);
                                    variables.image.cropper('rotate', currentDegree * 5);
                                }
                            });


                            $('#left-zoom').off('click').on('click', function(){
                                var current = parseInt(variables.zoomControl.slider('value'), 10);
                                if(current > 0 && current <= 100) {
                                    variables.zoomControl.slider('value', current - 1);

                                    currentZoom = (current-1) - originZoom;
                                    originZoom = (current-1);
                                    variables.image.cropper('zoom', currentZoom / 60 );
                                }
                            });

                            $('#right-zoom').off('click').on('click', function(){
                                var current = parseInt(variables.zoomControl.slider('value'), 10);
                                if(current >= 0 && current < 100) {
                                    variables.zoomControl.slider('value', current + 1);

                                    currentZoom = (current+1) - originZoom;
                                    originZoom = (current+1);
                                    variables.image.cropper('zoom', currentZoom / 60 );
                                }
                            });

                            variables.afterInitCropCallback();
                        });
                    }
                },
                resizeAndCropImage: function(tempImg, MAX_WIDTH, MAX_HEIGHT){
                    'use strict';

                    var canvas = document.createElement('canvas');
                    canvas.width = MAX_WIDTH;
                    canvas.height = MAX_HEIGHT;
                    var ctx = canvas.getContext("2d");

                    var tempW = tempImg.width;
                    var tempH = tempImg.height;

                    if(tempW > MAX_WIDTH || tempH > MAX_HEIGHT) {
                        if ((tempW * MAX_HEIGHT / tempH) >= MAX_WIDTH) {
                            tempW *= MAX_HEIGHT / tempH;
                            tempH = MAX_HEIGHT;
                        } else {
                            tempH *= MAX_WIDTH / tempW;
                            tempW = MAX_WIDTH;
                        }
                    }

                    var x = -(tempW - MAX_WIDTH)/2;
                    var y = -(tempH - MAX_HEIGHT)/2;

                    var orientation;
                    EXIF.getData(tempImg, function() {
                        orientation = EXIF.getTag(tempImg, 'Orientation');
                    });
                    if (orientation && orientation <= 8 && orientation >= 2) {
                        switch (orientation) {
                            case 2:
                                // horizontal flip
                                ctx.translate(tempW, 0);
                                ctx.scale(-1, 1);
                                break;
                            case 3:
                                // 180 rotate left
                                ctx.translate(tempW, tempH);
                                ctx.rotate(Math.PI);
                                break;
                            case 4:
                                // vertical flip
                                ctx.translate(0, tempH);
                                ctx.scale(1, -1);
                                break;
                            case 5:
                                // vertical flip + 90 rotate right
                                ctx.rotate(0.5 * Math.PI);
                                ctx.scale(1, -1);

                                x = -(tempW - MAX_HEIGHT)/2;
                                y = (tempH - MAX_WIDTH)/2;
                                break;
                            case 6:
                                // 90 rotate right
                                ctx.rotate(0.5 * Math.PI);
                                ctx.translate(0, -(tempH));

                                x = -(tempW - MAX_HEIGHT)/2;
                                y = (tempH - MAX_WIDTH)/2;
                                break;
                            case 7:
                                // horizontal flip + 90 rotate right
                                ctx.rotate(0.5 * Math.PI);
                                ctx.translate(tempW, -(tempH - 50));
                                ctx.scale(-1, 1);

                                x = -(tempW - MAX_HEIGHT)/2;
                                y = (tempH - MAX_WIDTH)/2;
                                break;
                            case 8:
                                // 90 rotate left
                                ctx.rotate(-0.5 * Math.PI);
                                ctx.translate(-tempW, 0);

                                x = -(tempW - MAX_HEIGHT)/2;
                                y = (tempH - MAX_WIDTH)/2;
                                break;
                        }
                    }

                    ctx.drawImage(tempImg, x, y, tempW, tempH);

                    //var img = document.createElement('img');
                    //img.src= canvas.toDataURL("image/jpeg", 0.8);
                    //document.body.appendChild(img);

                    return canvas.toDataURL("image/jpeg", 0.8);
                },
                editImage: function(){
                    'use strict';
                    if(imgCrop) {
                        imgCrop.cropper('destroy');
                    }
                    var bound = methods.getBoundWindow();
                    var minWidth = variables.containerWidth;
                    var minHeight = variables.containerHeight;

                    var boxWidth = variables.width;
                    var boxHeight = variables.height;
                    console.log(boxWidth);
                    console.log(boxHeight);
                    if(bound.width < 768) {
                        minWidth = variables.containerWidthMobile;
                        minHeight = variables.containerHeightMobile;

                        boxWidth = variables.widthMobile;
                        boxHeight = variables.heightMobile;
                        /*boxTop = 'auto';
                        boxLeft = 'auto';*/
                    }
                    imgCrop = variables.image.cropper({
                        //viewMode: 1,
                        aspectRatio: boxWidth/boxHeight,
                        minCropBoxWidth: boxWidth,
                        minCropBoxHeight: boxHeight,
                        minContainerWidth: minWidth,
                        minContainerHeight: minHeight,
                        dragMode: 'move',
                        cropBoxMovable: false,
                        cropBoxResizable: false,
                        zoomOnWheel: true,
                        built: function(){
                            /*if(bound.width >= 768) {
                                variables.image.cropper("setCropBoxData", {
                                    left: boxLeft,
                                    top: boxTop,
                                    width: boxWidth,
                                    height: boxHeight
                                });
                            }*/
                        },
                        zoom: function(e){
                            // zoom in
                            if(e.ratio != e.oldRatio){
                                var data = variables.image.cropper("getData");
                                if(data.width < variables.width || data.height < variables.height){
                                    e.preventDefault();
                                }
                            }
                        }
                    });
                },
                toDataURL: function(){
                    'use strict';

                    var canvas = variables.image.cropper('getCroppedCanvas');

                    return canvas.toDataURL("image/jpeg", 0.8);

                },
                init: function(options){
                    'use strict';

                    variables = {
                        file: $('#file-input'),
                        mask: $('.js-upload'),
                        editMask: $('.js-edit'),
                        image: $('#image-cropper'),
                        zoomControl: $('#slider-zoom'),
                        rotateControl: $('#slider-rotate'),
                        width: 230,
                        height: 230,
                        containerWidth: 260,
                        containerHeight: 260,
                        widthMobile: 230,
                        heightMobile: 230,
                        containerWidthMobile: 260,
                        containerHeightMobile: 260,
                        // maxWidth: 2048,
                        // maxHeight: 2048,
                        // maxWidthMobile: 1024,
                        // maxHeightMobile: 1024,
                        editImageCallback: function(ele){ },
                        selectImageCallback: function(ele){ },
                        beforeInitCropCallback: function(tempImg, callback){ },
                        afterInitCropCallback: function(){ },
                        errorFileType: function(){
                            alert("Vui lòng chọn hình đúng định dạng (.jpeg, .png, .jpg).\n");
                        },
                        errorFileSize: function(){
                            alert("Hình của bạn vượt quá 5 MB dung lượng cho phép. Vui lòng chọn hình có kích thước nhỏ hơn.\n");
                        },
                        errorSupport: function(){
                            alert("Trình duyệt không hỗ trợ tải ảnh, vui lòng cập nhật phiên bản mới.\n");
                        },
                        errorDimension: function(width, height){
                            alert("Vui lòng chọn hình có kích thước lớn hơn (" + width + 'px x ' + height + "px).\n");
                        }
                    };

                    if(typeof options === 'object') {
                        variables = $.extend(variables, options);
                    }

                    methods.trigger();
                    methods.readImage();
                }
            };
            return {
                init: methods.init,
                toDataURL: methods.toDataURL,
                resizeAndCropImage: methods.resizeAndCropImage
            }
        })();

        $(function() {
            var imageWidth = 250,
                imageHeight = 250;
            IUL.init({
                width: imageWidth,
                height: imageHeight,
                mask: $('.button--upload'),
                beforeInitCropCallback: function(tempImg, callback){
                    popup.showLoader();
                    // call api to check if img is valid
                    let json_data = JSON.stringify({
                        action: 'verify_photo',
                        access_token: '',
                        data: {
                            image: tempImg.src
                        }
                    });
                    $.ajax({
                        url: theme_path + '/api/milo-powder',
                        type: 'post',
                        data: {
                            json_data: json_data
                        },
                        complete: function(e) {
                            callback(e);
                        }
                    });
                },
                afterInitCropCallback: function(){
                    IUL.inited = true;
                },
                errorFileType: function(){
                    popup.showAlert('Lỗi', "Vui lòng chọn hình đúng định dạng (.jpeg, .png, .jpg).");
                },
                errorFileSize: function(){
                    popup.showAlert('Lỗi', "Hình của bạn vượt quá 5 MB dung lượng cho phép. Vui lòng chọn hình có kích thước nhỏ hơn.");
                },
                errorSupport: function(){
                    popup.showAlert('Lỗi', "Trình duyệt không hỗ trợ tải ảnh, vui lòng cập nhật phiên bản mới.");
                },
                errorDimension: function(width, height){
                    popup.showAlert('Lỗi', "Vui lòng chọn hình có kích thước lớn hơn (" + width + 'px x ' + height + "px).");
                }
            });

            //
            let data = {
                id: 0,
                base64: '',
                themeId: 1
            };
            $('.theme__item').on('click', function(e) {
                $(this).addClass('active').siblings('.active').removeClass('active');
                let themeId = $(this).attr('data-theme');
                let path = `${$('#image-frame').attr('src-path')}frame-${themeId}.gif`;
                $('#image-frame').removeClass('hidden').attr('src', path);
                data.themeId = themeId;
            });
            $('.btn--upload').on('click', function(e) {
                e.preventDefault();
                $('#file-input').trigger('click');
            });
            $('.btn--next').on('click', function(e) {
                e.preventDefault();
                if (IUL.inited) {
                    var tempImg = new Image();
                    tempImg.src = IUL.toDataURL();
                    tempImg.onload = function(){
                        var src = tempImg.src;
                        if(tempImg.width > 600) {
                            src = IUL.resizeAndCropImage(tempImg, 600, 600);
                        }
                        $('#image-content').attr('src', src);
                        data.base64 = src;
                    };
                    $('.edit-tools').addClass('hidden');
                    $('.upload__guide').addClass('hidden');
                    $('.btn--upload').addClass('hidden');
                    $('.btn--submit').removeClass('hidden');
                    $('.btn--edit').removeClass('hidden');
                    $('.theme').removeClass('hidden');
                    $(this).addClass('hidden');
                    $('.theme__item.theme__item--1').trigger('click');
                    $('.step__item.step--2').addClass('active');
                }
                else {
                    popup.showAlert('Lỗi','Bạn chưa up hình !');
                }
            });
            $('.btn--edit').on('click', function(e) {
                e.preventDefault();
                $('.edit-tools').removeClass('hidden');
                $('.upload__guide').removeClass('hidden');
                $('.btn--upload').removeClass('hidden');
                $('.btn--submit').addClass('hidden');
                $('.btn--next').removeClass('hidden');
                $('.theme').addClass('hidden');
                $(this).addClass('hidden');
                $('#image-frame').addClass('hidden').attr('src', '');
                $('#image-content').attr('src', '');
                $('.step__item.step--2').removeClass('active');
            });
            $('.btn--submit').on('click', function(e) {
                popup.showLoader();
                if (typeof FB != 'undefined') {
                    FB.login(function(response) {
                        if (response.authResponse) {
                            FB.api('/me',{fields: 'id, name, email'}, function(response) {
                                var id = response.id;
                                var name = response.name;
                                var email = (response.email) ? response.email : '';
                                var json_data = {};
                                json_data.action = 'login';
                                json_data.access_token = '';
                                json_data.data = {
                                    id: id,
                                    name: name,
                                    email: email
                                };
                                $.post(theme_path + '/api/milo-powder', { json_data: JSON.stringify(json_data) }).done(function(response){
                                    // console.log(response);
                                    _this.postServer(data);
                                });
                            });
                        } else {
                            //TODO: behavior in case of user canceling the authorization
                        }
                    }, { scope:'email'} );
                }
                else {
                    _this.postServer(data);
                }
            });
            $('.btn--facebook').on('click', function(e) {
                e.preventDefault();
                if (typeof FB != 'undefined') {
                    FB.ui({
                        method: 'feed',
                        display: 'popup',
                        link: $(this).attr('href')
                    }, function(response) {
                        // console.log('btn--facebook response');
                        // console.log(response);
                        if (typeof response != 'undefined') {
                            popup.showLoader();
                            let json_data = JSON.stringify({
                                action: 'upload_photo',
                                access_token: '',
                                data: {
                                    id: $('.btn--facebook').attr('data-id'),
                                    is_shared: 1
                                }
                            });
                            // console.log(json_data);
                            $.ajax({
                                url: theme_path + '/api/milo-powder',
                                type: 'post',
                                data: {
                                    json_data: json_data
                                },
                                complete: function(result) {
                                    popup.hideLoader();
                                    // console.log(result);
                                    if (result.responseJSON.status == 1) {
                                        if(result.responseJSON.data.redirect_url){
                                            window.location.replace(result.responseJSON.data.redirect_url);
                                            // console.log(result.responseJSON.data.redirect_url);
                                        }
                                    }
                                    else {

                                    }
                                }
                            });
                        }
                    });
                }
            });
        });
    }

    postServer(data) {
        this.applyFrame(data.base64, $('#image-frame')[0], 600, 600, function(thumb) {
            let json_data = JSON.stringify({
                action: 'upload_photo',
                access_token: '',
                data: {
                    image: data.base64,
                    thumb: thumb,
                    theme_id: data.themeId
                }
            });
            $.ajax({
                url: theme_path + '/api/milo-powder',
                type: 'post',
                data: {
                    json_data: json_data
                },
                complete: function(result) {
                    popup.hideLoader();
                    // console.log(result);
                    if (result.responseJSON.status == 1) {
                        $('.theme').addClass('hidden');
                        $('.summary').removeClass('hidden');
                        $('.btn--submit').addClass('hidden');
                        $('.btn--edit').addClass('hidden');
                        $('.btn--facebook').removeClass('hidden')
                            .attr('href', result.responseJSON.data.detail_url)
                            .attr('data-id', result.responseJSON.data.id);
                        $('.step__item.step--3').addClass('active');
                    }
                    else {

                    }
                }
            });
        });
    }

    applyFrame(source, frame, width, height, callback) {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        let img = new Image();
        img.src = source;
        img.onload = () => {
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
            ctx.drawImage(frame, 0, 0);
            callback(canvas.toDataURL('image/jpeg', 0.8));
        }
    }
}
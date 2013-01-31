$(document).ready(function () {

    //SLIDER CONTROLS START
        $('.big-slider').flexslider({
            animation: "slide",
            startAt: 0,           //Starting slide, starts counting from 0
            smoothHeight: 1,      //Smoothly autoheight
            slideshow: 1,         //Autochange slides
            animationSpeed: 600,  //Speed of animation
            slideshowSpeed: 20000,//Delay between slides
            randomize: 0,         //Random order slide
            video: 1,
            keyboard: 1,          //Controls with arrows
            mousewheel: 1,        //Controls with mousewheel
            directionNav: 0       //Cycle Controller
        });
    //SLIDER CONTROLS END


    //INLINE SLIDER CONTROLS START
    $('.inline-slider').flexslider({
        animation: "slide",
        startAt: 0,           //Starting slide, starts counting from 0
        smoothHeight: 1,      //Smoothly autoheight
        slideshow: 0,         //Autochange slides
        animationSpeed: 600,  //Speed of animation
        slideshowSpeed: 20000,//Delay between slides
        randomize: 0,         //Random order slide
        video: 1,
        keyboard: 1,          //Controls with arrows
        mousewheel: 1,        //Controls with mousewheel
        directionNav: 1,      //Arrow Controller
        controlNav: 0         //Cycle Controller
    });
    //INLINE SLIDER CONTROLS END

    //RECENT WORKS SLIDER STARTS
        if(parseInt($('body').css('width').replace('px')) > 479){
            var firstClass  = 'bigOne';
            var secondClass = 'smallOne';
        }else{
            var firstClass  = 'smallOne';
            var secondClass = 'bigOne';
        }

        var gonnaCopy = $('.recent-works').parent('.multipleSlider').parent('.fullContainer').html();
        $('.recent-works').parent('.multipleSlider').parent('.fullContainer').addClass(firstClass);
        $('.recent-works').parent('.multipleSlider').parent('.fullContainer').after('<section class="fullContainer '+secondClass+'">'+gonnaCopy+'</section>');


        $('.bigOne .recent-works ul').promptumenu({
            'width': 460,
            'height': 158,
            'rows': 2,
            'columns': 4,
            'direction': 'horizontal',
            'pages': true
        });
        $('.smallOne .recent-works ul').promptumenu({
            'width': 300,
            'height': 106,
            'rows': 2,
            'columns': 4,
            'direction': 'horizontal',
            'pages': true
        });
    //RECENT WORKS SLIDER ENDS

    //Tabbed Content Controls
    $('.tab-links').children('a').addClass('not-active');
    $('.tab-links').children('a:first-child').removeClass('not-active').addClass('active');

    $('.tab-links a').click(function(e){
        switchTabs($(this));
        e.preventDefault();
    });

    //MENU TOGGLER
    $('#topRightIcon').toggle(function(){
        $('nav').slideDown('slow');
        $(this).children('img').attr('src','images/topRightIconActive.png');
    },function(){
        $('nav').slideUp('slow');
        $(this).children('img').attr('src','images/topRightIcon.png');
    });

    //TOGGLE CONTENT
    $('.toggler').click(function(){
        var article = $(this).nextAll('article');
        if(article.css('display') == "block"){
            article.slideUp('slow').parent('.toggleContent').removeClass('open');
        }else{
            $('.open').removeClass('open').children('article').slideUp('slow');
            article.slideDown('slow').parent('.toggleContent').addClass('open');
        }
    });

});

function ajaxForm(me){

    var form = me.parent('form');
    var submitForm = 1;

    form.attr('onsubmit','return false');
    $('.ajax-loader').fadeIn();

    form.children().each(function(){

        var input = $(this);
        var attr = input.attr('required');

        if((input.is('input') || input.is('textarea')) && input.attr('type') != "submit"){

            if (typeof attr !== 'undefined' && attr !== false) {

                var html = input.val();
                html = html == "" ? input.html() : html;

                if(html == ""){

                   var warn = $('.warn_'+input.attr('name')).html();

                   if(warn == null){
                       input.after('<div class="warn_'+input.attr('name')+'">You forgot to enter your '+input.attr('placeholder')+' *.</div>');
                   }

                   submitForm = 0;

                }else{

                    var isEmail = input.attr('type');

                    if(isEmail == "email"){

                        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

                        if(!emailReg.test(input.val())) {

                            var warn = $('.warn_'+input.attr('name')).html();

                            if(warn == null){

                                input.after('<div class="warn_'+input.attr('name')+'">Please enter a valid '+input.attr('placeholder')+' address *.</div>');

                            }else{

                                $('.warn_'+input.attr('name')).html('Please enter a valid '+input.attr('placeholder')+' address *.');

                            }

                            submitForm = 0;
                        }

                    }else{

                        $('.warn_'+input.attr('name')).fadeOut();

                    }

                }

            }

        }

    });

    $('.ajax-loader').fadeOut();

    if(submitForm){
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: form.serialize(),
            success: function(returnedInfo){
                form.animate({
                    height: 70
                },500);
                if(returnedInfo == "1"){
                    form.html('<div class="mail-submit-message">Thank you!<br>We\'ve Received Your E-Mail.</div>');
                }else{
                    form.html('<div class="mail-submit-message">Our Mail Servers Are Not Responding Right ' +
                        'Now.<br>Please Try Again Later...</div>');
                }
            }
        });
    }

}

function switchTabs(tab){
    var parent = tab.parent('.tab-links').parent('.tabs');

    parent.children('.tab-links').children('a.active').removeClass('active').addClass('not-active');
    tab.removeClass('not-active').addClass('active');

    parent.children('.contents').children('article').css('display','none');
    parent.children('.contents').children('article#'+tab.attr('href')).css('display','block');

}
$(function (){
    if($('.navigation-3')[0]){


        $('http://www.tencent.com/js/.navigation-3 .popup_yead .yead').click(function (){
            if($('#years_'+parseInt($(this).text()))[0]){
                var year = $(this).html();
                $('body,html').animate({'scrollTop':$('#years_'+$(this).html()).offset().top},400);

                $('http://www.tencent.com/js/.navigation-3 .yead .line').remove();

                $('http://www.tencent.com/js/.navigation-3 .left .yead').each(function (){
                    if($(this).text() == year){
                        $(this).append('<div class="line"></div>');
                        console.log($(this)[0].offsetLeft,$(this).html());
                        $('http://www.tencent.com/js/.navigation-3 .wrap').css({'left':$(this).offset().left});
                    }
                });
            }


        });


        $('http://www.tencent.com/js/.page-main .bg').click(function (){
            $('http://www.tencent.com/js/.page-main .bg').css('display','none');
            $('.navigation-3').removeClass('an');
        })


    }
})
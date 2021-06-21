$(window).on('load', function(event){
    productImageResize();

    $(window).on("resize", function(){
        productImageResize();
    });

    $(".next").on("click", function(){
        let displayContent1 = $(".content1").css('display');
        if(displayContent1 == 'block'){
            $("#middleSection").children(".content2").css('opacity', 0);
            $("#middleSection").children(".content2").css('left', '10em');
            $("#middleSection").children(".content1").delay(50).animate({opacity:0, left: "-10em"}, 400, function(){
                $("#middleSection").children(".content1").css('display', 'none');
            });
            $("#middleSection").children(".content2").css('display', 'block');
            $("#middleSection").children(".content2").delay(200).animate({opacity:1, left: "0em"}, 400, function(){
                $("#middleSection").children(".content1").css('left', '0em');
            });
        }
        else{
            $("#middleSection").children(".content1").css('opacity', 0);
            $("#middleSection").children(".content1").css('left', '10em');
            $("#middleSection").children(".content2").delay(50).animate({opacity:0, left: "-10em"}, 400, function(){
                $("#middleSection").children(".content2").css('display', 'none');
            });
            $("#middleSection").children(".content1").css('display', 'block');
            $("#middleSection").children(".content1").delay(200).animate({opacity:1, left: "0em"}, 400, function(){
                $("#middleSection").children(".content2").css('left', '0em');
            });
        }
    });

    $(".previous").on("click", function(){
        let displayContent1 = $(".content1").css('display');
        if(displayContent1 == 'block'){
            $("#middleSection").children(".content2").css('opacity', 0);
            $("#middleSection").children(".content2").css('left', '-10em');
            $("#middleSection").children(".content1").delay(50).animate({opacity:0, left: "10em"}, 400, function(){
                $("#middleSection").children(".content1").css('display', 'none');
            });
            $("#middleSection").children(".content2").css('display', 'block');
            $("#middleSection").children(".content2").delay(200).animate({opacity:1, left: "0em"}, 400, function(){
                $("#middleSection").children(".content1").css('left', '0em');
            });
        }
        else{
            $("#middleSection").children(".content1").css('opacity', 0);
            $("#middleSection").children(".content1").css('left', '-10em');
            $("#middleSection").children(".content2").delay(50).animate({opacity:0, left: "10em"}, 400, function(){
                $("#middleSection").children(".content2").css('display', 'none');
            });
            $("#middleSection").children(".content1").css('display', 'block');
            $("#middleSection").children(".content1").delay(200).animate({opacity:1, left: "0em"}, 400, function(){
                $("#middleSection").children(".content2").css('left', '0em');
            });
        }
    });

    function productImageResize(){
        let productImageWidth = $("#productLeftImage").children().css('width');
        $("#productLeftImage").children().css('height', productImageWidth);
    }
});
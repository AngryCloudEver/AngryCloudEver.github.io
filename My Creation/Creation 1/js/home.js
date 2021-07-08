$(window).on('load', function(event){

    jQuery(function($){
        $("#loadingScreen").animate({opacity:0}, 800, function(){
            $("#loadingScreen").remove();
        });
    })(jQuery);

    loadingScreen();
    productImageResize();

    $(window).on("resize", function(){
        productImageResize();
    });

    $("#footer").load('footer.html')

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

    $(".whyUsContent").on("mouseenter", function(){
        let whyUsContentClass = $(this);
        let containerHeight = $(this).css('height');
        whyUsContentClass.animate({backgroundColor: "#1256A0"}, 200);
        whyUsContentClass.children().animate({opacity:0}, 200, function(){
            whyUsContentClass.children(".whyUsIcon").css('display', 'none');
            whyUsContentClass.children(".whyUsText").css('display', 'none');
            whyUsContentClass.children(".whyUsTextFlip").css('display', 'block');
            whyUsContentClass.children(".whyUsTextFlip").animate({opacity: 1}, 100);
            whyUsContentClass.css('height', containerHeight);
        });
    });

    $(".whyUsContent").on("mouseleave", function(){
        let whyUsContentClass = $(this);
        whyUsContentClass.animate({backgroundColor: "#4B9FC8"}, 100);
        whyUsContentClass.children().animate({opacity:0}, 200, function(){
            whyUsContentClass.children(".whyUsIcon").css('display', 'block');
            whyUsContentClass.children(".whyUsText").css('display', 'block');
            whyUsContentClass.children(".whyUsTextFlip").css('display', 'none');
            whyUsContentClass.children(".whyUsIcon").animate({opacity: 1}, 100);
            whyUsContentClass.children(".whyUsText").animate({opacity: 1}, 100);
            whyUsContentClass.css('height', "auto");
        });
    });

    $(".faqTitle").on("click", function(){
        var panel = this.nextElementSibling;
        var faqTitleClass = $(this);
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            this.style.backgroundColor = "#FFFAF9";
            faqTitleClass.children("h2").css("color", "#1256A0");
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            this.style.backgroundColor = "#1256A0";
            faqTitleClass.children("h2").css("color", "#FFFAF9");
        }
    });

    function loadingScreen(){
        $("#loadingScreen").children().animate({opacity:0}, 800, function(){
            $("#loadingScreen").children().animate({opacity:1}, 800); 
        });
    
        setTimeout(loadingScreen, 3000);
    }

    function productImageResize(){
        let productImageWidth = $("#productLeftImage").children().css('width');
        $("#productLeftImage").children().css('height', productImageWidth);
    }
});
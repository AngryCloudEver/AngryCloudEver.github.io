$(window).on('load', function(event){
    /*jQuery(function($){
        $("#loadingScreen").animate({opacity:0}, 800, function(){
            $("#loadingScreen").remove();
        });
    });

    $(window).on("resize", function(){
        location.reload(true);
    });*/

    $(".filmTitle").animate({opacity: 1, top: 0}, 800);
    $(".filmDate").delay(50).animate({opacity: 1, top: 0}, 800);
    $("#leftHeaderContainer").children().delay(50).animate({opacity: 1, left: 0}, 800);
    $("#middleHeaderContainer").delay(50).animate({opacity:1}, 800);

    let listMenu = $(".menuList");
    let listMenuNumber = $(".menuList").length;

    listMenu.each(function(index){
        $(this).delay(index * 125).animate({opacity: 1, top: 0}, 800);
    });

    $(".downArrow").delay(++listMenuNumber * 125).animate({opacity: 1, top: 0}, 800);

    
    $(".downArrow").on("click", function(){
        let targetScroll = $("#header").outerHeight();
        $('html, body').animate({scrollTop: targetScroll}, 1500);
    });

    $("#floatingMenu").on("click", function(){
        $("#rightHeaderContainer").css("display", "block");
        $("#rightHeaderContainer").css("position", "fixed");
        $("#rightHeaderContainer").css("width", "70%");
        $("#rightHeaderContainer").css("max-width", "400px");
        if(window.innerWidth <= 854 && window.innerHeight <= 400){
            $("#rightHeaderContainer").css("max-width", "200px");
        }
        else if(window.innerWidth <= 854 && window.innerHeight <= 480){
            $("#rightHeaderContainer").css("max-width", "300px");
        }
        $("#floatingMenu").animate({opacity: 0, right: 0}, 800);
        $("#rightHeaderContainer").animate({opacity: 1, right: 0}, 800);
    });

    $(document).on('click', function(e){
        if($("#rightHeaderContainer").css("position") == "fixed"){
            let menu = $("#rightHeaderContainer");
            let menuIcon = $("#menuIcon");

            if(!menu.is(e.target) && !menuIcon.is(e.target) && menu.has(e.target).length === 0){
                menu.animate({opacity: 0, right: "-100px"}, 800);

                if(window.innerWidth >= 481 && window.innerHeight <= 480){
                    $("#floatingMenu").animate({opacity: 1, right: "3em"}, 800, function(){
                        $("#rightHeaderContainer").delay(800).css("display", "none");
                    });
                }
                else if(window.innerWidth >= 481){
                    $("#floatingMenu").animate({opacity: 1, right: "3em"}, 800, function(){
                        $("#rightHeaderContainer").delay(800).css("display", "none");
                    });
                }
                else if(window.innerWidth >= 426){
                    $("#floatingMenu").animate({opacity: 1, right: "2em"}, 800, function(){
                        $("#rightHeaderContainer").delay(800).css("display", "none");
                    });
                }
                else if(window.innerWidth >= 376){
                    $("#floatingMenu").animate({opacity: 1, right: "1.5em"}, 800, function(){
                        $("#rightHeaderContainer").delay(800).css("display", "none");
                    });
                }
                else if(window.innerWidth >= 321){
                    $("#floatingMenu").animate({opacity: 1, right: "1.5em"}, 800, function(){
                        $("#rightHeaderContainer").delay(800).css("display", "none");
                    });
                }
                else{
                    $("#floatingMenu").animate({opacity: 1, right: "3em"}, 800, function(){
                        $("#rightHeaderContainer").delay(800).css("display", "none");
                    });
                }
            }
        }
    });

    $("#trailerVideoContainer").on('click', function(){
        $("#floatingContainer").css('display', 'block');
        $("#floatingTrailerVideo").get(0).load();
        $("#floatingTrailerVideo").get(0).play();
    });

    $("#floatingVideoContainer").children(".closeIcon").on('click', function(){
        $("#floatingContainer").css('display', 'none');
        $("#floatingTrailerVideo").get(0).pause();
    });

    //Change Image
    $(".introductionSubImage").on('click', function(){
        let newImage = $(this).attr('name');
        $(".mainImage").attr('src', newImage);
        $(".subImageMask").css('display', 'none');
        $(this).children('.subImageMask').css('display', 'block');
        
    });
});
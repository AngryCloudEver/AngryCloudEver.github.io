$(window).on('load', function(event){
    /*jQuery(function($){
        $("#loadingScreen").animate({opacity:0}, 800, function(){
            $("#loadingScreen").remove();
        });
    });

    $(window).on("resize", function(){
        location.reload(true);
    });*/

    $(".downArrow").on("click", function(){
        let targetScroll = $("#header").outerHeight();
        $('html, body').animate({scrollTop: targetScroll}, 800);
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
});
$(window).on('load', function(event){
    /*jQuery(function($){
        $("#loadingScreen").animate({opacity:0}, 800, function(){
            $("#loadingScreen").remove();
        });
    });*/

    $(window).on("resize", function(){
        location.reload(true);
    });

    $("#floatingMenu").on("click", function(){
        $("#rightHeaderContainer").css("display", "block");
        $("#rightHeaderContainer").css("position", "fixed");
        $("#rightHeaderContainer").css("width", "70%");
        $("#rightHeaderContainer").css("max-width", "400px");
        $("#floatingMenu").animate({opacity: 0, right: 0}, 800);
        $("#rightHeaderContainer").animate({opacity: 1, right: 0}, 800);
    });

    $(document).on('click', function(e){
        if($("#rightHeaderContainer").css("position") == "fixed"){
            let menu = $("#rightHeaderContainer");
            let menuIcon = $("#menuIcon");

            if(!menu.is(e.target) && !menuIcon.is(e.target) && menu.has(e.target).length === 0){
                menu.animate({opacity: 0, right: "-100px"}, 800);

                if(window.innerWidth <= 480){
                    $("#floatingMenu").animate({opacity: 1, right: "2em"}, 800);
                }
                else if(window.innerWidth <= 425){
                    $("#floatingMenu").animate({opacity: 1, right: "1.5em"}, 800);
                }
                else if(window.innerWidth <= 320){
                    $("#floatingMenu").animate({opacity: 1, right: "1em"}, 800);
                }
                else{
                    $("#floatingMenu").animate({opacity: 1, right: "3em"}, 800);
                }
            }
        }
    });
});
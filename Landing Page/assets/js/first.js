let isHover = false;


$(document).ready(function(){
    $("html, body").animate({scrollTop: $("body").offset().top}, 1000);
    $("aside, main").hide();

    $("#firstText1").animate({opacity: 1}, 800, function(){
        $("#firstText2").animate({opacity: 1}, 800, function(){
            $("#firstText").animate({opacity: 0}, 800, function(){
                $("#firstBackground").animate({opacity: 0},800, function(){
                    $("html, body").animate({scrollTop: $(document).height()}, 3000, function(){
                        $("#firstBackground2").animate({opacity: 0}, 800, function(){
                            $("#firstBackground").remove();
                            $("#firstBackground2").remove();
                            $("aside, main").show();
                            $("aside, main").animate({height: "100%"}, 800, function(){
                                $("#imageSidebar").animate({opacity: 1}, 800);
                                $(".hide").animate({opacity: 1}, 800);
                            });
                        });
                    });
                });
            })
        });
    });

    $("#containerSidebar").hover(function(){
        isHover = true;
        $("#containerImageSidebar").animate({top:"5%"}, 800);
        $("#dropDown").animate({top: "160%"}, 800, function(){});
        $("#dropDownList").animate({opacity: 1}, 1200);
    }, function(){
        $("#dropDownList").animate({opacity: 0}, 400, function(){
            $("#dropDownList").animate({opacity: 0}); 
            $("#containerImageSidebar").animate({top:"30%"}, 800);
            $("#dropDown").animate({top: "50%"}, 800);
            $("#dropDownList").animate({opacity: 0});  
            isHover = false;
        });
    });

    if(isHover == false){
        $("#dropDownList").animate({opacity: 0}); 
    }

    $(".list").hover(function(){
        $(this).animate({color: "#C52E27"}, 200);
    }, function(){
        $(this).animate({color: "#5BBBAC"}, 200);
    });
});

function goToCertainSection(section){
    if(section == "section1"){
        $("html, body").animate({scrollTop: $("#section1").offset().top}, 1000);
    }
    else if(section == "section2"){
        $("html, body").animate({scrollTop: $("#section2").offset().top}, 1000);
    }
    else if(section == "section3"){
        $("html, body").animate({scrollTop: $("#section3").offset().top}, 1000);
    }
    else if(section == "section4"){
        $("html, body").animate({scrollTop: $("#section4").offset().top}, 1000);
    }
    else if(section == "section5"){
        $("html, body").animate({scrollTop: $("#section5").offset().top}, 1000);
    }
    console.log(section);
}
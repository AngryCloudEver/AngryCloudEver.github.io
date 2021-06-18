$(window).on('load', function(event){
    let productImageWidth = $("#productLeftImage").children().css('width');
    $("#productLeftImage").children().css('height', productImageWidth);
});

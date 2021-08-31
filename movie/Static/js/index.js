$(function () {
    let cityCon = $(".city-container");
    cityCon.hover(function () {
        $(this).addClass('active');
    }, function () {
        $(this).removeClass('active');
    }); 
});
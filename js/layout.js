$(function(){ 
    var viewHeight = $(window).height();
    var footerHeight = $('#footer').height();
    var appHeight = $('#app').height();
    if(viewHeight > appHeight + footerHeight){
        $('#app').css({
            'margin-bottom': viewHeight - (appHeight + footerHeight)
        });
    }
});
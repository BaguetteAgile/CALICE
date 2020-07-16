
// Flickr widget
function flickIt(jQuerySelector, displayType, photosetId, opt_cbk){
    jQuerySelector.html('loading...');
    jQuerySelector.flickr({
        api_key: "7b5f9448ae4547ff02d6ce3db22e482d",
        type: 'photoset',
        photoset_id: photosetId,
        size: 'o',
        thumb_size: 'n',
        displayType: displayType,
        callback: function(){
            // lightbox
            if (displayType === 'fancybox'){
              $('a').fancybox();
            }
            // callback
            if (opt_cbk){
                opt_cbk(jQuerySelector);
            }
        },
        error: function(e){
            jQuerySelector.html('Error loading flickr gallery. ' + e);
        }
    });
}

function slideIt(jQuerySelector){
    $(jQuerySelector).find('ul > li:gt(0)').css('opacity', '0');
    setInterval(function() {
      $(jQuerySelector).find('ul > li:first')
        .fadeOut(1000)
        .next()
        .css('opacity', '1')
        .fadeIn(1000)
        .end()
        .appendTo($(jQuerySelector).find('ul'));
    },  10000);
}
function getPhotosetId(pageName){
    return pageName;
    //return albums[pageName] || albums['default'];
}
function onPageChange(){
    var pageId = $('.page-link-active').get(0).id;
    var currentPage = pageId.substr(pageId.indexOf('page-') + 5);
    window.jQuerySelector = $(".gallery");
    flickIt(jQuerySelector, 'fancybox', getPhotosetId(currentPage));
    $('.gallery').on('click', forceDisplay)
}
function forceDisplay() {
    setTimeout(function() { doForceDisplay() }, 0)
    setTimeout(function() { doForceDisplay() }, 1000)
}
function doForceDisplay() {
    $('.fancybox-wrap').on('click', forceDisplay)
    $('.fancybox-overlay').addClass('prevent-scale').css({
        'height': '100vh', 'position': 'absolute', 'top': 0,
        'width': '100vw',
        'height': '100vh',
        'display': 'block',
        'position': 'fixed',
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center'
    })
    $('.fancybox-wrap').css({
        'position': 'static',
        'margin': 'auto'
    })
    $(window).scrollTop(0)
    $(window).trigger('resize')

}
$(function(){
    window.jQuerySelector = $(".slideshow .silex-element-content");
    //flickIt(jQuerySelector, 'slideshow', albums.home, slideIt);
    var pageId = $('.page-link-active').get(0).id;
    var currentPage = pageId.substr(pageId.indexOf('page-') + 5);
    flickIt(jQuerySelector, 'slideshow', currentPage, slideIt);
    onPageChange();
})
$(window).bind( 'hashchange', function (e){
    onPageChange();
});
// end of flickr widget



/* animation on scroll widget */
$(function() {
    var $animation_elements = $('.animation-element');
    var $window = $(window);

    function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);
    
    $.each($animation_elements, function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);
    
        //check to see if this current container is within viewport
        if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)) {
        $element.addClass('in-view');
        } else {
        $element.removeClass('in-view');
        }
    });
    }

    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');

})
/* /animation on scroll widget */


 //////////////////////////////////////////
// silex reflection widget
document.write('<script type="text/javascript" src="reflection.js"></'+'script>');
$(function(){
    console.log('reflect');
    $(".reflect img").reflect().on('load', function(){
        // let the reflection apear
        $(".reflect div").width('100%').height('100%').css('overflow', 'visible');  
        // restore silex setting for the image element 
        $(this).width('100%').height('100%');  
    });
});
//////////////////////////////////////////



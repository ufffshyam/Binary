(function ( $ ) {
    $.fn.banner = function( options ) {
        if(options.open  == false){
            $(this).css('display', 'none');
            return false;
        }
        $(this).css({'background': '#01000175','border-radius': '2px', 'box-shadow': '0px 0px 10px rgba(0,0,0,0.5)','width': '100%', 'height': '100%', 'margin': '0 auto', 'position': 'fixed', 'top': '0', 'left': '0', 'z-index': '1000000'});
        var isVisited = CheckUserVisitedOrNotVisited("visited");
        if (isVisited) {
            $(this).css('display', 'none');
            return false;
        }
        this.append('<div id="video-play-check-prompt" class="modal-prompt"><img src="'+options.url+'" height="100%" width="100%"/><button class="button-enter btn styled-submit" data-params='+JSON.stringify(options)+'>X</button></div>');
        $(this).find('.modal-prompt').css({'background': '#ffffff', 'border': '12px solid #f2f2f2cc', 'box-shadow': '0px 0px 10px rgba(0,0,0,0.5)','width': (options.width ? options.width : '590px'),'height': (options.height ? options.height : '400px'),'margin': '0 auto','position': 'relative','top': '17%','z-index': '1000000','max-width': '1189px','max-height':'400px'});
        $(this).find('.modal-prompt .styled-submit').css({'display':'inline-block','position':'ABSOLUTE','top':'-22px','right':'-22px','background':'black','color':'#fff','font-size':'20px','padding':'6px 10px','border':'0px','border-radius':'50%','cursor':'pointer'});
        if(options.days){
            removePopupForVisited(options.days);
        }
        return true;
    }
   
    $(document).on('click', 'button.styled-submit', function(){
        removePopupForVisitedClick($(this), $(this).data('params'));
    });
  
    function CheckUserVisitedOrNotVisited(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
   
    function removePopupForVisited(days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
        document.cookie = "visited=true;" + expires + "; path=/";
    }
   
    function removePopupForVisitedClick(selector, params){
        if(params.days){
            removePopupForVisited(params.days);
        }
        selector.parent().parent().css('display', 'none');
    }
}( jQuery ));  

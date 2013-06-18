define(['jquery'],function(jQuery){
    function InitLogDisplay() {
		if(jQuery('#logger').length <= 0){	
			$('body').append('<ul id="logger" ><li>Description</li></ul>');
			$('head').append('<style type="text/css">#logger {position: absolute;opacity: 0.75;top:0;left:0;z-index:1;background: #eee;width: 200px;padding: 5px;-moz-box-shadow: 2px 2px 5px #000;-webkit-box-shadow: 2px 2px 5px #000;}</style>');
		}
		return jQuery('#logger')
				.find('li')
					.slice(1,jQuery('#logger').find('li').size()-8)
						.animate({'opacity':'0', 'height':'0'},function(){jQuery(this).remove()})
					;
	}
	
	var u = navigator.userAgent, app = navigator.appVersion; 
	
	return {
		'log' : function(event_, obj) {
			// ignore bubbled handlers
			//		if ( obj.originalEvent.currentTarget !== obj.originalEvent.target ) { return; }
			obj.originalEvent.preventDefault();
			
			InitLogDisplay()
				.append('<li><b>'+jQuery(obj.originalEvent.currentTarget).attr('class')+'</b>: '+obj.description+ ' : '+obj.type +'</li>');
		},
		'log1' : function(info) {
			InitLogDisplay();
			jQuery('#logger').append('<li><b>'+'info:'+'</b>: '+info +'</li>');
		}
    }
});
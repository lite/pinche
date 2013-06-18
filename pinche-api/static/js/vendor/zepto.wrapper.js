/* Zepto wrapper */
require(['vendor/zepto.min'],function(){
	// Expose Zepto as an AMD module
	if (typeof Zepto != 'undefined' && typeof define === "function" && define.amd && (define.amd.jQuery || define.amd.zepto) ) {
	console.debug("zepto");
		define( "jquery", [], function () { return Zepto; } );
		define( "zepto", [], function () { console.debug("zepto");return Zepto; } );
	}
});
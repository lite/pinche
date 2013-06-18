require.config({
  paths: {
    'jquery': 'vendor/jquery-2.0.2.min',
    'jqMobile': 'vendor/jquery.mobile-1.3.1',
    'bootstrap':'vendor/bootstrap.min' ,
    'common':'common',
    'mbp': 'helper',
    'zepto': 'vendor/zepto'
  },
  shim: {
    garlic:{
      deps: ['zepto']
    },
    happy:{
      deps: ['zepto']
    },
    zepto:{
      exports:"$"
    },
    bootstrap:{
      deps: ['jquery']
    },
    jqMobile: {
      deps: ['css!../../css/jquery.mobile-1.3.1.min.css']
    }
  }
});

//requirejs(['helper']);

require(['jquery'],function() {
console.debug("jquery");
});


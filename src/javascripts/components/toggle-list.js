(function($){
  $.fn.toggleList = function(options) {

    var defaults = {
      headSelector: '> :eq(0)', // First child
      bodySelector: '> :eq(1)'  // Second child
    };
    return this.each(function() {

      if (options) $.extend(defaults, options);

      $(this).children().each(function(){
        var item = $(this);
        var head = item.find(defaults.headSelector);
        var body = item.find(defaults.bodySelector);
        var link = $('<a href="#"></a>');

        link.click(function(evt) {
          item.toggleClass('active');
          return false;
        });

        head.wrapInner(link);
      });
    });
  };

  // Data API
  $('[data-toggle="togglelist"]').each(function() {
    $(this).toggleList();
  });
})( jQuery );

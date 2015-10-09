owlFunctions = {
  //===============================================
  // Randomize order of slides.
  //
  // Usage:
  //   {
  //     beforeInit: owlFunctions.randomize,
  //     ...
  //   }
  //===============================================
  randomize: function($element) {
    $element.children().sort(function(){
      return Math.round(Math.random()) - 0.5;
    }).each(function(){
      $(this).appendTo($element);
    });
  },

  //===============================================
  // Auto-height that works when multiple items
  // are displayed.
  //
  // Usage:
  //   {
  //     afterInit: owlFunctions.autoHeight.init,
  //     afterAction: owlFunctions.autoHeight.action,
  //     ...
  //   }
  //===============================================
  autoHeight: {
    init: function ($element) {
      this.wrapperOuter.addClass('autoHeight');
    },
    action: function($element) {
      var carousel = this;
      var maxHeight = 0;

      this.$owlItems.filter(
        function(index){
          return $.inArray(index, carousel.visibleItems) >= 0;
        }
      ).each(
        function(index){
          var height = $(this).height();
          if (height > maxHeight) {
            maxHeight = height;
          }
        }
      );
      carousel.wrapperOuter.height(maxHeight);
    }
  }

}

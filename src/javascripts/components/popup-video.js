$(document).ready(function() {
  $('.popup-jwvideo').each(function(index) {
    if ($(this).attr('href')) {
      var defaults = {
        width: "100%",
        aspectratio: "16:9",
        bufferlength: 1,
        controlbar: 'bottom',
        autostart: false,
        file: $(this).attr('href'),
        ga: {}
      }

      var container = $('<div class="mfp-hide video-popup" id="jwpopup_'+index+'"><div id="jwvideo_'+index+'"></div></div>');
      $('.wrapper-site').append(container);

      attrs = $(this).get(0).attributes;
      extra = {};
      $.each(attrs, function(i, v) {
        if (v.name.match(/^data-jw-/)) extra[v.name.slice(8)] = v.value;
      })
      options = $.extend(defaults, extra);
      jwplayer('jwvideo_'+index).setup(options);
      $(this).attr('data-mfp-src', '#jwpopup_'+index);
    }
  });

  $('.popup-youtube, .popup-vimeo').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: !1,
      fixedContentPos: !1
  })

  $('.popup-jwvideo').magnificPopup({
      type: 'inline',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      fixedContentPos: !1,
      callbacks: {
        open: function() {
          var player = jwplayer(this.currItem.inlineElement.children('div').attr('id'));
          player.play()
        }
      }
  });
});

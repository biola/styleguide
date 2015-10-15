$(document).ready(function() {
  // Make sure jwplayer is loaded
  if (typeof(jwplayer) == 'function') {
    $('.inline-jwvideo').each(function(index) {
      if ($(this).attr('data-jw-file')) {
        var defaults = {
          width: "100%",
          aspectratio: "16:9",
          bufferlength: 1,
          controlbar: 'bottom',
          autostart: false,
          file: $(this).attr('data-jw-file'),
          ga: {}
        }

        attrs = $(this).get(0).attributes;
        extra = {};
        $.each(attrs, function(i, v) {
          if (v.name.match(/^data-jw-/)) extra[v.name.slice(8)] = v.value;
        })
        options = $.extend(defaults, extra);
        var vid = $(this).attr('id')||'jwvideo_inline_'+index;
        $(this).attr('id',vid);
        var player = jwplayer(vid).setup(options);
        player.onReady(function() {
          $('#'+$(this).attr('id')).addClass('media-inline');
        });
      }
    });

    $('.inline-jwaudio').each(function(index) {
      if ($(this).attr('data-jw-file')) {
        var defaults = {
          width: "100%",
          height: 40,
          bufferlength: 1,
          autostart: false,
          file: $(this).attr('data-jw-file'),
          ga: {}
        }

        attrs = $(this).get(0).attributes;
        extra = {};
        $.each(attrs, function(i, v) {
          if (v.name.match(/^data-jw-/)) extra[v.name.slice(8)] = v.value;
        })
        options = $.extend(defaults, extra);
        var vid = $(this).attr('id')||'jwaudio_inline_'+index;
        $(this).attr('id',vid);
        var player = jwplayer(vid).setup(options);
        player.onReady(function() {
          $('#'+$(this).attr('id')).addClass('media-inline');
        });
      }
    });
  } else {
    console.warn('biola-styleguide/inline-media.js : JW Player is not loaded')
  }
});

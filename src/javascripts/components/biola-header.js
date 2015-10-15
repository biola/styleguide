$(document).ready(function() {

  // Auto-focus search input when shown
  $('.dropdown.bnav-btn-search').on('shown.bs.dropdown', function() {
    $(this).find('input[name="q"]').focus();
  });

});

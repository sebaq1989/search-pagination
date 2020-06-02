// EVENT HANDLERS
// =============================================================================

$( window ).on('load', model.startApp());
$('.pagination li').on('click', 'a', model.changePage);
$('button').click(model.searchStudents);

const model = ( function() {

  // global vars
  const liCount = $('ul').children().length;
  const $pageHeader = $('.page-header');
  const $pageDiv = $('.page');
  const $studentList = $( "li.student-item" );

// PAGEINIT HANDLERS
// =============================================================================

// on page load all the functions are called to build dynamic HTML with JS
  function addSeachAndPagination() {
    setInitialList();
    addSearchInput();
    addPaginationButtons();
    addSearchFeedback();
  }

// loops through the first 10 <li> and shows them. Hides the rest.
  function setInitialList() {
    $studentList.each(function( index ) {
        if ( index >= 10 ) {
          $( this ).hide();
        } else {
          $( this ).show();
        }
    });
  }

// adds the search box
  function addSearchInput() {
    let $searchBox = (`
      <div class="student-search">
        <input placeholder="Search for students...">
        <button>Search</button>
      </div>`);
    $pageHeader.append($searchBox);
  }

// adds the pagination buttons to the page accounting for number of <li>
  function addPaginationButtons() {

    let length = 0;
    let $paginationDiv = $('<div class="pagination"></div>');
    let $paginationUl = $('<ul></ul>');

    if (liCount <= 10 ) {
      return true;
    } else {

      length = Math.floor(liCount / 10);
      for(let i = 1; i <= length + 1; i++){
        $paginationUl.append('<li><a class="active" href="#">'+ i +'</a></li>');
      }
      $paginationDiv.append($paginationUl);
      $pageDiv.append($paginationDiv);

    }
  }

// adds the error message for no search results
  function addSearchFeedback(){
    $('ul.student-list').append('<p class="no-results">No Result Have Been Found</p>');
    $('p').hide();
  }

// ONPAGE HANDLERS
// =============================================================================

// resets error message and input, detects pagintion button, accounts for paging number
  function changePagination() {
    $('p').hide();
    $('input').val('');
    const pageBtnClicked = $(this).text();
    pageBtnClicked === "1" ? setInitialList() : calculatePageChange(pageBtnClicked);
  }

// gets search input, accounts for empty input, passes the query for search, handles errors
  function searchListItems(){
    const userInput = $(this).closest('div').find('input').val().split('@')[0];
    const queryStr = formatStrings(userInput);
    if(queryStr.length > 0){
      $('p').hide();
      const searchCount = filterItems(queryStr);
      if(searchCount === 0) {
        $('p').show();
      }
    }
  }

// HELPER FUNCTIONS
// =============================================================================

// calulates which <li> to display based on the pagination button clicked
  function calculatePageChange(page) {
    const pageCount = parseInt(page) * 10;
    $studentList.each(function( index ) {
        if ( index >= ( pageCount - 10 ) && index < pageCount ) {
          $( this ).show();
        } else {
          $( this ).hide();
        }
    });
  }

// uses regex to format the search input for querying
  function formatStrings(str){
    $('input').val('');
    const regex = /[^a-z0-9]/gi;
    return str.replace(regex,'').toLowerCase();
  }

// performs query by looping <li>, shows and hides accordingly, returns count of mathces
  function filterItems(query) {
    let count = 0;
    $.map( $studentList, function( li ) {
      if ( formatStrings($(li).find('h3').text()).indexOf( query ) > -1 ) {
        $( li ).show();
        count++;
      } else {
        $( li ).hide();
      }
    });
    return count;
  }

// MODULE OBJECT RETURNED
// =============================================================================

  return {
    startApp: addSeachAndPagination,
    changePage: changePagination,
    searchStudents: searchListItems,
  };

})();

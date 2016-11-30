const $urlDisplay = $('.url-display');

$('.submit-button').on('click', (e) => {
  e.preventDefault();
  let longUrl = $('.long-url').val();
  let data = {
    longUrl: longUrl
  };
  $.post('/urls', data)
    .then(turnUrlsIntoElements)
    .then(putUrlOnPage);
});

// const turnUrlIntoElement = (response) => {
//   return $(`<a href='${response.id}' target='_blank'>${response.id}</a>`);
// };
//
// const putUrlOnPage = (element) => {
//   $urlDisplay.html(element);
// };

const turnUrlsIntoElements = (response) => {
  return response.map((link) => $(`<li><a href='${link.id}' target='_blank'>${link.id}</a></li>`) );
};

const putUrlOnPage = (element) => {
  $urlDisplay.html(element);
};

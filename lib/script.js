const $urlDisplay = $('.url-display');

$('.submit-button').on('click', (e) => {
  e.preventDefault();
  let longUrl = $('.long-url').val();
  let data = {
    longUrl: longUrl
  };
  $.post('/urls', data)
    .then(turnUrlIntoElement)
    .then(putUrlOnPage);
});

const turnUrlIntoElement = (response) => {
  return $(`<a href='${response.id}' target='_blank'>${response.id}</a>`);
};

const putUrlOnPage = (element) => {
  $urlDisplay.html(element);
};

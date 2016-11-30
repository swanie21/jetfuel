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

const turnUrlsIntoElements = (response) => {
  return response.map((link) => $(`<li><a href='${link.id}' target='_blank'>${link.id}</a></li>`) );
};

const putUrlOnPage = (element) => {
  $urlDisplay.append(element);
};

const $urlDisplay = $('.url-display');

$('.submit-button').on('click', (e) => {
  e.preventDefault();
  let longUrl = $('.long-url').val();
  let data = {
    longUrl: longUrl
  };
  $.post('/urls', data)
    .then(turnUrlsIntoElements)
    .then(putUrlsOnPage);
});

const linkify = (link) => `<li><a href='${link.id}' target='_blank'>${link.id}</a></li>`

const turnUrlsIntoElements = (response) => response.map((link) => $(linkify(link)));

const putUrlsOnPage = (element) => {
  $urlDisplay.append(element);
};

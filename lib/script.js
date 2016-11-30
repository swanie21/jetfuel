const $urlDisplay = $('.url-display');
const host = window.location.origin;



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

const fetchUrls = () => {
  $.getJSON('/urls')
    .then(turnUrlsIntoElements)
    .then(putUrlOnPage);
};

const turnUrlsIntoElements = (response) => {
  return response.map((link) => $(`<li><a href='${link.id}' target='_blank'>${host}/${link.id}</a><span> Clicks: ${link.clicks}</span></li>`) );
};

const putUrlOnPage = (element) => {
  $urlDisplay.html(element);
};

fetchUrls();

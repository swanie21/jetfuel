const $urlDisplay = $('.url-display');

$('.tinyify-form').on('submit', (e) => {
  e.preventDefault();
  let longUrl = $('.long-url').val();
  let data = {
    longUrl: longUrl
  };
  $.post('http://localhost:3000/urls', data)
    .then(turnUrlIntoElement)
    .then(putUrlOnPage);
});

const turnUrlIntoElement = (response) => {
  console.log(response);
  return $(`<a href='http://localhost:3000/${response.id}' target='_blank'>http://localhost:3000/${response.id}</a>`);
};

const putUrlOnPage = (element) => {
  $urlDisplay.html(element);
};

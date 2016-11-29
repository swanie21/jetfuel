const $urlDisplay = $('.url-display');

$('.submit-button').on('click', (e) => {
  console.log('hey');
  e.preventDefault();

  let longUrl = $('.long-url').val();
  let data = {
    longUrl: longUrl
  };
  $.post('/urls', data)
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
    // .then(putUrlOnPage);
});

const turnUrlIntoElement = (response) => {
  console.log(response);
  return $(`<a href='${response.id}' target='_blank'>${response.id}</a>`);
};

const putUrlOnPage = (element) => {
  console.log(element);
  $urlDisplay.html(element);
};

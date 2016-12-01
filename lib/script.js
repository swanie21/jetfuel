const $urlDisplay = $('.url-list');
const host = window.location.origin;
let mostPopularAreOnTop = true;
let mostRecentAreOnTop = false;


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

$('.sort-by-clicks-button').on('click', ()=>{
  mostPopularAreOnTop = !mostPopularAreOnTop;
  displayByPopularity();
})

$('.sort-by-time-button').on('click', ()=>{
  console.log('time fired')
  mostRecentAreOnTop = !mostRecentAreOnTop;
  displayByTimestamp();
})

const displayByPopularity = () => {
  $.getJSON('/urls')
    .then(sortByClicks)
    .then(turnUrlsIntoElements)
    .then(putUrlOnPage);
};

const sortByClicks = (response) => {
  return mostPopularAreOnTop ? response.sort((a, b) => b.clicks - a.clicks) : response.sort((a, b) => a.clicks - b.clicks);
}

const sortByTimestamp = (response) => {
  return mostRecentAreOnTop ? response.sort((a, b) => b.timestamp - a.timestamp) : response.sort((a, b) => a.timestamp - b.timestamp);
}

const displayByTimestamp = () => {
  $.getJSON('/urls')
  .then(sortByTimestamp)
  .then(turnUrlsIntoElements)
  .then(putUrlOnPage);
}

const turnUrlsIntoElements = (response) => {
  return response.map((link) => $(`<li><a href='${link.id}' target='_blank'>${host}/${link.id}</a><span> Clicks: ${link.clicks}</span></li>`) );
};

const putUrlOnPage = (element) => {
  $urlDisplay.html(element);
};

displayByPopularity();

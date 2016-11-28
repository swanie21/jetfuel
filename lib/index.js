
$('.tinyify-form').on('submit', (e) => {
  e.preventDefault();
  let longUrl = $('.long-url').val()
  $.post('localhost:3000/urls', longUrl).then(()=>console.log(longUrl));
})

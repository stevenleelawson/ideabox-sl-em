var $saveButton = $('.save-button');
var $title = $('.title-input');
var $body = $('.body-input');
var $ideaCard = $('.idea-card');
var $ideaSection = $('.idea-section')

$saveButton.click(appendIdea);
$('.idea-section').on('click', '.upvote', upvoteButton);
// $downvote.click(toggleQuality);

function IdeaConstructor(title, body, quality) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = quality || 'swill';
};

function appendIdea() {
  $('.idea-section').append(
    `<article class="idea-card">
      <h2>${$title.val()}</h2>
      <input type="image" src="images/delete.svg" class="delete">
      <p class="body-text">${$body.val()}</p>;
      <input type="image" src="images/upvote.svg" alt="upvote image" class="upvote">
    </article>`);
};


function upvoteButton() {
  var quality = $(this).parent().find('.quality').text();
  if (quality === 'swill') {
    $(this).parent().find('.quality').text("plausible");
  } else {
    $(this).parent().find('.quality').text('genius');
  }
};

$ideaSection.on('click', '.delete', function(e){
  $(this).parent().remove();
  console.log(e);
})

$(document).ready(rebuildIdea);


var $saveButton = $('.save-button');
var $title = $('.title-input');
var $body = $('.body-input');
var $ideaCard = $('.idea-card');
var $ideaSection = $('.idea-section')

$saveButton.click(createIdea);
$('.idea-section').on('click', '.upvote', upvoteButton);
$ideaSection.on('click', '.downvote', downvoteButton);
// $downvote.click(toggleQuality);

function Idea(title, body, quality) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = quality || 'swill';
};

function storeIdea (ideaCard){
  var stringifiedIdea = JSON.stringify(ideaCard);
  localStorage.setItem('ideaCard', stringifiedIdea);
  //associate idea card with IdeaConstructor function
  //grab all generated cards and store them
}

function rebuildIdea(){
  var retrievedCard = localStorage.getItem('ideaCard');
  var parsedCard = JSON.parse(retrievedCard);
  appendIdea(parsedCard);
}

function createIdea(){
  var title = $title.val();
  var body = $body.val();
  var ideaCard = new Idea(title, body);
  var ideaArray = [];
  ideaArray.push(ideaCard);

  appendIdea(ideaCard)
  storeIdea(ideaCard);
}

function appendIdea(ideaCard) {
  $('.idea-section').append(
    `<article class="idea-card">
      <h2>${ideaCard.title}</h2>
      <input type="image" src="images/delete.svg" class="delete">
      <p class="body-text">${ideaCard.body}</p>;
      <input type="image" src="images/upvote.svg" alt="upvote image" class="upvote">
      <input type="image" src="images/downvote.svg" alt="downvote image" class="downvote">
      <p class="quality">swill</p>
    </article>`)
  $title.val('');
  $body.val('');
};


function upvoteButton() {
  var quality = $(this).parent().find('.quality').text();
  if (quality === 'swill') {
    $(this).parent().find('.quality').text("plausible");
  } else {
    $(this).parent().find('.quality').text('genius');
  }
};
function downvoteButton(){
  var quality = $(this).parent().find('.quality').text();
  if (quality === 'genius'){
    $(this).parent().find('.quality').text("plausible");
  } else {
    $(this).parent().find('.quality').text("swill");

  }
}
$ideaSection.on('click', '.delete', function(e){
  $(this).parent().remove();
})

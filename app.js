$(document).ready(rebuildIdea);

var ideaArray = [];
var $saveButton = $('.save-button');
var $title = $('.title-input');
var $body = $('.body-input');
var $ideaCard = $('.idea-card');
var $ideaSection = $('.idea-section')

$saveButton.click(createIdea);
$ideaSection.on('click', '.upvote', upvoteButton);
$ideaSection.on('click', '.downvote', downvoteButton);
// $downvote.click(toggleQuality);

function Idea(title, body, quality) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = quality || 'swill';
};

function storeIdea (key, ideaCards){
  var stringifiedIdea = JSON.stringify(ideaCards);
  localStorage.setItem(key, stringifiedIdea);
}

function rebuildIdea(){
  // var retrievedCards = localStorage.getItem('ideaCards') || [];
  var parsedCards = JSON.parse(localStorage.getItem('ideaCards')) || [];
  console.log(parsedCards);
  parsedCards.forEach(function () {
    createIdea();
  });
}

function displayStoredIdeas() {

}

function createIdea(){
  var title = $title.val();
  var body = $body.val();
  var ideaCard = new Idea(title, body);
  // ideaArray.push(ideaCard);
  appendIdea(ideaCard)
  storeIdea(ideaCard.id, ideaCard);
}

function appendIdea(ideaCard) {
  $ideaSection.append(
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

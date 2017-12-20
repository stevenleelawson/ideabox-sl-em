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
$ideaSection.on('click', function(e){
  preventDefault(e);
  // $title.val('');
  // $body.val('');
});


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
  // parsedCards.forEach(function(val, index, array) {
  //   appendIdea(parsedCards);
  // });

  for(var i = 0; i < localStorage.length; i++) {
    console.log(localStorage[i]);
  }
//   function fetchIdea(idea) {
//  for (var i = 0; i < localStorage.length; i++){
//    var retrieveObject = localStorage.getItem(localStorage.key(i));
//    var parsedObject = JSON.parse(retrieveObject);
//    prependIdea(parsedObject);
//  }
// }
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
  $ideaSection.prepend(
    `<article class="idea-card card">
      <div class="top-line">
        <h2>${ideaCard.title}</h2>
        <input type="image" src="images/delete.svg" class="delete">
      </div>
      <p class="body-text">${ideaCard.body}</p>
      <div class='vote-buttons'>
        <input type="image" src="images/upvote.svg" alt="upvote image" class="upvote">
        <input type="image" src="images/downvote.svg" alt="downvote image" class="downvote">
        <div class="quality-container"
          <p class="body-text">quality: </p>
          <p class="quality">&nbsp swill</p>
        </div>
      </div>
    </article>`)
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
  $(this).parents('.card').remove();
})

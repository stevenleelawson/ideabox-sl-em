$(document).ready(rebuildIdea);

var $saveButton = $('.save-button');
var $title = $('.title-input');
var $body = $('.body-input');
var $ideaCard = $('.idea-card');
var $ideaSection = $('.idea-section')
var $searchBox = $('#search-box');

$saveButton.click(createIdea);

$ideaSection.on('click', '.upvote', upvoteButton);

$ideaSection.on('click', '.downvote', downvoteButton);

function Idea(title, body, quality) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = quality || 'swill';
};

function storeIdea (key, ideaCards){
  var stringifiedIdea = JSON.stringify(ideaCards);
  localStorage.setItem(key, stringifiedIdea);
  console.log(ideaCards)
}

function rebuildIdea(){
  for (var i = 0; i < localStorage.length; i++){
    var retrievedObject = localStorage.getItem(localStorage.key(i));
    var parsedObject = JSON.parse(retrievedObject);
    appendIdea(parsedObject);
  }
}

function createIdea(){
  var title = $title.val();
  var body = $body.val();
  var ideaCard = new Idea(title, body);
  appendIdea(ideaCard)
  storeIdea(ideaCard.id, ideaCard);
}

function appendIdea(ideaCard) {
  $ideaSection.append(
    `<article class="idea-card card"  id=${ideaCard.id}>
      <div class="top-line">
        <h2 contentEditable = "true">${ideaCard.title}</h2>
        <input type="image" src="images/delete.svg" class="delete">
      </div>
      <p class="body-text" contentEditable = "true">${ideaCard.body}</p>
      <div class='vote-buttons'>
        <input type="image" src="images/upvote.svg" alt="upvote image" class="upvote">
        <input type="image" src="images/downvote.svg" alt="downvote image" class="downvote">
        <div class="quality-container"
          <p class="body-text">quality: &nbsp</p>
          <p class='quality'>swill</p>
        </div>
      </div>
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
}

function downvoteButton(){
  var quality = $(this).parent().find('.quality').text();
  if (quality === 'genius'){
    $(this).parent().find('.quality').text("plausible");
  } else {
    $(this).parent().find('.quality').text("swill");

  }
}

$ideaSection.on('click', '.delete', function(e){
  var storageId = $(this).parents('.card').attr('id');
  localStorage.removeItem(storageId);
  $(this).parents('.card').remove();
})

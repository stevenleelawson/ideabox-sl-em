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
        <h2 contentEditable = "true" class="title">${ideaCard.title}</h2>
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

$ideaSection.on('blur', '.card', function(e){
  var cardId = $(this).attr('id');
  //set item by it's unique id, set in constructor object
  // console.log(cardId)
  var pulledObject = localStorage.getItem(cardId);
  //once we have the items id, get it from localStorage
  // console.log(pulledObject)
  var parsedObject = JSON.parse(pulledObject);
  //translate back into javaScript
  // console.log(parsedObject)
  var userTitle = $(this).find('.title').text();
  //grab and set value for whatever user types into title
  // console.log(userTitle);
  // console.log(parsedObject.title)
  parsedObject.title = userTitle;
  //reassign the parsed object title to that of what the user types in
  // console.log(userTitle)
  var stringedObject = JSON.stringify(parsedObject);
  // console.log(stringedObject);
  localStorage.setItem(cardId, stringedObject);
})

$ideaSection.on('blur', '.card', function(e){
  var cardId = $(this).attr('id');
  // grab item by its id using this, double check what this is
  // console.log(this)
  // console.log(cardId);
  var pulledObject = localStorage.getItem(cardId);
  //you are pulling a JSON object from localStorage that has already been stored when card is created in createIdea
  // console.log(pulledObject)
  var parsedObject = JSON.parse(pulledObject);
  // console.log(parsedObject)
  //retrievedObject is assigned to the parsed parsedObject
  //this is now back in good ol JS, INSTEAD of JSON
  var userBodyText = $(this).find('.body-text').text();
  // console.log(userBodyText)
  // saving to a variable what is already on the card when it was created and now can be edited by the user thanks to edit content = true on html element
  parsedObject.body = userBodyText;
  // console.log(userBodyText)
  //reassinging the parsed object title we got from local storage way back when to what the user is typing/trying to edit
  var stringifiedObject = JSON.stringify(parsedObject);
  // console.log(stringifiedObject);
  localStorage.setItem(cardId, stringifiedObject);
  //lastly, setting updated item in local storage using it's key and ready to be stored stringified object!!!! You did it, wolf, thanks to Sabrina...
})

// 1. select parent section and use the event blur which activates when tabbed out of element. opposite of focus
// 2. set variable to grab attribute of card ID; console log this as a sanity check
// 3. pull object from local storage to be edited and set to varible(first)
// 4. destringify object from local storage
// 5. set variable to grab what edit user types in. (eg title)
// 6. set the title of object to the title user typed in
// 7.set var to hold stringified object so as to put into localStorage
// 8. set item in local storage using object's (id, stringed object variable)

































// $ideaSection.on('blur', '.card', function(e){
//   var cardId = $(this).attr('id');
//   var pulledObject = localStorage.getItem(cardId);
//   var parsedObject = JSON.parse(pulledObject);
//   var userTitle = $(this).find('.title').text();
//   parsedObject.title = userTitle;
//   var stringedObject = JSON.stringify(parsedObject)
//   console.log(stringedObject)
//   localStorage.setItem(cardId, stringedObject);
//   // console.log(this.updateId)
// })

var $saveButton = $('.save-button');
var $title = $('.title-input');
var $body = $('.body-input');

$saveButton.click(appendIdea);

function IdeaConstructor(title, body, quality) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = quality || 'swill';
}

function appendIdea() {
  // var id = uniqueId();
  $('.idea-section').append(`<article class="idea-card"><h2>${$title.val()}</h2><button class="delete">delete</button><p>${$body.val()}</p></article><p>${$}`);

};

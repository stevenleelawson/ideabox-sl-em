var $saveButton = $('.save-button');
var $title = $('.title-input');
var $body = $('.body-input');

$saveButton.click(appendIdea);

function appendIdea() {
  $('.idea-section').prepend(`<article><h2>${$title.val()}</h2><p>${$body.val()}</p></article>`)
};


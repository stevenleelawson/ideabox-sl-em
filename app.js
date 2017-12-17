var $saveButton = $('.save-button');
var $title = $('.title-input');
var $body = $('.body-input');
var $ideaCard = $('.idea-card');
var $ideaSection = $('.idea-section')

$saveButton.click(appendIdea);

function IdeaConstructor(title, body, quality) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = quality || 'swill';
}

function appendIdea() {
  // var id = uniqueId();
  $('.idea-section').append(`<article class="idea-card">
  <h2>${$title.val()}</h2>
  <input type="image" src="images/delete.svg" class="delete"></button><p>${$body.val()}</p></article><p>`);

};

$ideaSection.on('click', '.delete', function(e){
  $(this).parent().remove();
  console.log(e);
})

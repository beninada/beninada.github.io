var nouns = ['experiences', 'interfaces', 'components', 'stories'],
    delayTime = 2500,
    $swap = $('.intro-noun'),
    c = 0;

for (var i = 0; i < nouns.length; i++) {
  $swap.append($('<span />', { text: nouns[i] }));
}

var $span = $('span', $swap).hide();

(function loop() {
  $swap.animate({
    width: $span.eq(c).width()
  });

  $span.fadeOut().eq(c).fadeIn().delay(delayTime).show(loop);
  
  c = ++c % nouns.length;
}());

function postContact() {
  var email = $('#email').val();
  var message = $('#message').val();

  // $.ajax({
  //   url: "https://docs.google.com/forms/d/1IWlkSg1Utl4ZiHcdjIwwn6ZFU8GCDMyeifUfAM1l0z8/formResponse",
  //   data: { "entry.132395288": email, "entry.1268391083": message },
  //   type: "POST",
  //   dataType: "xml"
  // });
}

$('.btn-send').click(function () {
  $('.contact-me .form-group').addClass('posted');
  $(this).closest('.form-group').find('input[type=email], textarea, button').attr('disabled', true);
  $(this).closest('.form-group').find('input[type=email], textarea').val('');
});
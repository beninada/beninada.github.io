var nouns = ['experiences', 'interfaces', 'components', 'stories'],
    delayTime = 2500,
    $swap = $('.intro-noun'),
    c = 0;

for (var i = 0; i < nouns.length; i++) {
  $swap.append($('<span />', { text: nouns[i] }));
}

var $span = $('span', $swap).hide();

(function loop() {
  c = ++c % nouns.length;

  $swap.animate({
    width: $span.eq(c).width()
  });

  $span.fadeOut().eq(c).fadeIn().delay(delayTime).show(loop);
}());
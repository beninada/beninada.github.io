var txt = ['sturdy', 'clean', 'memorable'],
  n = txt.length,
  $swap = $('.intro-first-adjective'),
  c = 0;

for (var i = 0; i < txt.length; i++) $swap.append($('<span />', {
  text: txt[i]
}));

var $span = $("span", $swap).hide();

(function loop() {
  c = ++c % n;
  $swap.animate({
      width: $span.eq(c).width()
  });
  $span.fadeOut().eq(c).fadeIn().delay(1000).show(loop);
}());
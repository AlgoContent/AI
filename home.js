/* Homepage only: the book carousel in the network rail (kept from the original site). */
(function () {
  'use strict';
  var track = document.getElementById('bookTrack');
  var dots = document.getElementById('carouselDots');
  if (!track) return;
  var cards = track.querySelectorAll('.book-card');
  var total = cards.length;
  var current = 0;
  if (!total) return;

  function go(n) {
    current = (n + total) % total;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    if (!dots) return;
    Array.prototype.forEach.call(dots.querySelectorAll('span'), function (dot, i) {
      dot.classList.toggle('active', i === current);
    });
  }
  if (dots) {
    for (var i = 0; i < total; i++) {
      (function (index) {
        var dot = document.createElement('span');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', function () { go(index); });
        dots.appendChild(dot);
      })(i);
    }
  }
  window.carouselNext = function () { go(current + 1); };
  window.carouselPrev = function () { go(current - 1); };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) setInterval(function () { if (!document.hidden) go(current + 1); }, 6000);
})();

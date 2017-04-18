"use strict";



// если браузер не поддерживает typeof
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

// док функции
/*init(
   int [0-6] (сколько видео кругов),
   int [0-6] (сколько синих), {
  mobile: bool (мобильная версия)
  padding: int (отступ в px),
  hidden: bool (скрыть ли надпись)
  max: int [1100] (когда скрывать или показывать надпись...)
}) */

function init(ii, iii, m) {

  $("#clip").remove();
  $("#fig").remove();
  $("#canvas").remove();

  var it = ii <= 0 ? 0 : (typeof ii === "undefined" ? "undefined" : _typeof(ii)) == _typeof(1) ? ii || 6 : 6;
  var itt = iii <= 0 ? 0 : (typeof iii === "undefined" ? "undefined" : _typeof(iii)) == _typeof(1) ? iii || 6 : 6;
  var maxwidth = m.max || 1100;
  var h = window.innerHeight - (m.mobile ? m.padding || 120 : 0),
      //$('#main').height()
  w = window.innerWidth,
      //$('#main').width()
  d = .9 * h / 12,
      r = d / 2,

  // xd = d*2 - 6,
  xd = d * 2,
      pd = 20,
      A = w - pd * 2,
      B = A - 2 * d,

  //q = Math.floor(w/xd),
  q = Math.floor(A / xd),
      nq = A % xd,
      sq = Math.sqrt(2),

  //px = w%(xd)*.5;
  px = (w - pd * 2) % xd * .5;

  console.log(w + ' ' + h);

  if (m.mobile) {
    $("#video").remove(); // если юзать vide это можно удалить...
    $('#main').prepend("<canvas id=\"canvas\" width=\"" + w + "px\" height=\"" + h + "px\">");
  }

  var canvas = document.getElementById("canvas");
  var ctx = canvas ? canvas.getContext("2d") : null;

  var defs = '',
      mask = '',
      fig = '',
      XX,
      YY;

  if (m.mobile || it < 6 && itt) {
    for (var n = 0; n < q + 1; n++) {
      for (var i = m.mobile ? 0 : it; i < itt; i++) {
        if (i == 4) {
          YY = .05 * h + d * Math.pow(i, sq);
          XX = pd;
        }
        if (w > maxwidth && i == 4 && n < 4) {} else { // тут можно поменять разрешение...
          var X = n == 0 ? pd : n == q ? w - pd - xd : pd + B * n / q;
          var Y = .05 * h + d * Math.pow(i, sq);
          if (i == 3) {
            Y -= 7;
          }
          if (i == 4) {
            Y -= 7;
          }
          if (m.mobile && ctx) {
            ctx.fillStyle = "blue";
            ctx.beginPath();
            ctx.arc(X + d, Y + d, d, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
          } else {
            fig += "<rect id=\"circle" + (i + "f" + n) + "\" x=\"" + X + "\" y=\"" + Y + "\" fill=\"blue\" width=\"" + 2 * d + "\" height=\"" + 2 * d + "\" rx=\"50%\" ry=\"50%\" />";
          }
        }
      }
    }
  }

  for (var n = 0; n < q + 1; n++) {
    for (var i = 0; i < it; i++) {
      if (i == 4) {
        YY = .05 * h + d * Math.pow(i, sq);
        XX = pd;
      }
      if (w > maxwidth && i == 4 && n < 4) {} else { // тут можно поменять разрешение...
        var X = n == 0 ? pd : n == q ? w - pd - xd : pd + B * n / q;
        var Y = .05 * h + d * Math.pow(i, sq);
        if (i == 3) { // тут мы двигаем круги по вертикали...
          Y -= 7;
        }
        if (i == 4) {
          Y -= 7;
        }
        defs += "<rect id=\"circle" + (i + "n" + n) + "\" x=\"" + X + "\" y=\"" + Y + "\" width=\"" + 2 * d + "\" height=\"" + 2 * d + "\" rx=\"50%\" ry=\"50%\" />";
        mask += "<use xlink:href=\"#circle" + (i + "n" + n) + "\" fill=\"Black\" />";
      }
    }
  }

  if (w < maxwidth) { // тут можно поменять разрешение...
    $('#label').css('display', 'none');
  } else {
    if (m.hidden) {} else {  // тут весь css созданного h1 елемента...
      $('#label').css('display', 'block');
      $('#label').css('top', (YY - 20) + "px");
      $('#label').css('left', XX + "px");
      $('#label').css('width', xd * 4 + "px");
      $('#label').css('height', xd + "px");
      $('#label').css('font-size', d + "px");
    }
  }

  if (!m.mobile) {
    $('#main').prepend("\n  <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 " + w + " " + h + "\" width=\"" + w + "px\" id=\"clip\" height=\"" + h + "px\" preserveAspectRatio=\"xMidYMid slice\">\n  <defs>\n    " + defs + "\n  </defs>\n  <mask id=\"mask\" x=\"0\" y=\"0\" width=\"" + w + "\" height=\"" + h + "\" >\n     <rect x=\"0\" y=\"0\" width=\"" + w + "\" height=\"" + h + "\"/>\n     " + mask + "\n  </mask>\n  <rect x=\"0\" y=\"0\" width=\"" + w + "\" height=\"" + h + "\" fill=\"white\" />\n</svg>\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 " + w + " " + h + "\" width=\"" + w + "px\" id=\"fig\" height=\"" + h + "px\" preserveAspectRatio=\"xMidYMid slice\">\n  " + fig + "\n</svg>\n  ");
  }
}

(function(){
  var i = 0;
  var inte = setInterval(function (_) {
    var delay = 10;
    i == 15 + delay ? clearInterval(inte) : void 0;
    var time = i - 3;
    init(time - 6 + delay >= time + 6 + delay ? 6 : time - 6 - delay, time >= 6 ? 6 : time, {
      mobile: is.mobile(),
      hidden: time <= 4
    });
    i++;
  }, 100);
})();

$(window).on('resize', function (_) {
  return init(6, 6, { mobile: is.mobile() });
});

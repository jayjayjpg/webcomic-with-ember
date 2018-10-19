(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function typeWriter(){
  var frameworkNames = ["Web Animations API", "CSS3", "GreenSock.JS", "EmberJS", "Ember Liquid Fire", "SVG Animations", "Sprite Aninmation", "Parallax Effects", "Ember Infinity", "Your Imagination"];
  var options = {
    strings: frameworkNames,
    typeSpeed: 40,
    shuffle: false,
    loop: false,
  }

 var typed = new Typed("#typefield", options);
}

function typeIt(selector, strings) {
  var options = {
    strings,
    typeSpeed: 40,
  };
  console.log("type");
  return new Typed(selector, options);
}

//draw bubbles for bombs
Reveal.addEventListener( 'fragmentshown', function( event ) {
  console.log({ event });
  if (event.fragment.id === 'start-typing') {
    typeWriter();
  }
});

},{}]},{},[1]);

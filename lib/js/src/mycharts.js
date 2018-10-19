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

let arr = Array.from({ length: 12 });
let themeColorPalette = arr.map((el, index) => {
  let colorIndex = index + 1;
  let borders = arr.map((el, opacityIndex) => `rgba(${colorIndex * 30 % 255}, ${colorIndex * 20 % 255}, ${colorIndex * 30 % 255}, ${1 - opacityIndex * 0.05})`);
  let backgrounds = arr.map((el, opacityIndex) => `rgba(${colorIndex * 55 % 255}, ${colorIndex * 15 % 255}, ${colorIndex * 50 % 255}, ${1 - opacityIndex * 0.05})`);
  let contrasts = arr.map((el, opacityIndex) => `rgba(${colorIndex * 20 % 255}, ${colorIndex * 10 % 255}, ${colorIndex * 25 % 255}, ${1 - opacityIndex * 0.005})`);
  return { borders, backgrounds, contrasts };
});

let barChartOptions = {
  fill: true,
  borderWidth: 2,
  tooltips: {
    enabled: true,
    intersect: true,
  },
  scales: {
    yAxes: [{
        ticks: {
            beginAtZero:true
        }
    }],
  }
};

let timedBarChartOptions = {
  fill: true,
  borderWidth: 2,
  layout: {
    /* padding: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 200,
    } */
  },
  tooltips: {
    enabled: true,
    // mode: 'nearest',
    intersect: true,
  },
  scales: {
      yAxes: [{
          ticks: {
              beginAtZero:true
          }
      }],
      xAxes: [{
        type: 'time',
        maxBarThickness: 100,
        offset: true,
      }],
  }
};

let timedLineChartOptions = {
    showLines: false,
    fill: false,
    borderWidth: 5,
    tooltips: {
      enabled: true,
      // mode: 'nearest',
      intersect: true,
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }],
        xAxes: [{
          type: 'time',
        }],
    }
};

let dataSetReact = require('../../scripts/data/react-releases.json');
let dataSetAngular = require('../../scripts/data/angular-releases.json');
let dataSetAurelia = require('../../scripts/data/aurelia-releases.json');
let dataSetEmber = require('../../scripts/data/ember-releases.json');
let dataSetVue = require('../../scripts/data/vue-releases.json');
let dataSetAngularJs = require('../../scripts/data/angularjs-releases.json');

function createSlide1() {
  var ctx = document.getElementById("slide-1a").getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          datasets: [{
              label: 'React',
              data: dataSetReact,
              backgroundColor: themeColorPalette[0].backgrounds,
              borderColor: themeColorPalette[0].borders,
          }, {
              label: 'Angular',
              data: dataSetAngular,
              backgroundColor: themeColorPalette[1].backgrounds,
              borderColor: themeColorPalette[1].borders,
          }, {
              label: 'Aurelia',
              data: dataSetAurelia,
              backgroundColor: themeColorPalette[2].backgrounds,
              borderColor: themeColorPalette[2].borders,
          }, {
              label: 'Ember',
              data: dataSetEmber,
              backgroundColor: themeColorPalette[3].backgrounds,
              borderColor: themeColorPalette[3].borders,
          }, {
              label: 'Vue',
              data: dataSetVue,
              backgroundColor: themeColorPalette[4].backgrounds,
              borderColor: themeColorPalette[4].borders,
          }, {
              label: 'AngularJS',
              data: dataSetAngularJs,
              backgroundColor: themeColorPalette[5].backgrounds,
              borderColor: themeColorPalette[5].borders,
          },
        ],
      },
      options: timedLineChartOptions,
  });
}

// NPM Downloads JS libraries
let dataSetEmberDownloads = require('../../scripts/data/ember-npm-downloads.json');
let dataSetAngularDownloads = require('../../scripts/data/angular-npm-downloads.json');
let dataSetReactDownloads = require('../../scripts/data/react-npm-downloads.json');
let dataSetAureliaDownloads = require('../../scripts/data/aurelia-npm-downloads.json');
let dataSetVueDownloads = require('../../scripts/data/vue-npm-downloads.json');

let dataCollection2 = [dataSetAureliaDownloads, dataSetEmberDownloads, dataSetVueDownloads];
let dataCollection2b = [dataSetEmberDownloads, dataSetAngularDownloads, dataSetReactDownloads, dataSetAureliaDownloads, dataSetVueDownloads];

// NPM Downloads CLIs
let dataCollection3 = [
  require('./../../scripts/data/ember-cli-npm-downloads.json'),
  require('./../../scripts/data/angular-cli-npm-downloads.json'),
  require('./../../scripts/data/aurelia-cli-npm-downloads.json'),
  require('./../../scripts/data/vue-cli-npm-downloads.json'),
];

let dataCollection4 = [
  require('./../../scripts/data/vue-so-sf.json')
];

let dataCollection5 = [
  require('./../../scripts/data/discord-members.json'),
];

function createChart(slideNum, label, type, subType, dataCollection) {
  var ctx = document.getElementById(`slide-${slideNum}`).getContext('2d');
  let optionConfig = {};
  let chart = {};
  if (type === 'bar' && subType === 'time') {
    optionConfig = timedBarChartOptions;
  } else if (type === 'line' && subType === 'time') {
    optionConfig = timedLineChartOptions;
  } else if (type === 'bar' && subType === 'category') {
    optionConfig = barChartOptions;
  }
  let options = Object.assign(optionConfig, { title: { text: label, display: true }});
  let datasets = dataCollection.map((dataBlob, index) => {
    return {
        label: dataBlob.name,
        data: dataBlob.data,
        backgroundColor: themeColorPalette[index].backgrounds[0],
        borderColor: themeColorPalette[index].borders[0],
    };
  });
  if (subType === 'category') {
    let labelArray = dataCollection.map((el) => el.data.map((ell) => ell.x));
    let labels = labelArray.flat();
    chart = new Chart(ctx, {
      title: {
        text: label,
        display: true,
      },
      type,
      data: {
        labels,
        datasets: dataCollection.map((el, index) => {
          let data = el.data.map((dataPoint) => dataPoint.y);
          return {
            label: el.name,
            backgroundColor: themeColorPalette[index].backgrounds[0],
            borderColor: themeColorPalette[index].borders[0],
            data,
          };
        }),
      },
      options,
    });
  } else {
    chart = new Chart(ctx, {
      title: {
        text: label,
        display: true,
      },
      type,
      data: {
          datasets,
      },
      options,
    });
  }
  return chart;
}

function updateChart(chart, type, subType, newData, cInd) {
  let colorIndex = cInd ? cInd : 2;
  if (type === 'bar' && subType === 'category') {
    let data = newData.data.map((dataPoint) => dataPoint.y);
    let aggregatedData = {
      label: newData.name,
      backgroundColor: themeColorPalette[colorIndex].backgrounds[0],
      borderColor: themeColorPalette[colorIndex].borders[0],
      data,
    };
    chart.data.datasets.push(aggregatedData);
    chart.update();
  }
}

// createSlide1(); // Slide with relaease timeline
createChart('2a', 'NPM Downloads per Month', 'bar', 'time', dataCollection2);
createChart('2b', 'NPM Downloads per Month', 'bar', 'time', dataCollection2b);
createChart('3a', 'CLIs NPM Downloads per Month', 'bar', 'time', dataCollection3);
var soChart = createChart('4a', 'No. of Question Tag Followers', 'bar', 'category', dataCollection4, ['StackOverflow', 'SegmentFault']);
createChart('5a', 'Community Chat Users', 'bar', 'category', dataCollection5);

var map = new Datamap({
  element: document.getElementById('world-map-container'),
  responsive: true,
  fills: {
    'SAN': '#301934',
    'NYC': '#301934',
    'AUS': '#301934',
    'LON': '#301934',
    'BOS': '#301934',
    'CN': '#9467bd',
    'IN': '#ff7f0e',
    'LAG': '#8B008B',
    defaultFill: '#f7df1e' // The keys in this object map to the "fillKey" of [data] or [bubbles]
  },
  setProjection: function(element) {
    var projection = d3.geo.equirectangular()
      .center([0, 0])
      .rotate([-10, 0])
      .scale(150);
      //.translate([element.offsetWidth / 2, element.offsetHeight / 2]);
    var path = d3.geo.path()
      .projection(projection);

    return {path: path, projection: projection};
  },
  geographyConfig: {
      borderWidth: 2,
      borderOpacity: 0.8,
      borderColor: '#222222',
      highlightOnHover: true,
      highlightFillColor: '#222222',
      highlightBorderColor: '#222222',
      highlightBorderWidth: 2,
      highlightBorderOpacity: 1
  },
});

// Pure JavaScript
window.addEventListener('resize', function() {
  map.resize();
});

let pointers = [];

var pointerOld1 = {
   name: 'Silicon Valley',
   radius: 12,
   yield: 400,
   country: 'US',
   fillKey: 'SAN',
   date: '1953-08-12',
   latitude: 37.22,
   longitude: -122.02
 };

 var pointerOld2 = {
    name: 'New York City',
    radius: 12,
    yield: 400,
    country: 'US',
    fillKey: 'NYC',
    date: '1953-08-12',
    latitude: 40.71,
    longitude: -74.00,
  };

  var pointerOld3 = {
     name: 'Austin',
     radius: 12,
     yield: 400,
     country: 'US',
     fillKey: 'AUS',
     date: '1953-08-12',
     latitude: 30.28,
     longitude: -97.69,
   };

   var pointerOld5 = {
      name: 'Boston',
      radius: 12,
      yield: 400,
      country: 'US',
      fillKey: 'BOS',
      date: '1953-08-12',
      latitude: 42.36,
      longitude: -71.05,
    };

 var pointerOld4 = {
    name: 'London',
    radius: 20,
    yield: 400,
    country: 'EUR',
    fillKey: 'LON',
    latitude: 51.50,
    longitude: -0.12
  };

 var pointerChina = {
   name: 'Beijing',
   radius: 25,
   yield: 400,
   country: 'CHINA',
   fillKey: 'CN',
   date: '1955-11-22',
   latitude: 39.90,
   longitude: 116.40
 };

var pointerIndia = {
  name: 'Bangalore',
  radius: 25,
  yield: 400,
  country: 'INDIA',
  fillKey: 'IN',
  date: '1955-11-22',
  latitude: 12.97,
  longitude: 77.59
};

var pointerLagos = {
  name: 'Lagos',
  radius: 25,
  yield: 400,
  fillKey: 'LAG',
  latitude: 6.52,
  longitude: 3.37
};

function typeWriter(){
  var frameworkNames = ["AngularJS", "Aurelia", "Backbone.js", "Cappuccino", "Chaplin.js", "Echo", "Ember.js", "Enyo", "Knockout", "Meteor", "Mojito", "MooTools", "Prototype JavaScript Framework", "React", "SproutCore", "Vue.js", "Wakanda Framework", "Variety of JS"];
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
  if (event.fragment.id === 'bubble-us') {
    pointers.push(pointerOld1);
    pointers.push(pointerOld2);
    pointers.push(pointerOld3);
    pointers.push(pointerOld4);
    pointers.push(pointerOld5);
    map.bubbles(pointers);
  } else if (event.fragment.id === 'bubble-china') {
    pointers.push(pointerChina)
    map.bubbles(pointers);
  } else if (event.fragment.id === 'bubble-india') {
    pointers.push(pointerIndia);
    map.bubbles(pointers);
  } else if (event.fragment.id === 'bubble-lagos') {
    pointers.push(pointerLagos);
    map.bubbles(pointers);
  } else if (event.fragment.id === 'show-react') {
    updateChart(soChart, 'bar', 'category', require('./../../scripts/data/react-so-sf.json'), 1);
    soChart.update();
  } else if (event.fragment.id === 'show-angular') {
    updateChart(soChart, 'bar', 'category', require('./../../scripts/data/angular-so-sf.json'), 3);
    soChart.update();
  } else if (event.fragment.id === 'start-typing') {
    typeWriter();
  } else if (event.fragment.id === 'show-js-title-1') {
    typeIt('#typefield-chapter1', ["Characterizing JavaScript Ecosystems"]);
    window.resizeTo(window.innerWidth - 1, window.innerHeight);
  } else if (event.fragment.id === 'show-js-title-2') {
    typeIt('#typefield-chapter2', ["JavaScript ^1000 Evolution"]);
    window.resizeTo(window.innerWidth - 1, window.innerHeight);
  }
});

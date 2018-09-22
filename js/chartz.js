(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var flat = require('array.prototype.flat');

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
    let labels = flat(labelArray);
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

},{"../../scripts/data/angular-npm-downloads.json":3,"../../scripts/data/angular-releases.json":4,"../../scripts/data/angularjs-releases.json":6,"../../scripts/data/aurelia-npm-downloads.json":8,"../../scripts/data/aurelia-releases.json":9,"../../scripts/data/ember-npm-downloads.json":12,"../../scripts/data/ember-releases.json":13,"../../scripts/data/react-npm-downloads.json":14,"../../scripts/data/react-releases.json":15,"../../scripts/data/vue-npm-downloads.json":18,"../../scripts/data/vue-releases.json":19,"./../../scripts/data/angular-cli-npm-downloads.json":2,"./../../scripts/data/angular-so-sf.json":5,"./../../scripts/data/aurelia-cli-npm-downloads.json":7,"./../../scripts/data/discord-members.json":10,"./../../scripts/data/ember-cli-npm-downloads.json":11,"./../../scripts/data/react-so-sf.json":16,"./../../scripts/data/vue-cli-npm-downloads.json":17,"./../../scripts/data/vue-so-sf.json":20,"array.prototype.flat":22}],2:[function(require,module,exports){
module.exports={"name":"@angular/cli","data":[{"x":"2017-09-01","y":1246934},{"x":"2017-10-01","y":1434166},{"x":"2017-11-01","y":1693484},{"x":"2017-12-01","y":1548591},{"x":"2018-01-01","y":1919842},{"x":"2018-02-01","y":1928211},{"x":"2018-03-01","y":2153338},{"x":"2018-04-01","y":2059442},{"x":"2018-05-01","y":2329183},{"x":"2018-06-01","y":4580209},{"x":"2018-07-01","y":4948680},{"x":"2018-08-01","y":5344218}]}
},{}],3:[function(require,module,exports){
module.exports={"name":"@angular/core","data":[{"x":"2017-09-01","y":1885029},{"x":"2017-10-01","y":2168899},{"x":"2017-11-01","y":2369837},{"x":"2017-12-01","y":2118275},{"x":"2018-01-01","y":2585966},{"x":"2018-02-01","y":2523632},{"x":"2018-03-01","y":2862202},{"x":"2018-04-01","y":2618252},{"x":"2018-05-01","y":2842682},{"x":"2018-06-01","y":5791328},{"x":"2018-07-01","y":6864699},{"x":"2018-08-01","y":7573621}]}
},{}],4:[function(require,module,exports){
module.exports=[
    {
        "y": "6.1",
        "x": "2018-07-25T21:23:05Z",
        "url": "https://api.github.com/repos/angular/angular/commits/48d7205873f13c9a8ea417364d59e23b46478c79",
        "author": "Victor Berchet"
    },
    {
        "y": "6.0",
        "x": "2018-05-03T19:17:26Z",
        "url": "https://api.github.com/repos/angular/angular/commits/d0ccf5f1697c1c0d4e3c8ea7a25f3c87a239df7e",
        "author": "Igor Minar"
    },
    {
        "y": "5.2",
        "x": "2018-01-10T01:00:17Z",
        "url": "https://api.github.com/repos/angular/angular/commits/04dd9713f090ae7a9710b08b6a23b3619112fb3d",
        "author": "Kara Erickson"
    },
    {
        "y": "5.1",
        "x": "2017-12-06T20:08:51Z",
        "url": "https://api.github.com/repos/angular/angular/commits/c2dbc55f115eb259a6d90e2b45ed61c329258c22",
        "author": "Igor Minar"
    },
    {
        "y": "5.0",
        "x": "2017-11-01T16:44:35Z",
        "url": "https://api.github.com/repos/angular/angular/commits/5775376bcf7e35017444e60cd7f9e4f5a1959572",
        "author": "Matias Niemelä"
    },
    {
        "y": "4.4",
        "x": "2017-09-15T21:54:32Z",
        "url": "https://api.github.com/repos/angular/angular/commits/4e7d2bd5bfc329704e0577f7c987970a708c8c15",
        "author": "Matias Niemelä"
    },
    {
        "y": "4.4.0",
        "x": "2017-09-02T05:01:41Z",
        "url": "https://api.github.com/repos/angular/angular/commits/aeb98dbcdfec5a2e0f7b6ae167a10bd3e15f5096",
        "author": "Misko Hevery"
    },
    {
        "y": "4.3",
        "x": "2017-07-14T20:12:37Z",
        "url": "https://api.github.com/repos/angular/angular/commits/a0b06befb6972e96ce5b724c14a65f5382bd4eee",
        "author": "Alex Rickabaugh"
    },
    {
        "y": "4.2",
        "x": "2017-06-08T22:13:37Z",
        "url": "https://api.github.com/repos/angular/angular/commits/1c04b83ea3076ebafb95c5d42bd4608a0ddaad64",
        "author": "Alex Rickabaugh"
    },
    {
        "y": "4.1",
        "x": "2017-04-26T15:52:42Z",
        "url": "https://api.github.com/repos/angular/angular/commits/b9723f9765c15dfb3f7fc797bb5cdf4a7a9e2c9a",
        "author": "Miško Hevery"
    },
    {
        "y": "4.0",
        "x": "2017-03-23T23:48:54Z",
        "url": "https://api.github.com/repos/angular/angular/commits/7a715b2403867aa3adfab1c87acd22af4fd8697b",
        "author": "Victor Berchet"
    },
    {
        "y": "2.4",
        "x": "2016-12-20T01:42:17Z",
        "url": "https://api.github.com/repos/angular/angular/commits/6efdf84d3e66a9a6ea0c5ccd0d67304fc3022d1a",
        "author": "Chuck Jazdzewski"
    },
    {
        "y": "2.3",
        "x": "2016-12-07T21:54:22Z",
        "url": "https://api.github.com/repos/angular/angular/commits/13b41bd6310dd8c10d76deef45f157e0527b1707",
        "author": "Alex Rickabaugh"
    },
    {
        "y": "2.2",
        "x": "2016-11-14T19:26:03Z",
        "url": "https://api.github.com/repos/angular/angular/commits/2524d510bc1dd1a156c3e6ac01e7532c230e5410",
        "author": "Igor Minar"
    },
    {
        "y": "2.1",
        "x": "2016-10-12T20:19:31Z",
        "url": "https://api.github.com/repos/angular/angular/commits/07bd4b0630d9d14f5abc6d5156462cc579bcaaa2",
        "author": "Tobias Bosch"
    },
    {
        "y": "2.0",
        "x": "2016-09-14T23:49:10Z",
        "url": "https://api.github.com/repos/angular/angular/commits/ffe5c49c3ebb51d534a339e0d85a0aa7967923dc",
        "author": "Igor Minar"
    }
]
},{}],5:[function(require,module,exports){
module.exports={"name":"angular","data":[{"x":"StackOverflow","y":69138},{"x":"SegmentFault","y":81}]}

},{}],6:[function(require,module,exports){
module.exports=[
    {
        "y": "1.7",
        "x": "2018-05-11T08:31:53Z",
        "url": "https://api.github.com/repos/angular/angular.js/commits/45879a8c5a2222f88bcd1c0fcc0acabbddb1693f",
        "author": "Martin Staffa"
    },
    {
        "y": "1.6",
        "x": "2016-12-08T11:07:52Z",
        "url": "https://api.github.com/repos/angular/angular.js/commits/4c5afb5cc2f72e966be9ee4f80732dd6e143d91d",
        "author": "Peter Bacon Darwin"
    },
    {
        "y": "1.5",
        "x": "2016-02-05T10:04:17Z",
        "url": "https://api.github.com/repos/angular/angular.js/commits/39eecd136f5782e85a92f611cf3e73ac6b97caf2",
        "author": "Peter Bacon Darwin"
    },
    {
        "y": "1.4",
        "x": "2015-05-27T00:33:06Z",
        "url": "https://api.github.com/repos/angular/angular.js/commits/291d7c467fba51a9cb89cbeee62202d51fe64b09",
        "author": "Matias Niemelä"
    },
    {
        "y": "1.3",
        "x": "2014-10-13T22:27:20Z",
        "url": "https://api.github.com/repos/angular/angular.js/commits/399a7afafefb8818f255d5b9e6a42b2b57aabf97",
        "author": "Jeff Cross"
    },
    {
        "y": "1.2",
        "x": "2013-11-08T17:40:09Z",
        "url": "https://api.github.com/repos/angular/angular.js/commits/907f71597affff552a4b79a1d913404fad68df11",
        "author": "Igor Minar"
    },
    {
        "y": "1.1",
        "x": "2012-08-31T20:31:04Z",
        "url": "https://api.github.com/repos/angular/angular.js/commits/d0c0eadeddf6382cc8d8996fc9ac1f5cddf4d97a",
        "author": "Igor Minar"
    },
    {
        "y": "1.0",
        "x": "2012-06-14T14:21:29Z",
        "url": "https://api.github.com/repos/angular/angular.js/commits/519bef4f3d1cdac497c782f77457fd2f67184601",
        "author": "Igor Minar"
    },
    {
        "y": "0.10",
        "x": "2011-09-02T18:32:29Z",
        "url": "https://api.github.com/repos/angular/angular.js/commits/8bae2a5ecbb2ed554fad4fcea9bfe80a4655fe08",
        "author": "Igor Minar"
    },
    {
        "y": "0.9",
        "x": "2010-10-20T21:49:55Z",
        "url": "https://api.github.com/repos/angular/angular.js/commits/2a9579a0ea72be0d03296eca08d481acbc9d55c5",
        "author": "Igor Minar"
    }
]
},{}],7:[function(require,module,exports){
module.exports={"name":"aurelia-cli","data":[{"x":"2017-09-01","y":19488},{"x":"2017-10-01","y":19131},{"x":"2017-11-01","y":16198},{"x":"2017-12-01","y":13253},{"x":"2018-01-01","y":18202},{"x":"2018-02-01","y":15849},{"x":"2018-03-01","y":22349},{"x":"2018-04-01","y":13377},{"x":"2018-05-01","y":14729},{"x":"2018-06-01","y":15144},{"x":"2018-07-01","y":17389},{"x":"2018-08-01","y":20039}]}
},{}],8:[function(require,module,exports){
module.exports={"name":"aurelia-framework","data":[{"x":"2017-09-01","y":26547},{"x":"2017-10-01","y":32162},{"x":"2017-11-01","y":31167},{"x":"2017-12-01","y":24513},{"x":"2018-01-01","y":30015},{"x":"2018-02-01","y":29615},{"x":"2018-03-01","y":32563},{"x":"2018-04-01","y":30138},{"x":"2018-05-01","y":28245},{"x":"2018-06-01","y":30711},{"x":"2018-07-01","y":35046},{"x":"2018-08-01","y":31674}]}
},{}],9:[function(require,module,exports){
module.exports=[
    {
        "y": "1.3",
        "x": "2018-07-02T04:05:31Z",
        "url": "https://api.github.com/repos/aurelia/framework/commits/3928b336e00937d9e33eb914d8a784759eeafd5b",
        "author": "EisenbergEffect"
    },
    {
        "y": "1.2",
        "x": "2018-03-29T17:13:52Z",
        "url": "https://api.github.com/repos/aurelia/framework/commits/c14b8b2ca2049600c7acfffba5fd242d864294ac",
        "author": "EisenbergEffect"
    },
    {
        "y": "1.1",
        "x": "2017-02-27T06:24:08Z",
        "url": "https://api.github.com/repos/aurelia/framework/commits/b0252e767ec234b44f7979b6be3177c7e4713e1b",
        "author": "Rob Eisenberg"
    },
    {
        "y": "1.0",
        "x": "2016-07-27T17:02:36Z",
        "url": "https://api.github.com/repos/aurelia/framework/commits/ac3e71d33571bcc6b369c5befe831143cb5263a6",
        "author": "Rob Eisenberg"
    },
    {
        "y": "0.18",
        "x": "2015-11-10T16:05:04Z",
        "url": "https://api.github.com/repos/aurelia/framework/commits/9f0743a5c1d0b86f49f23138e63dabfb8aad89f0",
        "author": "Rob Eisenberg"
    },
    {
        "y": "0.17",
        "x": "2015-10-13T09:13:39Z",
        "url": "https://api.github.com/repos/aurelia/framework/commits/fe4bf2111ca9f532a5c11f5a9269495797df6e34",
        "author": "Rob Eisenberg"
    },
    {
        "y": "0.16",
        "x": "2015-09-05T04:53:32Z",
        "url": "https://api.github.com/repos/aurelia/framework/commits/878729595c8619c0601341e8c45e55084b778430",
        "author": "Rob Eisenberg"
    },
    {
        "y": "0.15",
        "x": "2015-08-14T07:59:10Z",
        "url": "https://api.github.com/repos/aurelia/framework/commits/aade9da20a0d9dcfeca532131226a26acd7d02ae",
        "author": "Rob Eisenberg"
    },
    {
        "y": "0.14",
        "x": "2015-08-05T04:42:48Z",
        "url": "https://api.github.com/repos/aurelia/framework/commits/dd2547f790fba752d133052ecef814de88871a66",
        "author": "Rob Eisenberg"
    },
    {
        "y": "0.13",
        "x": "2015-07-02T07:18:59Z",
        "url": "https://api.github.com/repos/aurelia/framework/commits/6a5032a287c73d165773a75edc5c418c55e43791",
        "author": "Rob Eisenberg"
    },
    {
        "y": "0.12",
        "x": "2015-06-09T03:38:21Z",
        "url": "https://api.github.com/repos/aurelia/framework/commits/81d85bfea9e06b2bc032187f65ae0dded2370517",
        "author": "Rob Eisenberg"
    },
    {
        "y": "0.11",
        "x": "2015-05-01T05:11:57Z",
        "url": "https://api.github.com/repos/aurelia/framework/commits/10394dd38849fe4e449f6ac54798390bd4ac9a23",
        "author": "Rob Eisenberg"
    },
    {
        "y": "0.10",
        "x": "2015-04-09T06:41:14Z",
        "url": "https://api.github.com/repos/aurelia/framework/commits/c91c6d303b438ff4fecbb07b4aceac3644eb6587",
        "author": "Rob Eisenberg"
    },
    {
        "y": "0.9",
        "x": "2015-03-25T06:25:55Z",
        "url": "https://api.github.com/repos/aurelia/framework/commits/10cc026ee95c4124ae3a8c12e358d7cce0f545a7",
        "author": "Rob Eisenberg"
    },
    {
        "y": "0.8",
        "x": "2015-01-22T08:34:47Z",
        "url": "https://api.github.com/repos/aurelia/framework/commits/c2f779bda67f11d67705d025c50c9e63a7098574",
        "author": "Rob Eisenberg"
    },
    {
        "y": "0.7",
        "x": "2015-01-12T15:10:48Z",
        "url": "https://api.github.com/repos/aurelia/framework/commits/8c0e3e4b91904c428a63ab06343a3a1f1e93df23",
        "author": "Rob Eisenberg"
    },
    {
        "y": "0.6",
        "x": "2015-01-07T16:02:41Z",
        "url": "https://api.github.com/repos/aurelia/framework/commits/5127d4fb75e55066c9ad67e46a5ef1ca6cfbc62a",
        "author": "Rob Eisenberg"
    },
    {
        "y": "0.5",
        "x": "2015-01-06T20:13:48Z",
        "url": "https://api.github.com/repos/aurelia/framework/commits/1fac9d071e6f191636ab259d003855d3fef0143b",
        "author": "Rob Eisenberg"
    },
    {
        "y": "0.4",
        "x": "2014-12-22T06:39:15Z",
        "url": "https://api.github.com/repos/aurelia/framework/commits/07de898cb69ee2dbf62b3b5089fb2ef2921af84c",
        "author": "Rob Eisenberg"
    },
    {
        "y": "0.3",
        "x": "2014-12-17T22:25:06Z",
        "url": "https://api.github.com/repos/aurelia/framework/commits/17fe6d4dfeea7552f495898c3e03d8e415cd229b",
        "author": "Rob Eisenberg"
    },
    {
        "y": "0.2",
        "x": "2014-12-12T02:03:02Z",
        "url": "https://api.github.com/repos/aurelia/framework/commits/8c2e05aa2daf56099660dd792780484389972b82",
        "author": "Rob Eisenberg"
    },
    {
        "y": "0.1",
        "x": "2014-12-11T19:31:59Z",
        "url": "https://api.github.com/repos/aurelia/framework/commits/3f3b2a133e706260dc3605101158b21e122db8ac",
        "author": "Rob Eisenberg"
    }
]
},{}],10:[function(require,module,exports){
module.exports={"name":"Server members","data":[{"x": "Slack: Ember", "y": "12584"},{"x": "Discord: Ember", "y": "1645"}, {"x": "Gitter: Angular", "y": "17353"}, {"x":"Discord: Reactiflux","y":37718}, {"x":"Discord: Vue Land","y":43750}]}

},{}],11:[function(require,module,exports){
module.exports={"name":"ember-cli","data":[{"x":"2017-09-01","y":340397},{"x":"2017-10-01","y":369604},{"x":"2017-11-01","y":366497},{"x":"2017-12-01","y":300387},{"x":"2018-01-01","y":360758},{"x":"2018-02-01","y":355291},{"x":"2018-03-01","y":395300},{"x":"2018-04-01","y":415736},{"x":"2018-05-01","y":359803},{"x":"2018-06-01","y":358899},{"x":"2018-07-01","y":440182},{"x":"2018-08-01","y":463146}]}
},{}],12:[function(require,module,exports){
module.exports={"name":"ember-source","data":[{"x":"2017-09-01","y":119780},{"x":"2017-10-01","y":148154},{"x":"2017-11-01","y":154446},{"x":"2017-12-01","y":135145},{"x":"2018-01-01","y":172314},{"x":"2018-02-01","y":195796},{"x":"2018-03-01","y":246676},{"x":"2018-04-01","y":272046},{"x":"2018-05-01","y":243687},{"x":"2018-06-01","y":295735},{"x":"2018-07-01","y":317600},{"x":"2018-08-01","y":254327}]}
},{}],13:[function(require,module,exports){
module.exports=[
    {
        "y": "3.4",
        "x": "2018-08-28T00:09:55Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/14f44d6fa72234eeed87cabf88a96d8064576220",
        "author": "Katie Gengler"
    },
    {
        "y": "3.3",
        "x": "2018-07-16T18:49:40Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/b08b93c925bbc7fd4c39ad94cc8280abc56946e0",
        "author": "Katie Gengler"
    },
    {
        "y": "3.2",
        "x": "2018-06-01T03:15:51Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/5028c758c98aa68d6919c4e35d7c9bd6f2302715",
        "author": "Robert Jackson"
    },
    {
        "y": "3.1",
        "x": "2018-04-10T21:22:07Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/9a81db740367499e1b35540b20751f7577a631d6",
        "author": "Katie Gengler"
    },
    {
        "y": "3.0",
        "x": "2018-02-14T04:37:34Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/84c8ecac85175571047690540f1dea7e62115c64",
        "author": "Robert Jackson"
    },
    {
        "y": "2.18",
        "x": "2018-01-01T15:58:16Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/bdc2c3e3a15d13d8bb1951d44b1a28ee1c6a36cb",
        "author": "Robert Jackson"
    },
    {
        "y": "2.17",
        "x": "2017-11-29T14:33:12Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/3625ba2adf825de80b02322717b46185536450bb",
        "author": "Robert Jackson"
    },
    {
        "y": "2.16",
        "x": "2017-10-10T00:47:36Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/e295d51e7c719b1c8557ed0980469688ef61b94f",
        "author": "Robert Jackson"
    },
    {
        "y": "2.15",
        "x": "2017-08-31T14:10:50Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/64a04326527aebe32a08e4a3c96db63ebc789913",
        "author": "Robert Jackson"
    },
    {
        "y": "2.14",
        "x": "2017-07-05T13:39:38Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/d21fd543c747e99821f731d849ad334dafc37805",
        "author": "Robert Jackson"
    },
    {
        "y": "2.13",
        "x": "2017-04-27T20:49:55Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/1cd37cb93d410ada94fcb98b73d489a28660f81f",
        "author": "Robert Jackson"
    },
    {
        "y": "2.12",
        "x": "2017-03-15T20:39:23Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/1841cd84806c87bb2f731ef4a84a324b1f0a27ae",
        "author": "Godfrey Chan"
    },
    {
        "y": "2.11",
        "x": "2017-01-24T02:02:30Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/00bc93fadcc0b96dfcee5024e881eb1036666533",
        "author": "Robert Jackson"
    },
    {
        "y": "2.10",
        "x": "2016-11-28T22:40:37Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/9e2514ea38792827cff496cebe904fe6e98cb342",
        "author": "Godfrey Chan"
    },
    {
        "y": "2.9",
        "x": "2016-10-18T05:17:57Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/594462b10336dde5f3d2367ac38194c161a6516e",
        "author": "Robert Jackson"
    },
    {
        "y": "2.8",
        "x": "2016-09-08T15:07:35Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/bc08835d57786e7ba61943d8a3907aa1e94e2415",
        "author": "Robert Jackson"
    },
    {
        "y": "2.7",
        "x": "2016-07-25T22:30:38Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/d56bc7bd9b488e5b3f54c47e987d24a0d67d3f53",
        "author": "Robert Jackson"
    },
    {
        "y": "2.6",
        "x": "2016-06-08T14:36:37Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/b23765a0dcfcb8acc77979ddcc0d996c7ccd1c54",
        "author": "Robert Jackson"
    },
    {
        "y": "2.5",
        "x": "2016-04-11T21:15:06Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/c46f9d16549e709b0dc6d25f2f0da830072e0ee2",
        "author": "Godhuda"
    },
    {
        "y": "2.4",
        "x": "2016-02-29T19:52:33Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/484516eac38082ceb2ea3a7e1c0599818754849a",
        "author": "Robert Jackson"
    },
    {
        "y": "2.3",
        "x": "2016-01-18T04:46:01Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/7587a7d1f9fd94fd20debad0c7477d1d051b35e2",
        "author": "Robert Jackson"
    },
    {
        "y": "2.2",
        "x": "2015-11-17T01:42:08Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/0c3b904a57756dc347309a2fecf1de8119477dce",
        "author": "Robert Jackson"
    },
    {
        "y": "2.1",
        "x": "2015-10-05T02:12:38Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/912b485f174bf3d94b058de15fc17d64cd82d0b0",
        "author": "Robert Jackson"
    },
    {
        "y": "2.0",
        "x": "2015-08-13T07:01:19Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/e9be8410ef978c8bc08f53b3f2d003832e8ab925",
        "author": "Robert Jackson"
    },
    {
        "y": "1.13",
        "x": "2015-06-13T07:39:38Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/79a5f641ad336d7d7f760023ef9c46f8ee8ea29b",
        "author": "Robert Jackson"
    },
    {
        "y": "1.12",
        "x": "2015-05-14T02:26:55Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/3e804aea5bb63ae8a74b923a53aab6b088c7317a",
        "author": "Robert Jackson"
    },
    {
        "y": "1.11",
        "x": "2015-03-28T19:59:25Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/72d2409e9a3b1602cb97d99888832ea852e003ad",
        "author": "Robert Jackson"
    },
    {
        "y": "1.10",
        "x": "2015-02-08T01:14:29Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/729e2cd19a92958d24d35dbabcf3faf55fd9d70e",
        "author": "Robert Jackson"
    },
    {
        "y": "1.9",
        "x": "2014-12-09T22:42:37Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/5fe2d63a7dab0484cad9e729886ac71b4c05f1fd",
        "author": "Robert Jackson"
    },
    {
        "y": "1.8",
        "x": "2014-10-28T03:44:39Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/8249bfa86446b7a98545066b9b6eadfeaae289ae",
        "author": "Robert Jackson"
    },
    {
        "y": "1.7",
        "x": "2014-08-20T02:54:27Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/a6162631e1ec8abd7627784b33cd07483af40dce",
        "author": "Robert Jackson"
    },
    {
        "y": "1.6",
        "x": "2014-07-08T06:00:33Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/92a844e65059a402c2435fc983033be01da9f83b",
        "author": "hyder.ali"
    },
    {
        "y": "1.5",
        "x": "2014-03-30T04:50:08Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/4a3a43b202c5274a377839380bc2b203e9410eef",
        "author": "Robert Jackson"
    },
    {
        "y": "1.4",
        "x": "2014-02-14T13:47:59Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/04d46b469ab9540d519152928e299b77c5278ec6",
        "author": "Robert Jackson"
    },
    {
        "y": "1.3",
        "x": "2014-01-07T03:52:36Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/45900eecf86a7bbc8d5e328467133c292182a5b2",
        "author": "Robert Jackson"
    },
    {
        "y": "1.2",
        "x": "2013-11-23T04:00:07Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/ed680deda6061842356c3ea63fbbeb381122d704",
        "author": "Peter Wagenet"
    },
    {
        "y": "1.1",
        "x": "2013-10-21T20:16:34Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/98541e0042f2064113aabb1325e995adf89245d6",
        "author": "Peter Wagenet"
    },
    {
        "y": "1.0",
        "x": "2013-09-01T07:01:58Z",
        "url": "https://api.github.com/repos/emberjs/ember.js/commits/b0ca8033ac69e2c4e6dcdc08f036dc317079b705",
        "author": "Peter Wagenet"
    }
]
},{}],14:[function(require,module,exports){
module.exports={"name":"react","data":[{"x":"2017-09-01","y":5581184},{"x":"2017-10-01","y":7040410},{"x":"2017-11-01","y":7366635},{"x":"2017-12-01","y":6170952},{"x":"2018-01-01","y":7523768},{"x":"2018-02-01","y":7875162},{"x":"2018-03-01","y":9740774},{"x":"2018-04-01","y":9802818},{"x":"2018-05-01","y":9388689},{"x":"2018-06-01","y":10754915},{"x":"2018-07-01","y":11525185},{"x":"2018-08-01","y":11578412}]}
},{}],15:[function(require,module,exports){
module.exports=[
    {
        "y": "16.5",
        "x": "2018-09-06T16:34:27Z",
        "url": "https://api.github.com/repos/facebook/react/commits/71c0e05ba79e2e12556980ffbab264b41fdc19cd",
        "author": "Brian Vaughn"
    },
    {
        "y": "16.4",
        "x": "2018-05-24T00:35:31Z",
        "url": "https://api.github.com/repos/facebook/react/commits/8765d608935a81ba5019f6cde6dce3367d392f0c",
        "author": "Andrew Clark"
    },
    {
        "y": "16.3",
        "x": "2018-03-29T20:07:12Z",
        "url": "https://api.github.com/repos/facebook/react/commits/8e3d94ffa1d2e19a5bf4b9f8030973b65b0fc854",
        "author": "Brian Vaughn"
    },
    {
        "y": "16.2",
        "x": "2017-11-28T21:29:23Z",
        "url": "https://api.github.com/repos/facebook/react/commits/edb2b3d3a70bbb6a26670673ac805df34ac23382",
        "author": "Clement Hoang"
    },
    {
        "y": "16.1",
        "x": "2017-11-09T15:04:27Z",
        "url": "https://api.github.com/repos/facebook/react/commits/1d3d791ca55f7b33364f9429372e62e01c90625a",
        "author": "Dan Abramov"
    },
    {
        "y": "16.0",
        "x": "2017-09-26T15:50:33Z",
        "url": "https://api.github.com/repos/facebook/react/commits/5c6ef4044610a2a325780261f41730a33a919f98",
        "author": "Andrew Clark"
    },
    {
        "y": "15.6",
        "x": "2017-06-13T16:05:41Z",
        "url": "https://api.github.com/repos/facebook/react/commits/911603b46e89ae0704561a2ad9a8cbd7f2bc12f1",
        "author": "Flarnie Marchan"
    },
    {
        "y": "15.5",
        "x": "2017-04-07T21:21:27Z",
        "url": "https://api.github.com/repos/facebook/react/commits/e19c70013ede122826418a555ddb693237f80b8c",
        "author": "Andrew Clark"
    },
    {
        "y": "15.4",
        "x": "2016-11-16T14:16:57Z",
        "url": "https://api.github.com/repos/facebook/react/commits/1c1f68e8dccbc84acfae66178493dbfb8ca7d1e1",
        "author": "tomocchino"
    },
    {
        "y": "15.3",
        "x": "2016-07-29T18:26:23Z",
        "url": "https://api.github.com/repos/facebook/react/commits/66cee497e7cea1af35e67ca13da846a7c37b264b",
        "author": "Paul O’Shannessy"
    },
    {
        "y": "15.2",
        "x": "2016-07-01T18:31:05Z",
        "url": "https://api.github.com/repos/facebook/react/commits/c6502493396bde8ceb7e28503264509c35001ca9",
        "author": "Paul O’Shannessy"
    },
    {
        "y": "15.1",
        "x": "2016-05-20T22:54:35Z",
        "url": "https://api.github.com/repos/facebook/react/commits/fef495942a1cf7d507c816192fde205b6003df05",
        "author": "Paul O’Shannessy"
    },
    {
        "y": "15.0",
        "x": "2016-04-07T19:07:50Z",
        "url": "https://api.github.com/repos/facebook/react/commits/d1c08f11d5e1ad03eb92a58b599562a010a68734",
        "author": "Paul O’Shannessy"
    },
    {
        "y": "0.14",
        "x": "2015-10-07T17:19:56Z",
        "url": "https://api.github.com/repos/facebook/react/commits/3603d45157e6c1b21cda7ed96683408b319ae619",
        "author": "Paul O’Shannessy"
    },
    {
        "y": "0.13",
        "x": "2015-03-10T21:09:04Z",
        "url": "https://api.github.com/repos/facebook/react/commits/edb8f7f4af980d2859582ed243b7f9dd6701a48e",
        "author": "Paul O’Shannessy"
    },
    {
        "y": "0.12",
        "x": "2014-10-28T18:23:41Z",
        "url": "https://api.github.com/repos/facebook/react/commits/3e925822a6c3b7a2447a537563e66793383f3cc9",
        "author": "Paul O’Shannessy"
    },
    {
        "y": "0.11",
        "x": "2014-07-17T20:16:48Z",
        "url": "https://api.github.com/repos/facebook/react/commits/95d82cacd6e9cc6a2fe6366d79510cc9133886cb",
        "author": "Paul O’Shannessy"
    },
    {
        "y": "0.10",
        "x": "2014-03-21T20:34:02Z",
        "url": "https://api.github.com/repos/facebook/react/commits/dedf0c20da67872b5dff21a25cb9075e6019c12e",
        "author": "Paul O’Shannessy"
    },
    {
        "y": "0.9",
        "x": "2014-02-20T06:49:57Z",
        "url": "https://api.github.com/repos/facebook/react/commits/274aca309334313e817d39c8fe0e719999a5a033",
        "author": "Paul O’Shannessy"
    },
    {
        "y": "0.8",
        "x": "2013-12-19T18:41:03Z",
        "url": "https://api.github.com/repos/facebook/react/commits/2e1e868080a1bc1dedb9e75f018e5823f60cd125",
        "author": "Paul O’Shannessy"
    },
    {
        "y": "0.5",
        "x": "2013-10-16T18:43:09Z",
        "url": "https://api.github.com/repos/facebook/react/commits/f756cb3d9c504b3759fb4cc4f5aec1d1e4d31ee8",
        "author": "Paul O’Shannessy"
    },
    {
        "y": "0.4",
        "x": "2013-07-17T18:25:30Z",
        "url": "https://api.github.com/repos/facebook/react/commits/a54333842fff597986ec686ed46c91007e76fa18",
        "author": "Paul O’Shannessy"
    },
    {
        "y": "0.3",
        "x": "2013-05-29T19:46:11Z",
        "url": "https://api.github.com/repos/facebook/react/commits/e9e6b9b9b7558f1bc972f5cfb7b396d396a5508f",
        "author": "Paul O’Shannessy"
    },
    {
        "y": "16.1",
        "x": "2017-11-09T14:55:57Z",
        "url": "https://api.github.com/repos/facebook/react/commits/7d9b4ba35ac3d45e798908540ca8ef131b20e72d",
        "author": "Dan Abramov"
    }
]
},{}],16:[function(require,module,exports){
module.exports={"name":"react.js","data":[{"x":"StackOverflow","y":66147},{"x":"SegmentFault","y":14611}]}

},{}],17:[function(require,module,exports){
module.exports={"name":"@vue/cli","data":[{"x":"2017-09-01","y":0},{"x":"2017-10-01","y":0},{"x":"2017-11-01","y":0},{"x":"2017-12-01","y":0},{"x":"2018-01-01","y":2427},{"x":"2018-02-01","y":17553},{"x":"2018-03-01","y":23881},{"x":"2018-04-01","y":24913},{"x":"2018-05-01","y":43937},{"x":"2018-06-01","y":121163},{"x":"2018-07-01","y":167897},{"x":"2018-08-01","y":210466}]}
},{}],18:[function(require,module,exports){
module.exports={"name":"vue","data":[{"x":"2017-09-01","y":812561},{"x":"2017-10-01","y":874424},{"x":"2017-11-01","y":1076463},{"x":"2017-12-01","y":1049066},{"x":"2018-01-01","y":1193073},{"x":"2018-02-01","y":1081402},{"x":"2018-03-01","y":1556783},{"x":"2018-04-01","y":1443372},{"x":"2018-05-01","y":1374387},{"x":"2018-06-01","y":1546067},{"x":"2018-07-01","y":1812564},{"x":"2018-08-01","y":2047369}]}
},{}],19:[function(require,module,exports){
module.exports=[
    {
        "y": "2.5",
        "x": "2017-10-13T03:07:14Z",
        "url": "https://api.github.com/repos/vuejs/vue/commits/0948d999f2fddf9f90991956493f976273c5da1f",
        "author": "Evan You"
    },
    {
        "y": "2.4",
        "x": "2017-07-13T05:58:37Z",
        "url": "https://api.github.com/repos/vuejs/vue/commits/ac3d1eaea34ee23978d395a84f68154e7e86caa1",
        "author": "Evan You"
    },
    {
        "y": "2.3",
        "x": "2017-04-27T06:22:09Z",
        "url": "https://api.github.com/repos/vuejs/vue/commits/a27c464692c83c3c953e76baaa0e51dc88e4a14a",
        "author": "Evan You"
    },
    {
        "y": "2.2",
        "x": "2017-02-26T04:28:15Z",
        "url": "https://api.github.com/repos/vuejs/vue/commits/2a19f911dc8631d44b7c7e63c4db57ef28ac5e69",
        "author": "Evan You"
    },
    {
        "y": "2.1",
        "x": "2016-11-22T16:15:07Z",
        "url": "https://api.github.com/repos/vuejs/vue/commits/f4647b01f8340eb0d21d14f4fc1a720855fee3d5",
        "author": "Evan You"
    },
    {
        "y": "2.0",
        "x": "2016-09-30T18:32:01Z",
        "url": "https://api.github.com/repos/vuejs/vue/commits/156cfb9892d3359d548e27abf5d8b78b421a5a92",
        "author": "Evan You"
    },
    {
        "y": "0.10",
        "x": "2014-03-23T18:53:01Z",
        "url": "https://api.github.com/repos/vuejs/vue/commits/cd53688d5364aef64aafc986c02e491f8cf90f82",
        "author": "Evan You"
    },
    {
        "y": "0.9",
        "x": "2014-02-25T06:16:28Z",
        "url": "https://api.github.com/repos/vuejs/vue/commits/fbaf56933a4844f251e28a1e2784b67ec5cb9afd",
        "author": "Evan You"
    },
    {
        "y": "0.8",
        "x": "2014-01-27T05:15:47Z",
        "url": "https://api.github.com/repos/vuejs/vue/commits/882c16c76ec0790ccf60856385ea493c9369cd63",
        "author": "Evan You"
    },
    {
        "y": "0.7",
        "x": "2013-12-24T03:31:05Z",
        "url": "https://api.github.com/repos/vuejs/vue/commits/f4861ca9905a170b9a4b185e8a2038dc7c11c58e",
        "author": "Evan You"
    },
    {
        "y": "1.0",
        "x": "2015-10-27T01:40:11Z",
        "url": "https://api.github.com/repos/vuejs/vue/commits/d8e9e2ea16153aacdc99a6cc36f7d121a5ab484c",
        "author": "Evan You"
    },
    {
        "y": "0.12",
        "x": "2015-06-12T17:34:29Z",
        "url": "https://api.github.com/repos/vuejs/vue/commits/66b124b7ecf7916ac2506fb5bd8006858006fb35",
        "author": "Evan You"
    },
    {
        "y": "0.11",
        "x": "2014-11-07T01:52:42Z",
        "url": "https://api.github.com/repos/vuejs/vue/commits/5bc3e30b694dc3b6aeeb87c24f88b9cd7a7259d6",
        "author": "Evan You"
    },
    {
        "y": "0.6",
        "x": "2013-12-08T00:32:17Z",
        "url": "https://api.github.com/repos/vuejs/vue/commits/218557cdec830a629252f4a9e2643973dc1f1d2d",
        "author": "Evan You"
    }
]
},{}],20:[function(require,module,exports){
module.exports={"name":"vue.js","data":[{"x":"StackOverflow","y":16345},{"x":"SegmentFault","y":16063}]}

},{}],21:[function(require,module,exports){
'use strict';

var ES = require('es-abstract/es2017');

var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || (Math.pow(2, 53) - 1);

// eslint-disable-next-line max-params, max-statements
var FlattenIntoArray = function FlattenIntoArray(target, source, sourceLen, start, depth) {
	var targetIndex = start;
	var sourceIndex = 0;

	/*
	var mapperFunction;
	if (arguments.length > 5) {
		mapperFunction = arguments[5];
	}
	*/

	while (sourceIndex < sourceLen) {
		var P = ES.ToString(sourceIndex);
		var exists = ES.HasProperty(source, P);
		if (exists) {
			var element = ES.Get(source, P);
			/*
			if (typeof mapperFunction !== 'undefined') {
				if (arguments.length <= 6) {
					throw new TypeError('Assertion failed: thisArg is required when mapperFunction is provided');
				}
				element = ES.Call(mapperFunction, arguments[6], [element, sourceIndex, source]);
			}
			*/
			var shouldFlatten = false;
			if (depth > 0) {
				shouldFlatten = ES.IsArray(element);
			}
			if (shouldFlatten) {
				var elementLen = ES.ToLength(ES.Get(element, 'length'));
				targetIndex = FlattenIntoArray(target, element, elementLen, targetIndex, depth - 1);
			} else {
				if (targetIndex >= MAX_SAFE_INTEGER) {
					throw new TypeError('index too large');
				}
				ES.CreateDataPropertyOrThrow(target, ES.ToString(targetIndex), element);
				targetIndex += 1;
			}
		}
		sourceIndex += 1;
	}

	return targetIndex;
};

module.exports = function flat() {
	var O = ES.ToObject(this);
	var sourceLen = ES.ToLength(ES.Get(O, 'length'));

	var depthNum = 1;
	if (arguments.length > 0 && typeof arguments[0] !== 'undefined') {
		depthNum = ES.ToInteger(arguments[0]);
	}

	var A = ES.ArraySpeciesCreate(O, 0);
	FlattenIntoArray(A, O, sourceLen, 0, depthNum);
	return A;
};

},{"es-abstract/es2017":29}],22:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var bind = require('function-bind');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var polyfill = getPolyfill();
var shim = require('./shim');

var boundFlat = bind.call(Function.call, polyfill);

define(boundFlat, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundFlat;

},{"./implementation":21,"./polyfill":23,"./shim":24,"define-properties":25,"function-bind":41}],23:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	return Array.prototype.flat || implementation;
};

},{"./implementation":21}],24:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimFlat() {
	var polyfill = getPolyfill();
	define(
		Array.prototype,
		{ flat: polyfill },
		{ flat: function () { return Array.prototype.flat !== polyfill; } }
	);
	return polyfill;
};

},{"./polyfill":23,"define-properties":25}],25:[function(require,module,exports){
'use strict';

var keys = require('object-keys');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
		for (var _ in obj) { // jscs:ignore disallowUnusedVariables
			return false;
		}
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;

},{"object-keys":49}],26:[function(require,module,exports){
'use strict';

/* globals
	Set,
	Map,
	WeakSet,
	WeakMap,

	Promise,

	Symbol,
	Proxy,

	Atomics,
	SharedArrayBuffer,

	ArrayBuffer,
	DataView,
	Uint8Array,
	Float32Array,
	Float64Array,
	Int8Array,
	Int16Array,
	Int32Array,
	Uint8ClampedArray,
	Uint16Array,
	Uint32Array,
*/

var undefined; // eslint-disable-line no-shadow-restricted-names

var ThrowTypeError = Object.getOwnPropertyDescriptor
	? (function () { return Object.getOwnPropertyDescriptor(arguments, 'callee').get; }())
	: function () { throw new TypeError(); };

var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var generator; // = function * () {};
var generatorFunction = generator ? getProto(generator) : undefined;
var asyncFn; // async function() {};
var asyncFunction = asyncFn ? asyncFn.constructor : undefined;
var asyncGen; // async function * () {};
var asyncGenFunction = asyncGen ? getProto(asyncGen) : undefined;
var asyncGenIterator = asyncGen ? asyncGen() : undefined;

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'$ %Array%': Array,
	'$ %ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'$ %ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer.prototype,
	'$ %ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'$ %ArrayPrototype%': Array.prototype,
	'$ %ArrayProto_entries%': Array.prototype.entries,
	'$ %ArrayProto_forEach%': Array.prototype.forEach,
	'$ %ArrayProto_keys%': Array.prototype.keys,
	'$ %ArrayProto_values%': Array.prototype.values,
	'$ %AsyncFromSyncIteratorPrototype%': undefined,
	'$ %AsyncFunction%': asyncFunction,
	'$ %AsyncFunctionPrototype%': asyncFunction ? asyncFunction.prototype : undefined,
	'$ %AsyncGenerator%': asyncGen ? getProto(asyncGenIterator) : undefined,
	'$ %AsyncGeneratorFunction%': asyncGenFunction,
	'$ %AsyncGeneratorPrototype%': asyncGenFunction ? asyncGenFunction.prototype : undefined,
	'$ %AsyncIteratorPrototype%': asyncGenIterator && hasSymbols && Symbol.asyncIterator ? asyncGenIterator[Symbol.asyncIterator]() : undefined,
	'$ %Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'$ %Boolean%': Boolean,
	'$ %BooleanPrototype%': Boolean.prototype,
	'$ %DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'$ %DataViewPrototype%': typeof DataView === 'undefined' ? undefined : DataView.prototype,
	'$ %Date%': Date,
	'$ %DatePrototype%': Date.prototype,
	'$ %decodeURI%': decodeURI,
	'$ %decodeURIComponent%': decodeURIComponent,
	'$ %encodeURI%': encodeURI,
	'$ %encodeURIComponent%': encodeURIComponent,
	'$ %Error%': Error,
	'$ %ErrorPrototype%': Error.prototype,
	'$ %eval%': eval, // eslint-disable-line no-eval
	'$ %EvalError%': EvalError,
	'$ %EvalErrorPrototype%': EvalError.prototype,
	'$ %Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'$ %Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined : Float32Array.prototype,
	'$ %Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'$ %Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined : Float64Array.prototype,
	'$ %Function%': Function,
	'$ %FunctionPrototype%': Function.prototype,
	'$ %Generator%': generator ? getProto(generator()) : undefined,
	'$ %GeneratorFunction%': generatorFunction,
	'$ %GeneratorPrototype%': generatorFunction ? generatorFunction.prototype : undefined,
	'$ %Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'$ %Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined : Int8Array.prototype,
	'$ %Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'$ %Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined : Int8Array.prototype,
	'$ %Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'$ %Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined : Int32Array.prototype,
	'$ %isFinite%': isFinite,
	'$ %isNaN%': isNaN,
	'$ %IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'$ %JSON%': JSON,
	'$ %JSONParse%': JSON.parse,
	'$ %Map%': typeof Map === 'undefined' ? undefined : Map,
	'$ %MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'$ %MapPrototype%': typeof Map === 'undefined' ? undefined : Map.prototype,
	'$ %Math%': Math,
	'$ %Number%': Number,
	'$ %NumberPrototype%': Number.prototype,
	'$ %Object%': Object,
	'$ %ObjectPrototype%': Object.prototype,
	'$ %ObjProto_toString%': Object.prototype.toString,
	'$ %ObjProto_valueOf%': Object.prototype.valueOf,
	'$ %parseFloat%': parseFloat,
	'$ %parseInt%': parseInt,
	'$ %Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'$ %PromisePrototype%': typeof Promise === 'undefined' ? undefined : Promise.prototype,
	'$ %PromiseProto_then%': typeof Promise === 'undefined' ? undefined : Promise.prototype.then,
	'$ %Promise_all%': typeof Promise === 'undefined' ? undefined : Promise.all,
	'$ %Promise_reject%': typeof Promise === 'undefined' ? undefined : Promise.reject,
	'$ %Promise_resolve%': typeof Promise === 'undefined' ? undefined : Promise.resolve,
	'$ %Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'$ %RangeError%': RangeError,
	'$ %RangeErrorPrototype%': RangeError.prototype,
	'$ %ReferenceError%': ReferenceError,
	'$ %ReferenceErrorPrototype%': ReferenceError.prototype,
	'$ %Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'$ %RegExp%': RegExp,
	'$ %RegExpPrototype%': RegExp.prototype,
	'$ %Set%': typeof Set === 'undefined' ? undefined : Set,
	'$ %SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'$ %SetPrototype%': typeof Set === 'undefined' ? undefined : Set.prototype,
	'$ %SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'$ %SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer.prototype,
	'$ %String%': String,
	'$ %StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'$ %StringPrototype%': String.prototype,
	'$ %Symbol%': hasSymbols ? Symbol : undefined,
	'$ %SymbolPrototype%': hasSymbols ? Symbol.prototype : undefined,
	'$ %SyntaxError%': SyntaxError,
	'$ %SyntaxErrorPrototype%': SyntaxError.prototype,
	'$ %ThrowTypeError%': ThrowTypeError,
	'$ %TypedArray%': TypedArray,
	'$ %TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined,
	'$ %TypeError%': TypeError,
	'$ %TypeErrorPrototype%': TypeError.prototype,
	'$ %Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'$ %Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array.prototype,
	'$ %Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'$ %Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray.prototype,
	'$ %Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'$ %Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array.prototype,
	'$ %Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'$ %Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array.prototype,
	'$ %URIError%': URIError,
	'$ %URIErrorPrototype%': URIError.prototype,
	'$ %WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'$ %WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined : WeakMap.prototype,
	'$ %WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,
	'$ %WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined : WeakSet.prototype
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new TypeError('"allowMissing" argument must be a boolean');
	}

	var key = '$ ' + name;
	if (!(key in INTRINSICS)) {
		throw new SyntaxError('intrinsic ' + name + ' does not exist!');
	}

	// istanbul ignore if // hopefully this is impossible to test :-)
	if (typeof INTRINSICS[key] === 'undefined' && !allowMissing) {
		throw new TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
	}
	return INTRINSICS[key];
};

},{}],27:[function(require,module,exports){
'use strict';

var has = require('has');
var toPrimitive = require('es-to-primitive/es6');

var GetIntrinsic = require('./GetIntrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $Array = GetIntrinsic('%Array%');
var $String = GetIntrinsic('%String%');
var $Object = GetIntrinsic('%Object%');
var $Number = GetIntrinsic('%Number%');
var $Symbol = GetIntrinsic('%Symbol%', true);
var $RegExp = GetIntrinsic('%RegExp%');

var hasSymbols = !!$Symbol;

var $isNaN = require('./helpers/isNaN');
var $isFinite = require('./helpers/isFinite');
var MAX_SAFE_INTEGER = $Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;

var assign = require('./helpers/assign');
var sign = require('./helpers/sign');
var mod = require('./helpers/mod');
var isPrimitive = require('./helpers/isPrimitive');
var parseInteger = parseInt;
var bind = require('function-bind');
var arraySlice = bind.call(Function.call, $Array.prototype.slice);
var strSlice = bind.call(Function.call, $String.prototype.slice);
var isBinary = bind.call(Function.call, $RegExp.prototype.test, /^0b[01]+$/i);
var isOctal = bind.call(Function.call, $RegExp.prototype.test, /^0o[0-7]+$/i);
var regexExec = bind.call(Function.call, $RegExp.prototype.exec);
var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
var nonWSregex = new $RegExp('[' + nonWS + ']', 'g');
var hasNonWS = bind.call(Function.call, $RegExp.prototype.test, nonWSregex);
var invalidHexLiteral = /^[-+]0x[0-9a-f]+$/i;
var isInvalidHexLiteral = bind.call(Function.call, $RegExp.prototype.test, invalidHexLiteral);
var $charCodeAt = bind.call(Function.call, $String.prototype.charCodeAt);

var toStr = bind.call(Function.call, Object.prototype.toString);

var $floor = Math.floor;
var $abs = Math.abs;

var $ObjectCreate = Object.create;
var $gOPD = $Object.getOwnPropertyDescriptor;

var $isExtensible = $Object.isExtensible;

// whitespace from: http://es5.github.io/#x15.5.4.20
// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
var ws = [
	'\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
	'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
	'\u2029\uFEFF'
].join('');
var trimRegex = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
var replace = bind.call(Function.call, $String.prototype.replace);
var trim = function (value) {
	return replace(value, trimRegex, '');
};

var ES5 = require('./es5');

var hasRegExpMatcher = require('is-regex');

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-abstract-operations
var ES6 = assign(assign({}, ES5), {

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-call-f-v-args
	Call: function Call(F, V) {
		var args = arguments.length > 2 ? arguments[2] : [];
		if (!this.IsCallable(F)) {
			throw new $TypeError(F + ' is not a function');
		}
		return F.apply(V, args);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toprimitive
	ToPrimitive: toPrimitive,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toboolean
	// ToBoolean: ES5.ToBoolean,

	// https://ecma-international.org/ecma-262/6.0/#sec-tonumber
	ToNumber: function ToNumber(argument) {
		var value = isPrimitive(argument) ? argument : toPrimitive(argument, $Number);
		if (typeof value === 'symbol') {
			throw new $TypeError('Cannot convert a Symbol value to a number');
		}
		if (typeof value === 'string') {
			if (isBinary(value)) {
				return this.ToNumber(parseInteger(strSlice(value, 2), 2));
			} else if (isOctal(value)) {
				return this.ToNumber(parseInteger(strSlice(value, 2), 8));
			} else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
				return NaN;
			} else {
				var trimmed = trim(value);
				if (trimmed !== value) {
					return this.ToNumber(trimmed);
				}
			}
		}
		return $Number(value);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tointeger
	// ToInteger: ES5.ToNumber,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint32
	// ToInt32: ES5.ToInt32,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint32
	// ToUint32: ES5.ToUint32,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint16
	ToInt16: function ToInt16(argument) {
		var int16bit = this.ToUint16(argument);
		return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint16
	// ToUint16: ES5.ToUint16,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint8
	ToInt8: function ToInt8(argument) {
		var int8bit = this.ToUint8(argument);
		return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8
	ToUint8: function ToUint8(argument) {
		var number = this.ToNumber(argument);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * $floor($abs(number));
		return mod(posInt, 0x100);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8clamp
	ToUint8Clamp: function ToUint8Clamp(argument) {
		var number = this.ToNumber(argument);
		if ($isNaN(number) || number <= 0) { return 0; }
		if (number >= 0xFF) { return 0xFF; }
		var f = $floor(argument);
		if (f + 0.5 < number) { return f + 1; }
		if (number < f + 0.5) { return f; }
		if (f % 2 !== 0) { return f + 1; }
		return f;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tostring
	ToString: function ToString(argument) {
		if (typeof argument === 'symbol') {
			throw new $TypeError('Cannot convert a Symbol value to a string');
		}
		return $String(argument);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toobject
	ToObject: function ToObject(value) {
		this.RequireObjectCoercible(value);
		return $Object(value);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
	ToPropertyKey: function ToPropertyKey(argument) {
		var key = this.ToPrimitive(argument, $String);
		return typeof key === 'symbol' ? key : this.ToString(key);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	ToLength: function ToLength(argument) {
		var len = this.ToInteger(argument);
		if (len <= 0) { return 0; } // includes converting -0 to +0
		if (len > MAX_SAFE_INTEGER) { return MAX_SAFE_INTEGER; }
		return len;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring
	CanonicalNumericIndexString: function CanonicalNumericIndexString(argument) {
		if (toStr(argument) !== '[object String]') {
			throw new $TypeError('must be a string');
		}
		if (argument === '-0') { return -0; }
		var n = this.ToNumber(argument);
		if (this.SameValue(this.ToString(n), argument)) { return n; }
		return void 0;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-requireobjectcoercible
	RequireObjectCoercible: ES5.CheckObjectCoercible,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
	IsArray: $Array.isArray || function IsArray(argument) {
		return toStr(argument) === '[object Array]';
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-iscallable
	// IsCallable: ES5.IsCallable,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
	IsConstructor: function IsConstructor(argument) {
		return typeof argument === 'function' && !!argument.prototype; // unfortunately there's no way to truly check this without try/catch `new argument`
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isextensible-o
	IsExtensible: Object.preventExtensions
		? function IsExtensible(obj) {
			if (isPrimitive(obj)) {
				return false;
			}
			return $isExtensible(obj);
		}
		: function isExtensible(obj) { return true; }, // eslint-disable-line no-unused-vars

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isinteger
	IsInteger: function IsInteger(argument) {
		if (typeof argument !== 'number' || $isNaN(argument) || !$isFinite(argument)) {
			return false;
		}
		var abs = $abs(argument);
		return $floor(abs) === abs;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ispropertykey
	IsPropertyKey: function IsPropertyKey(argument) {
		return typeof argument === 'string' || typeof argument === 'symbol';
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-isregexp
	IsRegExp: function IsRegExp(argument) {
		if (!argument || typeof argument !== 'object') {
			return false;
		}
		if (hasSymbols) {
			var isRegExp = argument[$Symbol.match];
			if (typeof isRegExp !== 'undefined') {
				return ES5.ToBoolean(isRegExp);
			}
		}
		return hasRegExpMatcher(argument);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevalue
	// SameValue: ES5.SameValue,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero
	SameValueZero: function SameValueZero(x, y) {
		return (x === y) || ($isNaN(x) && $isNaN(y));
	},

	/**
	 * 7.3.2 GetV (V, P)
	 * 1. Assert: IsPropertyKey(P) is true.
	 * 2. Let O be ToObject(V).
	 * 3. ReturnIfAbrupt(O).
	 * 4. Return O.[[Get]](P, V).
	 */
	GetV: function GetV(V, P) {
		// 7.3.2.1
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}

		// 7.3.2.2-3
		var O = this.ToObject(V);

		// 7.3.2.4
		return O[P];
	},

	/**
	 * 7.3.9 - https://ecma-international.org/ecma-262/6.0/#sec-getmethod
	 * 1. Assert: IsPropertyKey(P) is true.
	 * 2. Let func be GetV(O, P).
	 * 3. ReturnIfAbrupt(func).
	 * 4. If func is either undefined or null, return undefined.
	 * 5. If IsCallable(func) is false, throw a TypeError exception.
	 * 6. Return func.
	 */
	GetMethod: function GetMethod(O, P) {
		// 7.3.9.1
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}

		// 7.3.9.2
		var func = this.GetV(O, P);

		// 7.3.9.4
		if (func == null) {
			return void 0;
		}

		// 7.3.9.5
		if (!this.IsCallable(func)) {
			throw new $TypeError(P + 'is not a function');
		}

		// 7.3.9.6
		return func;
	},

	/**
	 * 7.3.1 Get (O, P) - https://ecma-international.org/ecma-262/6.0/#sec-get-o-p
	 * 1. Assert: Type(O) is Object.
	 * 2. Assert: IsPropertyKey(P) is true.
	 * 3. Return O.[[Get]](P, O).
	 */
	Get: function Get(O, P) {
		// 7.3.1.1
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(O) is not Object');
		}
		// 7.3.1.2
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}
		// 7.3.1.3
		return O[P];
	},

	Type: function Type(x) {
		if (typeof x === 'symbol') {
			return 'Symbol';
		}
		return ES5.Type(x);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-speciesconstructor
	SpeciesConstructor: function SpeciesConstructor(O, defaultConstructor) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(O) is not Object');
		}
		var C = O.constructor;
		if (typeof C === 'undefined') {
			return defaultConstructor;
		}
		if (this.Type(C) !== 'Object') {
			throw new $TypeError('O.constructor is not an Object');
		}
		var S = hasSymbols && $Symbol.species ? C[$Symbol.species] : void 0;
		if (S == null) {
			return defaultConstructor;
		}
		if (this.IsConstructor(S)) {
			return S;
		}
		throw new $TypeError('no constructor found');
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-completepropertydescriptor
	CompletePropertyDescriptor: function CompletePropertyDescriptor(Desc) {
		if (!this.IsPropertyDescriptor(Desc)) {
			throw new $TypeError('Desc must be a Property Descriptor');
		}

		if (this.IsGenericDescriptor(Desc) || this.IsDataDescriptor(Desc)) {
			if (!has(Desc, '[[Value]]')) {
				Desc['[[Value]]'] = void 0;
			}
			if (!has(Desc, '[[Writable]]')) {
				Desc['[[Writable]]'] = false;
			}
		} else {
			if (!has(Desc, '[[Get]]')) {
				Desc['[[Get]]'] = void 0;
			}
			if (!has(Desc, '[[Set]]')) {
				Desc['[[Set]]'] = void 0;
			}
		}
		if (!has(Desc, '[[Enumerable]]')) {
			Desc['[[Enumerable]]'] = false;
		}
		if (!has(Desc, '[[Configurable]]')) {
			Desc['[[Configurable]]'] = false;
		}
		return Desc;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-set-o-p-v-throw
	Set: function Set(O, P, V, Throw) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('O must be an Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('P must be a Property Key');
		}
		if (this.Type(Throw) !== 'Boolean') {
			throw new $TypeError('Throw must be a Boolean');
		}
		if (Throw) {
			O[P] = V;
			return true;
		} else {
			try {
				O[P] = V;
			} catch (e) {
				return false;
			}
		}
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-hasownproperty
	HasOwnProperty: function HasOwnProperty(O, P) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('O must be an Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('P must be a Property Key');
		}
		return has(O, P);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-hasproperty
	HasProperty: function HasProperty(O, P) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('O must be an Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('P must be a Property Key');
		}
		return P in O;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable
	IsConcatSpreadable: function IsConcatSpreadable(O) {
		if (this.Type(O) !== 'Object') {
			return false;
		}
		if (hasSymbols && typeof $Symbol.isConcatSpreadable === 'symbol') {
			var spreadable = this.Get(O, Symbol.isConcatSpreadable);
			if (typeof spreadable !== 'undefined') {
				return this.ToBoolean(spreadable);
			}
		}
		return this.IsArray(O);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-invoke
	Invoke: function Invoke(O, P) {
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('P must be a Property Key');
		}
		var argumentsList = arraySlice(arguments, 2);
		var func = this.GetV(O, P);
		return this.Call(func, O, argumentsList);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-getiterator
	GetIterator: function GetIterator(obj, method) {
		if (!hasSymbols) {
			throw new SyntaxError('ES.GetIterator depends on native iterator support.');
		}

		var actualMethod = method;
		if (arguments.length < 2) {
			actualMethod = this.GetMethod(obj, $Symbol.iterator);
		}
		var iterator = this.Call(actualMethod, obj);
		if (this.Type(iterator) !== 'Object') {
			throw new $TypeError('iterator must return an object');
		}

		return iterator;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-iteratornext
	IteratorNext: function IteratorNext(iterator, value) {
		var result = this.Invoke(iterator, 'next', arguments.length < 2 ? [] : [value]);
		if (this.Type(result) !== 'Object') {
			throw new $TypeError('iterator next must return an object');
		}
		return result;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-iteratorcomplete
	IteratorComplete: function IteratorComplete(iterResult) {
		if (this.Type(iterResult) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(iterResult) is not Object');
		}
		return this.ToBoolean(this.Get(iterResult, 'done'));
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-iteratorvalue
	IteratorValue: function IteratorValue(iterResult) {
		if (this.Type(iterResult) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(iterResult) is not Object');
		}
		return this.Get(iterResult, 'value');
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-iteratorstep
	IteratorStep: function IteratorStep(iterator) {
		var result = this.IteratorNext(iterator);
		var done = this.IteratorComplete(result);
		return done === true ? false : result;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-iteratorclose
	IteratorClose: function IteratorClose(iterator, completion) {
		if (this.Type(iterator) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(iterator) is not Object');
		}
		if (!this.IsCallable(completion)) {
			throw new $TypeError('Assertion failed: completion is not a thunk for a Completion Record');
		}
		var completionThunk = completion;

		var iteratorReturn = this.GetMethod(iterator, 'return');

		if (typeof iteratorReturn === 'undefined') {
			return completionThunk();
		}

		var completionRecord;
		try {
			var innerResult = this.Call(iteratorReturn, iterator, []);
		} catch (e) {
			// if we hit here, then "e" is the innerResult completion that needs re-throwing

			// if the completion is of type "throw", this will throw.
			completionRecord = completionThunk();
			completionThunk = null; // ensure it's not called twice.

			// if not, then return the innerResult completion
			throw e;
		}
		completionRecord = completionThunk(); // if innerResult worked, then throw if the completion does
		completionThunk = null; // ensure it's not called twice.

		if (this.Type(innerResult) !== 'Object') {
			throw new $TypeError('iterator .return must return an object');
		}

		return completionRecord;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-createiterresultobject
	CreateIterResultObject: function CreateIterResultObject(value, done) {
		if (this.Type(done) !== 'Boolean') {
			throw new $TypeError('Assertion failed: Type(done) is not Boolean');
		}
		return {
			value: value,
			done: done
		};
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-regexpexec
	RegExpExec: function RegExpExec(R, S) {
		if (this.Type(R) !== 'Object') {
			throw new $TypeError('R must be an Object');
		}
		if (this.Type(S) !== 'String') {
			throw new $TypeError('S must be a String');
		}
		var exec = this.Get(R, 'exec');
		if (this.IsCallable(exec)) {
			var result = this.Call(exec, R, [S]);
			if (result === null || this.Type(result) === 'Object') {
				return result;
			}
			throw new $TypeError('"exec" method must return `null` or an Object');
		}
		return regexExec(R, S);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-arrayspeciescreate
	ArraySpeciesCreate: function ArraySpeciesCreate(originalArray, length) {
		if (!this.IsInteger(length) || length < 0) {
			throw new $TypeError('Assertion failed: length must be an integer >= 0');
		}
		var len = length === 0 ? 0 : length;
		var C;
		var isArray = this.IsArray(originalArray);
		if (isArray) {
			C = this.Get(originalArray, 'constructor');
			// TODO: figure out how to make a cross-realm normal Array, a same-realm Array
			// if (this.IsConstructor(C)) {
			// 	if C is another realm's Array, C = undefined
			// 	Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Array))) === null ?
			// }
			if (this.Type(C) === 'Object' && hasSymbols && $Symbol.species) {
				C = this.Get(C, $Symbol.species);
				if (C === null) {
					C = void 0;
				}
			}
		}
		if (typeof C === 'undefined') {
			return $Array(len);
		}
		if (!this.IsConstructor(C)) {
			throw new $TypeError('C must be a constructor');
		}
		return new C(len); // this.Construct(C, len);
	},

	CreateDataProperty: function CreateDataProperty(O, P, V) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(O) is not Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}
		var oldDesc = $gOPD(O, P);
		var extensible = oldDesc || (typeof $isExtensible !== 'function' || $isExtensible(O));
		var immutable = oldDesc && (!oldDesc.writable || !oldDesc.configurable);
		if (immutable || !extensible) {
			return false;
		}
		var newDesc = {
			configurable: true,
			enumerable: true,
			value: V,
			writable: true
		};
		Object.defineProperty(O, P, newDesc);
		return true;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-createdatapropertyorthrow
	CreateDataPropertyOrThrow: function CreateDataPropertyOrThrow(O, P, V) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(O) is not Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}
		var success = this.CreateDataProperty(O, P, V);
		if (!success) {
			throw new $TypeError('unable to create data property');
		}
		return success;
	},

	// https://www.ecma-international.org/ecma-262/6.0/#sec-objectcreate
	ObjectCreate: function ObjectCreate(proto, internalSlotsList) {
		if (proto !== null && this.Type(proto) !== 'Object') {
			throw new $TypeError('Assertion failed: proto must be null or an object');
		}
		var slots = arguments.length < 2 ? [] : internalSlotsList;
		if (slots.length > 0) {
			throw new $SyntaxError('es-abstract does not yet support internal slots');
		}

		if (proto === null && !$ObjectCreate) {
			throw new $SyntaxError('native Object.create support is required to create null objects');
		}

		return $ObjectCreate(proto);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-advancestringindex
	AdvanceStringIndex: function AdvanceStringIndex(S, index, unicode) {
		if (this.Type(S) !== 'String') {
			throw new $TypeError('S must be a String');
		}
		if (!this.IsInteger(index) || index < 0 || index > MAX_SAFE_INTEGER) {
			throw new $TypeError('Assertion failed: length must be an integer >= 0 and <= 2**53');
		}
		if (this.Type(unicode) !== 'Boolean') {
			throw new $TypeError('Assertion failed: unicode must be a Boolean');
		}
		if (!unicode) {
			return index + 1;
		}
		var length = S.length;
		if ((index + 1) >= length) {
			return index + 1;
		}

		var first = $charCodeAt(S, index);
		if (first < 0xD800 || first > 0xDBFF) {
			return index + 1;
		}

		var second = $charCodeAt(S, index + 1);
		if (second < 0xDC00 || second > 0xDFFF) {
			return index + 1;
		}

		return index + 2;
	}
});

delete ES6.CheckObjectCoercible; // renamed in ES6 to RequireObjectCoercible

module.exports = ES6;

},{"./GetIntrinsic":26,"./es5":30,"./helpers/assign":31,"./helpers/isFinite":32,"./helpers/isNaN":33,"./helpers/isPrimitive":34,"./helpers/mod":35,"./helpers/sign":36,"es-to-primitive/es6":38,"function-bind":41,"has":44,"is-regex":47}],28:[function(require,module,exports){
'use strict';

var ES2015 = require('./es2015');
var assign = require('./helpers/assign');

var ES2016 = assign(assign({}, ES2015), {
	// https://github.com/tc39/ecma262/pull/60
	SameValueNonNumber: function SameValueNonNumber(x, y) {
		if (typeof x === 'number' || typeof x !== typeof y) {
			throw new TypeError('SameValueNonNumber requires two non-number values of the same type.');
		}
		return this.SameValue(x, y);
	}
});

module.exports = ES2016;

},{"./es2015":27,"./helpers/assign":31}],29:[function(require,module,exports){
'use strict';

var ES2016 = require('./es2016');
var assign = require('./helpers/assign');

var ES2017 = assign(assign({}, ES2016), {
	ToIndex: function ToIndex(value) {
		if (typeof value === 'undefined') {
			return 0;
		}
		var integerIndex = this.ToInteger(value);
		if (integerIndex < 0) {
			throw new RangeError('index must be >= 0');
		}
		var index = this.ToLength(integerIndex);
		if (!this.SameValueZero(integerIndex, index)) {
			throw new RangeError('index must be >= 0 and < 2 ** 53 - 1');
		}
		return index;
	}
});

delete ES2017.EnumerableOwnNames; // replaced with EnumerableOwnProperties

module.exports = ES2017;

},{"./es2016":28,"./helpers/assign":31}],30:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('./GetIntrinsic');

var $Object = GetIntrinsic('%Object%');
var $TypeError = GetIntrinsic('%TypeError%');
var $String = GetIntrinsic('%String%');

var $isNaN = require('./helpers/isNaN');
var $isFinite = require('./helpers/isFinite');

var sign = require('./helpers/sign');
var mod = require('./helpers/mod');

var IsCallable = require('is-callable');
var toPrimitive = require('es-to-primitive/es5');

var has = require('has');

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return !!value;
	},
	ToNumber: function ToNumber(value) {
		return +value; // eslint-disable-line no-implicit-coercion
	},
	ToInteger: function ToInteger(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number)) { return 0; }
		if (number === 0 || !$isFinite(number)) { return number; }
		return sign(number) * Math.floor(Math.abs(number));
	},
	ToInt32: function ToInt32(x) {
		return this.ToNumber(x) >> 0;
	},
	ToUint32: function ToUint32(x) {
		return this.ToNumber(x) >>> 0;
	},
	ToUint16: function ToUint16(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x10000);
	},
	ToString: function ToString(value) {
		return $String(value);
	},
	ToObject: function ToObject(value) {
		this.CheckObjectCoercible(value);
		return $Object(value);
	},
	CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
		/* jshint eqnull:true */
		if (value == null) {
			throw new $TypeError(optMessage || 'Cannot call method on ' + value);
		}
		return value;
	},
	IsCallable: IsCallable,
	SameValue: function SameValue(x, y) {
		if (x === y) { // 0 === -0, but they are not identical.
			if (x === 0) { return 1 / x === 1 / y; }
			return true;
		}
		return $isNaN(x) && $isNaN(y);
	},

	// https://www.ecma-international.org/ecma-262/5.1/#sec-8
	Type: function Type(x) {
		if (x === null) {
			return 'Null';
		}
		if (typeof x === 'undefined') {
			return 'Undefined';
		}
		if (typeof x === 'function' || typeof x === 'object') {
			return 'Object';
		}
		if (typeof x === 'number') {
			return 'Number';
		}
		if (typeof x === 'boolean') {
			return 'Boolean';
		}
		if (typeof x === 'string') {
			return 'String';
		}
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	IsPropertyDescriptor: function IsPropertyDescriptor(Desc) {
		if (this.Type(Desc) !== 'Object') {
			return false;
		}
		var allowed = {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Get]]': true,
			'[[Set]]': true,
			'[[Value]]': true,
			'[[Writable]]': true
		};
		// jscs:disable
		for (var key in Desc) { // eslint-disable-line
			if (has(Desc, key) && !allowed[key]) {
				return false;
			}
		}
		// jscs:enable
		var isData = has(Desc, '[[Value]]');
		var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.1
	IsAccessorDescriptor: function IsAccessorDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new $TypeError('Desc must be a Property Descriptor');
		}

		if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
			return false;
		}

		return true;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.2
	IsDataDescriptor: function IsDataDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new $TypeError('Desc must be a Property Descriptor');
		}

		if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
			return false;
		}

		return true;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.3
	IsGenericDescriptor: function IsGenericDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new $TypeError('Desc must be a Property Descriptor');
		}

		if (!this.IsAccessorDescriptor(Desc) && !this.IsDataDescriptor(Desc)) {
			return true;
		}

		return false;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.4
	FromPropertyDescriptor: function FromPropertyDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return Desc;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new $TypeError('Desc must be a Property Descriptor');
		}

		if (this.IsDataDescriptor(Desc)) {
			return {
				value: Desc['[[Value]]'],
				writable: !!Desc['[[Writable]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else if (this.IsAccessorDescriptor(Desc)) {
			return {
				get: Desc['[[Get]]'],
				set: Desc['[[Set]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else {
			throw new $TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');
		}
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.5
	ToPropertyDescriptor: function ToPropertyDescriptor(Obj) {
		if (this.Type(Obj) !== 'Object') {
			throw new $TypeError('ToPropertyDescriptor requires an object');
		}

		var desc = {};
		if (has(Obj, 'enumerable')) {
			desc['[[Enumerable]]'] = this.ToBoolean(Obj.enumerable);
		}
		if (has(Obj, 'configurable')) {
			desc['[[Configurable]]'] = this.ToBoolean(Obj.configurable);
		}
		if (has(Obj, 'value')) {
			desc['[[Value]]'] = Obj.value;
		}
		if (has(Obj, 'writable')) {
			desc['[[Writable]]'] = this.ToBoolean(Obj.writable);
		}
		if (has(Obj, 'get')) {
			var getter = Obj.get;
			if (typeof getter !== 'undefined' && !this.IsCallable(getter)) {
				throw new TypeError('getter must be a function');
			}
			desc['[[Get]]'] = getter;
		}
		if (has(Obj, 'set')) {
			var setter = Obj.set;
			if (typeof setter !== 'undefined' && !this.IsCallable(setter)) {
				throw new $TypeError('setter must be a function');
			}
			desc['[[Set]]'] = setter;
		}

		if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
			throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
		}
		return desc;
	}
};

module.exports = ES5;

},{"./GetIntrinsic":26,"./helpers/isFinite":32,"./helpers/isNaN":33,"./helpers/mod":35,"./helpers/sign":36,"es-to-primitive/es5":37,"has":44,"is-callable":45}],31:[function(require,module,exports){
var bind = require('function-bind');
var has = bind.call(Function.call, Object.prototype.hasOwnProperty);

var $assign = Object.assign;

module.exports = function assign(target, source) {
	if ($assign) {
		return $assign(target, source);
	}

	for (var key in source) {
		if (has(source, key)) {
			target[key] = source[key];
		}
	}
	return target;
};

},{"function-bind":41}],32:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],33:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],34:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],35:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],36:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],37:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

var isPrimitive = require('./helpers/isPrimitive');

var isCallable = require('is-callable');

// https://es5.github.io/#x8.12
var ES5internalSlots = {
	'[[DefaultValue]]': function (O, hint) {
		var actualHint = hint || (toStr.call(O) === '[object Date]' ? String : Number);

		if (actualHint === String || actualHint === Number) {
			var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
			var value, i;
			for (i = 0; i < methods.length; ++i) {
				if (isCallable(O[methods[i]])) {
					value = O[methods[i]]();
					if (isPrimitive(value)) {
						return value;
					}
				}
			}
			throw new TypeError('No default value');
		}
		throw new TypeError('invalid [[DefaultValue]] hint supplied');
	}
};

// https://es5.github.io/#x9
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
};

},{"./helpers/isPrimitive":39,"is-callable":45}],38:[function(require,module,exports){
'use strict';

var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';

var isPrimitive = require('./helpers/isPrimitive');
var isCallable = require('is-callable');
var isDate = require('is-date-object');
var isSymbol = require('is-symbol');

var ordinaryToPrimitive = function OrdinaryToPrimitive(O, hint) {
	if (typeof O === 'undefined' || O === null) {
		throw new TypeError('Cannot call method on ' + O);
	}
	if (typeof hint !== 'string' || (hint !== 'number' && hint !== 'string')) {
		throw new TypeError('hint must be "string" or "number"');
	}
	var methodNames = hint === 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
	var method, result, i;
	for (i = 0; i < methodNames.length; ++i) {
		method = O[methodNames[i]];
		if (isCallable(method)) {
			result = method.call(O);
			if (isPrimitive(result)) {
				return result;
			}
		}
	}
	throw new TypeError('No default value');
};

var GetMethod = function GetMethod(O, P) {
	var func = O[P];
	if (func !== null && typeof func !== 'undefined') {
		if (!isCallable(func)) {
			throw new TypeError(func + ' returned for property ' + P + ' of object ' + O + ' is not a function');
		}
		return func;
	}
};

// http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	var hint = 'default';
	if (arguments.length > 1) {
		if (PreferredType === String) {
			hint = 'string';
		} else if (PreferredType === Number) {
			hint = 'number';
		}
	}

	var exoticToPrim;
	if (hasSymbols) {
		if (Symbol.toPrimitive) {
			exoticToPrim = GetMethod(input, Symbol.toPrimitive);
		} else if (isSymbol(input)) {
			exoticToPrim = Symbol.prototype.valueOf;
		}
	}
	if (typeof exoticToPrim !== 'undefined') {
		var result = exoticToPrim.call(input, hint);
		if (isPrimitive(result)) {
			return result;
		}
		throw new TypeError('unable to convert exotic object to primitive');
	}
	if (hint === 'default' && (isDate(input) || isSymbol(input))) {
		hint = 'string';
	}
	return ordinaryToPrimitive(input, hint === 'default' ? 'number' : hint);
};

},{"./helpers/isPrimitive":39,"is-callable":45,"is-date-object":46,"is-symbol":48}],39:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"dup":34}],40:[function(require,module,exports){
'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],41:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":40}],42:[function(require,module,exports){
(function (global){
'use strict';

var origSymbol = global.Symbol;
var hasSymbolSham = require('./shams');

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./shams":43}],43:[function(require,module,exports){
'use strict';

/* eslint complexity: [2, 17], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};

},{}],44:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":41}],45:[function(require,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (typeof value === 'function' && !value.prototype) { return true; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};

},{}],46:[function(require,module,exports){
'use strict';

var getDay = Date.prototype.getDay;
var tryDateObject = function tryDateObject(value) {
	try {
		getDay.call(value);
		return true;
	} catch (e) {
		return false;
	}
};

var toStr = Object.prototype.toString;
var dateClass = '[object Date]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isDateObject(value) {
	if (typeof value !== 'object' || value === null) { return false; }
	return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
};

},{}],47:[function(require,module,exports){
'use strict';

var has = require('has');
var regexExec = RegExp.prototype.exec;
var gOPD = Object.getOwnPropertyDescriptor;

var tryRegexExecCall = function tryRegexExec(value) {
	try {
		var lastIndex = value.lastIndex;
		value.lastIndex = 0;

		regexExec.call(value);
		return true;
	} catch (e) {
		return false;
	} finally {
		value.lastIndex = lastIndex;
	}
};
var toStr = Object.prototype.toString;
var regexClass = '[object RegExp]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isRegex(value) {
	if (!value || typeof value !== 'object') {
		return false;
	}
	if (!hasToStringTag) {
		return toStr.call(value) === regexClass;
	}

	var descriptor = gOPD(value, 'lastIndex');
	var hasLastIndexDataProperty = descriptor && has(descriptor, 'value');
	if (!hasLastIndexDataProperty) {
		return false;
	}

	return tryRegexExecCall(value);
};

},{"has":44}],48:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;
var hasSymbols = require('has-symbols')();

if (hasSymbols) {
	var symToStr = Symbol.prototype.toString;
	var symStringRegex = /^Symbol\(.*\)$/;
	var isSymbolObject = function isRealSymbolObject(value) {
		if (typeof value.valueOf() !== 'symbol') {
			return false;
		}
		return symStringRegex.test(symToStr.call(value));
	};

	module.exports = function isSymbol(value) {
		if (typeof value === 'symbol') {
			return true;
		}
		if (toStr.call(value) !== '[object Symbol]') {
			return false;
		}
		try {
			return isSymbolObject(value);
		} catch (e) {
			return false;
		}
	};
} else {

	module.exports = function isSymbol(value) {
		// this environment does not support Symbols.
		return false && value;
	};
}

},{"has-symbols":42}],49:[function(require,module,exports){
'use strict';

// modified from https://github.com/es-shims/es5-shim
var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var slice = Array.prototype.slice;
var isArgs = require('./isArguments');
var isEnumerable = Object.prototype.propertyIsEnumerable;
var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
var dontEnums = [
	'toString',
	'toLocaleString',
	'valueOf',
	'hasOwnProperty',
	'isPrototypeOf',
	'propertyIsEnumerable',
	'constructor'
];
var equalsConstructorPrototype = function (o) {
	var ctor = o.constructor;
	return ctor && ctor.prototype === o;
};
var excludedKeys = {
	$applicationCache: true,
	$console: true,
	$external: true,
	$frame: true,
	$frameElement: true,
	$frames: true,
	$innerHeight: true,
	$innerWidth: true,
	$outerHeight: true,
	$outerWidth: true,
	$pageXOffset: true,
	$pageYOffset: true,
	$parent: true,
	$scrollLeft: true,
	$scrollTop: true,
	$scrollX: true,
	$scrollY: true,
	$self: true,
	$webkitIndexedDB: true,
	$webkitStorageInfo: true,
	$window: true
};
var hasAutomationEqualityBug = (function () {
	/* global window */
	if (typeof window === 'undefined') { return false; }
	for (var k in window) {
		try {
			if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
				try {
					equalsConstructorPrototype(window[k]);
				} catch (e) {
					return true;
				}
			}
		} catch (e) {
			return true;
		}
	}
	return false;
}());
var equalsConstructorPrototypeIfNotBuggy = function (o) {
	/* global window */
	if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
		return equalsConstructorPrototype(o);
	}
	try {
		return equalsConstructorPrototype(o);
	} catch (e) {
		return false;
	}
};

var keysShim = function keys(object) {
	var isObject = object !== null && typeof object === 'object';
	var isFunction = toStr.call(object) === '[object Function]';
	var isArguments = isArgs(object);
	var isString = isObject && toStr.call(object) === '[object String]';
	var theKeys = [];

	if (!isObject && !isFunction && !isArguments) {
		throw new TypeError('Object.keys called on a non-object');
	}

	var skipProto = hasProtoEnumBug && isFunction;
	if (isString && object.length > 0 && !has.call(object, 0)) {
		for (var i = 0; i < object.length; ++i) {
			theKeys.push(String(i));
		}
	}

	if (isArguments && object.length > 0) {
		for (var j = 0; j < object.length; ++j) {
			theKeys.push(String(j));
		}
	} else {
		for (var name in object) {
			if (!(skipProto && name === 'prototype') && has.call(object, name)) {
				theKeys.push(String(name));
			}
		}
	}

	if (hasDontEnumBug) {
		var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

		for (var k = 0; k < dontEnums.length; ++k) {
			if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
				theKeys.push(dontEnums[k]);
			}
		}
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			return (Object.keys(arguments) || '').length === 2;
		}(1, 2));
		if (!keysWorksWithArguments) {
			var originalKeys = Object.keys;
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				} else {
					return originalKeys(object);
				}
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;

},{"./isArguments":50}],50:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

},{}]},{},[1]);

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"../../scripts/data/angular-npm-downloads.json":3,"../../scripts/data/angular-releases.json":4,"../../scripts/data/angularjs-releases.json":6,"../../scripts/data/aurelia-npm-downloads.json":8,"../../scripts/data/aurelia-releases.json":9,"../../scripts/data/ember-npm-downloads.json":12,"../../scripts/data/ember-releases.json":13,"../../scripts/data/react-npm-downloads.json":14,"../../scripts/data/react-releases.json":15,"../../scripts/data/vue-npm-downloads.json":18,"../../scripts/data/vue-releases.json":19,"./../../scripts/data/angular-cli-npm-downloads.json":2,"./../../scripts/data/angular-so-sf.json":5,"./../../scripts/data/aurelia-cli-npm-downloads.json":7,"./../../scripts/data/discord-members.json":10,"./../../scripts/data/ember-cli-npm-downloads.json":11,"./../../scripts/data/react-so-sf.json":16,"./../../scripts/data/vue-cli-npm-downloads.json":17,"./../../scripts/data/vue-so-sf.json":20}],2:[function(require,module,exports){
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

},{}]},{},[1]);

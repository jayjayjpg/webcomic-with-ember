// usage: node npm-fetch.js ember ~/my/directory/ember/releases.json

const fetch = require('node-fetch');
const fs = require('fs');

const pckg = process.argv[2];
const filename = process.argv[3];

function fetchMonths() {
  const daysPerMonth = [30,31,30,31,31,28,31,30,31,30,31,31];

  let months = daysPerMonth.map((numOfDays, index) => {
    const month = (index + 8) % 12 + 1;
    const year = index < 4 ? 2017 : 2018;

    return `${year}-${month}-01:${year}-${month}-${numOfDays}`;
  });

  console.log({ months });
  return months;
}


function fetchData(url) {
 return fetch(url).then((res) => res.json()).then((res) => res);
}

function parseData(data) {
  // return data.map((val) => { return { date: val.start, value: val.downloads }});
  let dataSet = data.map((val) => { return { x: val.start.substring(0, val.start.length - 3) + '-01', y: val.downloads }});
  return {
    name: pckg,
    data: dataSet,
  };
}

function fetchPckData(pck,dates) {
  const dataFetches = dates.map((date) => {
    const regUrl = `https://api.npmjs.org/downloads/point/${date}/${pck}`;
    return fetchData(regUrl).then((data) => data);
  });

  return Promise.all(dataFetches).then((vals) => vals);
}

function writeFile(data, name) {
  fs.writeFile(name, JSON.stringify(data), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
  });
}

// fetchData(regUrl);
const months = fetchMonths();
fetchPckData(pckg, months).then((pckData) => {
  const parsedData = parseData(pckData);
  writeFile(parsedData, filename);
});

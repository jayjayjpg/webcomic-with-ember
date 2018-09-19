const fetch = require('node-fetch');
const fs = require('fs');

const repo = process.argv[2];
const filename = process.argv[3];

function fetchData(url) {
 return fetch(url).then((res) => res.json()).then((res) => res);
}

function parseData(data) {
  // return data.map((val) => { return { date: val.start, value: val.downloads }});
  return data.map((val) => { return { author: val.author, value: val.downloads }});
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

